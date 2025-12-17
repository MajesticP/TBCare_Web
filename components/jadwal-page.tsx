"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

/* ================= TYPES ================= */

interface JadwalPageProps {
  onLogout: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

interface MedicationSchedule {
  id: string
  date: string
  time: string
  medicines: string[]
  taken: boolean
  notified?: boolean
}

interface UserData {
  nama: string
  email: string
}

/* ================= COMPONENT ================= */

export default function JadwalPage({ onLogout, onNavigate }: JadwalPageProps) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [schedules, setSchedules] = useState<MedicationSchedule[]>([])

  const [openAdd, setOpenAdd] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [time, setTime] = useState("09:00")
  const [medicines, setMedicines] = useState<string[]>(["Isoniazid"])

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const triggeredRef = useRef<Set<string>>(new Set())

  /* ================= INIT USER ================= */
  useEffect(() => {
    const u = localStorage.getItem("tbcare_current_user")
    if (u) setCurrentUser(JSON.parse(u))
  }, [])

  /* ================= LOAD FIRESTORE ================= */
  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser
      if (!user) return

      const snap = await getDocs(collection(db, "users", user.uid, "reminders"))

      const data = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<MedicationSchedule, "id">),
      }))

      setSchedules(data)
    }

    load()
  }, [])

  /* ================= ALARM ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()

      setSchedules((prev) =>
        prev.map((s) => {
          if (s.taken || s.notified) return s

          const key = `${s.date}_${s.time}`
          if (triggeredRef.current.has(key)) return s

          const alarm = new Date(`${s.date}T${s.time}`)
          const diff = now.getTime() - alarm.getTime()

          if (diff >= 0 && diff <= 120000) {
            triggeredRef.current.add(key)
            alert(`⏰ ${formatDate(s.date)} – ${s.medicines.join(", ")}`)
            return { ...s, notified: true }
          }
          return s
        }),
      )
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  /* ================= HELPERS ================= */

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })

  const getMonthName = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const getDaysInMonth = (d: Date) => {
    const y = d.getFullYear()
    const m = d.getMonth()
    return {
      days: new Date(y, m + 1, 0).getDate(),
      start: new Date(y, m, 1).getDay(),
      y,
      m,
    }
  }

  const renderCalendar = () => {
    const { days, start, y, m } = getDaysInMonth(currentMonth)
    const cells: React.ReactNode[] = []
    const selected = selectedDate.toISOString().split("T")[0]
    const now = new Date()

    for (let i = 0; i < start; i++) cells.push(<div key={`e-${i}`} />)

    for (let d = 1; d <= days; d++) {
      const date = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
      const has = schedules.some((s) => s.date === date)
      const isSelected = date === selected

      const hasOverdue = schedules.some((s) => {
        if (s.date !== date || s.taken) return false
        const scheduleTime = new Date(`${s.date}T${s.time}`)
        return scheduleTime < now
      })

      cells.push(
        <button
          key={date}
          onClick={() => setSelectedDate(new Date(date))}
          className={`h-9 rounded-lg text-sm flex items-center justify-center
            ${isSelected ? "bg-[#4a90d9] text-white" : hasOverdue ? "bg-red-500 text-white" : has ? "bg-blue-100" : "hover:bg-gray-100"}
          `}
        >
          {d}
        </button>,
      )
    }
    return cells
  }

  /* ================= ADD ================= */

  const handleAdd = async () => {
    const user = auth.currentUser
    if (!user || !startDate) return

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedStart = new Date(startDate)
    selectedStart.setHours(0, 0, 0, 0)

    if (selectedStart < today) {
      alert("Maaf, tanggal tidak boleh sebelum hari ini")
      return
    }

    if (endDate) {
      const selectedEnd = new Date(endDate)
      selectedEnd.setHours(0, 0, 0, 0)
      if (selectedEnd < today) {
        alert("Maaf, tanggal tidak boleh sebelum hari ini")
        return
      }
    }

    const s = new Date(startDate)
    const e = endDate ? new Date(endDate) : s

    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      const payload = {
        date: d.toISOString().split("T")[0],
        time,
        medicines: medicines.filter((m) => m.trim()),
        taken: false,
        notified: false,
      }

      const ref = await addDoc(collection(db, "users", user.uid, "reminders"), payload)

      setSchedules((prev) => [...prev, { id: ref.id, ...payload }])
    }

    setOpenAdd(false)
    setStartDate("")
    setEndDate("")
    setMedicines(["Isoniazid"])
  }

  const handleDelete = async (id: string) => {
    const user = auth.currentUser
    if (!user) return

    setSchedules((prev) => prev.filter((s) => s.id !== id))
    await deleteDoc(doc(db, "users", user.uid, "reminders", id))
  }

  const handleMarkAsTaken = async (id: string) => {
    const user = auth.currentUser
    if (!user) return

    setSchedules((prev) => prev.filter((s) => s.id !== id))

    await deleteDoc(doc(db, "users", user.uid, "reminders", id))

    setShowSuccessPopup(true)
  }

  const selectedSchedules = schedules.filter((s) => s.date === selectedDate.toISOString().split("T")[0])

  const upcomingReminders = schedules
    .filter((s) => !s.taken)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      if (dateCompare !== 0) return dateCompare
      return a.time.localeCompare(b.time)
    })

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* ===== SIDEBAR DESKTOP ===== */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl overflow-hidden">
            <Image
              src="/images/tbcare-logo.png"
              alt="TBCare Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-bold text-foreground">TBCare</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onNavigate("home")
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Beranda</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onNavigate("edukasi")
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span>Edukasi</span>
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#4a90d9]/10 text-[#4a90d9] font-medium"
          >
            <Calendar className="w-5 h-5" />
            <span>Jadwal</span>
          </button>
        </nav>
      </aside>

      {/* ===== MAIN ===== */}
      <div className="flex-1 lg:ml-64">
        <header className="bg-white border-b border-gray-100 px-4 py-4 lg:px-8 lg:py-6 sticky top-0 z-30">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Jadwal Minum Obat</h1>
              <p className="text-sm text-muted-foreground">Kelola jadwal pengobatan TBC Anda</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Pengingat minum obat</p>
                <p className="text-sm font-semibold text-[#4a90d9]">
                  {upcomingReminders.length > 0 ? upcomingReminders[0].time : "Tidak ada"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#4a90d9]/20">
                <Image
                  src="/images/avatar.png"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 space-y-4 pb-24">
          <div className="bg-white rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  const newMonth = new Date(currentMonth)
                  newMonth.setMonth(newMonth.getMonth() - 1)
                  setCurrentMonth(newMonth)
                }}
              >
                <ChevronLeft />
              </Button>
              <h3 className="font-bold">{getMonthName(currentMonth)}</h3>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  const newMonth = new Date(currentMonth)
                  newMonth.setMonth(newMonth.getMonth() + 1)
                  setCurrentMonth(newMonth)
                }}
              >
                <ChevronRight />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>

          <Button className="bg-[#4a90d9]" onClick={() => setOpenAdd(true)}>
            <Plus className="w-4 h-4 mr-2" /> Tambah Reminder
          </Button>

          {upcomingReminders.map((s) => (
            <div key={s.id} className="bg-[#ffd4b3] rounded-2xl p-4 space-y-2 border border-orange-200 relative">
              <button
                type="button"
                onClick={() => handleDelete(s.id)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                ×
              </button>
              <p className="font-semibold flex items-center gap-2">
                <span className="text-2xl">💊</span>
                Saatnya Minum Obat TBC hari ini
              </p>
              <div className="flex items-center gap-2 bg-white/50 rounded-lg px-3 py-2">
                <Calendar className="w-5 h-5 text-[#4a90d9]" />
                <span className="font-semibold text-[#4a90d9]">{formatDate(s.date)}</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium flex items-center gap-2">
                  <span className="text-2xl">💊</span>
                  <span className="font-semibold">Obat:</span>
                </p>
                <p className="text-sm ml-8">{s.medicines.join(", ")}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-600">{s.time} Pagi</span>
              </div>
              {!s.taken && (
                <Button
                  className="w-full bg-[#51cf66] hover:bg-[#47b85d] text-white"
                  onClick={() => handleMarkAsTaken(s.id)}
                >
                  Sudah Makan Obat
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== BOTTOM BAR MOBILE ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 shadow-lg lg:hidden">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onNavigate("home")
            }}
            className="flex flex-col items-center gap-1 px-4 py-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <Home className="w-5 h-5 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onNavigate("edukasi")
            }}
            className="flex flex-col items-center gap-1 px-4 py-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <BookOpen className="w-5 h-5 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="flex flex-col items-center gap-1 px-6 py-2 bg-[#d4e8f9] rounded-full"
          >
            <Calendar className="w-5 h-5 text-[#4a90d9]" />
            <span className="text-xs font-medium text-[#4a90d9]">Schedule</span>
          </button>
        </div>
      </div>

      {/* ===== ADD DIALOG ===== */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Reminder</DialogTitle>
          </DialogHeader>

          <Label>Tanggal Mulai</Label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

          <Label>Tanggal Akhir</Label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

          <Label>Jam</Label>
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

          <Label>Obat</Label>
          {medicines.map((m, i) => (
            <Input
              key={i}
              value={m}
              onChange={(e) => {
                const c = [...medicines]
                c[i] = e.target.value
                setMedicines(c)
              }}
              className="mb-2"
            />
          ))}

          <Button variant="outline" onClick={() => setMedicines([...medicines, ""])}>
            + Tambah Obat
          </Button>
          <Button className="bg-[#51cf66]" onClick={handleAdd}>
            Simpan
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogContent className="max-w-sm bg-[#f5f5dc] border-2 border-[#4a90d9]">
          <DialogHeader className="sr-only">
            <DialogTitle>Reminder berhasil diselesaikan</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#51cf66] flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-center text-lg font-semibold text-[#6b7c5c]">
              Selamat!! Kamu sudah
              <br />
              minum obat
            </p>
            <Button
              className="bg-[#51cf66] hover:bg-[#47b85d] text-white px-8"
              onClick={() => setShowSuccessPopup(false)}
            >
              Mengerti
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
