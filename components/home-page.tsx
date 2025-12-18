"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Home, BookOpen, Calendar, LogOut, User, X, Bell, Search } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { auth, db } from "@/lib/firebase"

interface HomePageProps {
  onLogout: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
  onNavigateToProfile?: () => void
  onOpenBerita?: () => void
}

interface UserData {
  nama: string
  email: string
  tanggalPertamaMinum: string
  waktuMinum: string
}

interface MedicationSchedule {
  id: string
  date: string
  time: string
  medicines: string[]
  taken: boolean
  notified?: boolean
}

export default function HomePage({ onLogout, onNavigate, onNavigateToProfile, onOpenBerita }: HomePageProps) {
  const [showSidebar, setShowSidebar] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [daysRemaining, setDaysRemaining] = useState(24)
  const [currentDate] = useState(new Date())
  const [schedules, setSchedules] = useState<MedicationSchedule[]>([])

  useEffect(() => {
    const user = localStorage.getItem("tbcare_current_user")
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)

      if (userData.tanggalPertamaMinum) {
        const startDate = new Date(userData.tanggalPertamaMinum)
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 180)
        const today = new Date()
        const remaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        setDaysRemaining(remaining > 0 ? remaining : 0)
      }
    }

    const firebaseUser = auth.currentUser
    if (firebaseUser) {
      setCurrentUser(prev => ({
        nama: firebaseUser.displayName || prev?.nama || "User",
        email: firebaseUser.email || prev?.email || "user@email.com",
        tanggalPertamaMinum: prev?.tanggalPertamaMinum || "",
        waktuMinum: prev?.waktuMinum || "11:00"
      }))
    }
  }, [])

  useEffect(() => {
    const loadSchedules = async () => {
      const user = auth.currentUser
      if (!user) return

      try {
        const snap = await getDocs(collection(db, "users", user.uid, "reminders"))
        const data = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<MedicationSchedule, "id">),
        }))
        setSchedules(data)
      } catch (error) {
        console.error("Error loading schedules:", error)
      }
    }

    loadSchedules()
    
    const interval = setInterval(() => {
      loadSchedules()
    }, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const getDayName = (date: Date) => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    return days[date.getDay()]
  }

  const getCalendarDays = () => {
    const today = currentDate.getDate()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const days = []
    
    for (let i = -3; i <= 3; i++) {
      const date = new Date(year, month, today + i)
      const dateStr = date.toISOString().split("T")[0]
      
      const reminderCount = schedules.filter(s => s.date === dateStr && !s.taken).length
      
      days.push({
        day: date.getDate(),
        fullDate: dateStr,
        reminderCount,
        isPast: date < new Date(year, month, today)
      })
    }
    return days
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("tbcare_current_user")
      onLogout()
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const handleKeluhanClick = () => {
    onNavigate("jadwal")
  }

  const calendarDays = getCalendarDays()
  const todaySchedules = schedules.filter(s => 
    s.date === currentDate.toISOString().split("T")[0] && !s.taken
  )

  const getNextReminder = () => {
    const now = new Date()
    const todayStr = now.toISOString().split("T")[0]
    
    const futureReminders = schedules
      .filter(s => !s.taken)
      .map(s => ({
        ...s,
        dateTime: new Date(`${s.date}T${s.time}`)
      }))
      .filter(s => s.dateTime >= now)
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
    
    return futureReminders[0] || null
  }

  const calculateDaysFromReminders = () => {
    if (schedules.length === 0) return 0
    
    const futureReminders = schedules
      .filter(s => !s.taken)
      .map(s => new Date(s.date))
      .sort((a, b) => b.getTime() - a.getTime())
    
    if (futureReminders.length === 0) return 0
    
    const lastReminderDate = futureReminders[0]
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    lastReminderDate.setHours(0, 0, 0, 0)
    
    const diffTime = lastReminderDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays > 0 ? diffDays : 0
  }

  const reminderDaysRemaining = calculateDaysFromReminders()

  const getHoursRemaining = () => {
    const nextReminder = getNextReminder()
    if (!nextReminder) return null
    
    const now = new Date()
    const diff = nextReminder.dateTime.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    return { hours, minutes, time: nextReminder.time, date: nextReminder.date }
  }

  const nextReminder = getNextReminder()
  const timeRemaining = getHoursRemaining()

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
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
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#4a90d9]/10 text-[#4a90d9] font-medium">
            <Home className="w-5 h-5" />
            <span>Beranda</span>
          </button>
          <button
            onClick={() => onNavigate("edukasi")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span>Edukasi</span>
          </button>
          <button
            onClick={() => onNavigate("jadwal")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span>Jadwal</span>
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#4a90d9]/20">
              <Image
                src="/images/avatar.png"
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{currentUser?.nama || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{currentUser?.email || "user@email.com"}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${showSidebar ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          <button
            onClick={() => setShowSidebar(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex flex-col items-center mt-8 mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-3 ring-4 ring-[#f5a623]/20">
              <Image
                src="/images/avatar.png"
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg text-foreground">{currentUser?.nama || "User"}</h3>
            <p className="text-sm text-muted-foreground">{currentUser?.email || "user@email.com"}</p>
          </div>

          <div className="space-y-2">
            <button 
              onClick={() => {
                setShowSidebar(false)
                onNavigateToProfile?.()
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f0f7fa] transition-colors text-foreground"
            >
              <User className="w-5 h-5 text-[#4a90d9]" />
              <span className="font-medium">Profil Saya</span>
            </button>
            <hr className="my-4 border-gray-200" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-red-500"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Keluar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:ml-64">
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-30">
          <div>
            <p className="text-muted-foreground text-sm">Selamat datang kembali,</p>
            <h1 className="text-2xl font-bold text-foreground">{currentUser?.nama || "User"}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari..."
                className="pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#4a90d9]/20"
              />
            </div>
            <button className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {todaySchedules.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#f5a623] rounded-full"></span>
              )}
            </button>
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
        </header>

        <main className="p-4 pb-24 lg:p-8 lg:pb-8">
          <div className="max-w-md mx-auto lg:max-w-none">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <div>
                <p className="text-muted-foreground text-sm">Hello!</p>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <span className="text-2xl">👋</span>
                  {currentUser?.nama || "User"}
                </h1>
              </div>
              <button
                onClick={() => setShowSidebar(true)}
                className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#4a90d9]/30 hover:ring-[#4a90d9] transition-all transform hover:scale-105"
              >
                <Image
                  src="/images/avatar.png"
                  alt="Profile"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>

            <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
              <div className="bg-gradient-to-br from-[#d4e8f9] to-[#bdd9f2] rounded-3xl p-5 lg:col-span-2">
                <div className="lg:flex lg:items-start lg:justify-between">
                  <div className="lg:flex-1">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                      <div>
                        <p className="text-sm text-foreground/80 mb-1">
                          {reminderDaysRemaining > 0 ? (
                            <>
                              Tersisa <span className="font-bold text-[#4a90d9]">{reminderDaysRemaining} hari</span> lagi minum obat
                            </>
                          ) : (
                            <span className="text-foreground/60">Tidak ada reminder aktif</span>
                          )}
                        </p>
                        {timeRemaining && (
                          <p className="text-xs text-foreground/70">
                            Reminder berikutnya: {timeRemaining.time} ({timeRemaining.hours}j {timeRemaining.minutes}m lagi)
                          </p>
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center lg:hidden">
                        <span className="text-lg">⏰</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 bg-white/40 rounded-2xl p-2 lg:max-w-md">
                      {calendarDays.map((dayInfo, index) => {
                        const isToday = dayInfo.day === currentDate.getDate() && 
                                       dayInfo.fullDate === currentDate.toISOString().split("T")[0]
                        return (
                          <div key={index} className="relative">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                                isToday
                                  ? "bg-[#4a90d9] text-white shadow-lg"
                                  : dayInfo.isPast
                                  ? "bg-[#4a90d9]/60 text-white"
                                  : "text-foreground/60"
                              }`}
                            >
                              {dayInfo.day}
                            </div>
                            {dayInfo.reminderCount > 0 && (
                              <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-[10px] font-bold text-white leading-none">
                                  {dayInfo.reminderCount}
                                </span>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-white/60 rounded-2xl p-4 lg:ml-6 lg:flex-col lg:items-end lg:justify-center lg:min-w-48">
                    <p className="text-sm text-foreground/80 lg:text-right lg:mb-2">
                      {timeRemaining ? (
                        <>
                          Jangan lupa untuk
                          <br />
                          minuman obatmu pada
                          <br />
                          pukul:
                        </>
                      ) : (
                        <>
                          Tidak ada
                          <br />
                          reminder aktif
                        </>
                      )}
                    </p>
                    <div className="text-right">
                      {timeRemaining ? (
                        <>
                          <p className="text-2xl font-bold text-foreground lg:text-3xl">
                            {timeRemaining.time}
                          </p>
                          <p className="text-xs text-foreground/70 mt-1">
                            {timeRemaining.hours > 0 && `${timeRemaining.hours} jam `}
                            {timeRemaining.minutes} menit lagi
                          </p>
                        </>
                      ) : (
                        <p className="text-lg font-medium text-foreground/60">
                          -
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div 
                onClick={handleKeluhanClick}
                className="bg-gradient-to-br from-[#e8f4fc] to-[#d6ecf8] rounded-3xl p-5 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="w-24 h-24 flex-shrink-0 lg:w-28 lg:h-28">
                  <Image
                    src="/images/keluhan-illustration.png"
                    alt="Keluhan"
                    width={112}
                    height={112}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#4a90d9] leading-tight lg:text-2xl">
                    Ada
                    <br />
                    Keluhan
                    <br />
                    Hari Ini?
                  </h3>
                  <button className="text-[#f5a623] text-sm font-medium mt-2 group-hover:underline">
                    Klik untuk lebih lanjut {">>"}
                  </button>
                </div>
              </div>

              <div
                onClick={onOpenBerita}
                className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-3xl p-5 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground leading-tight lg:text-2xl">
                    Berita Terkini
                    <br />
                    tentang
                    <br />
                    TBC!!
                  </h3>
                  <button className="text-[#f5a623] text-sm font-medium mt-2 group-hover:underline">
                    Klik untuk lebih lanjut {">>"}
                  </button>
                </div>
                <div className="w-28 h-24 flex-shrink-0 lg:w-32 lg:h-28">
                  <Image
                    src="/images/news-illustration.png"
                    alt="Berita TBC"
                    width={128}
                    height={112}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="hidden lg:block bg-white rounded-3xl p-5 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#4a90d9]/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#4a90d9]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Hari Pengobatan</p>
                    <p className="text-2xl font-bold text-foreground">
                      {180 - daysRemaining}{" "}
                      <span className="text-sm font-normal text-muted-foreground">/ 180 hari</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block bg-white rounded-3xl p-5 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status Kepatuhan</p>
                    <p className="text-2xl font-bold text-green-600">Baik</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 shadow-lg lg:hidden">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 px-6 py-2 bg-[#d4e8f9] rounded-full">
            <Home className="w-5 h-5 text-[#4a90d9]" />
            <span className="text-xs font-medium text-[#4a90d9]">Home</span>
          </button>
          <button
            onClick={() => onNavigate("edukasi")}
            className="flex flex-col items-center gap-1 px-4 py-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <BookOpen className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => onNavigate("jadwal")}
            className="flex flex-col items-center gap-1 px-4 py-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <Calendar className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}