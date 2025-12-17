"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft, Clock } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface EdukasiPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
  onOpenDiriSendiri?: () => void
  onOpenKeluarga?: () => void
}

interface UserData {
  nama: string
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

export default function EdukasiPage({ onBack, onNavigate, onOpenDiriSendiri, onOpenKeluarga }: EdukasiPageProps) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [nextMedicationTime, setNextMedicationTime] = useState<string>("Tidak ada")

  useEffect(() => {
    const user = localStorage.getItem("tbcare_current_user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  useEffect(() => {
    const loadNextMedication = async () => {
      const user = auth.currentUser
      if (!user) return

      const snap = await getDocs(collection(db, "users", user.uid, "reminders"))

      const schedules: MedicationSchedule[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<MedicationSchedule, "id">),
      }))

      const upcomingReminders = schedules
        .filter((s) => !s.taken)
        .sort((a, b) => {
          const dateCompare = a.date.localeCompare(b.date)
          if (dateCompare !== 0) return dateCompare
          return a.time.localeCompare(b.time)
        })

      if (upcomingReminders.length > 0) {
        setNextMedicationTime(upcomingReminders[0].time)
      } else {
        setNextMedicationTime("Tidak ada")
      }
    }

    loadNextMedication()
  }, [])

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Desktop Sidebar */}
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
            onClick={() => onNavigate("home")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Beranda</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#4a90d9]/10 text-[#4a90d9] font-medium">
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
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 lg:hidden">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex-1 mx-4">
            <p className="text-sm text-foreground/80 leading-tight">
              Jangan lupa untuk minum
              <br />
              obatmu pada pukul:
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="w-4 h-4 text-foreground" />
              <span className="font-bold text-foreground">{nextMedicationTime}</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#4a90d9]/30">
            <Image
              src="/images/avatar.png"
              alt="Profile"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edukasi TBC</h1>
            <p className="text-muted-foreground">Pelajari informasi penting tentang pengobatan TBC</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Pengingat minum obat</p>
              <p className="font-bold text-[#4a90d9]">{nextMedicationTime}</p>
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
        </header>

        {/* Content */}
        <main className="p-4 pb-24 lg:p-8 lg:pb-8">
          <div className="max-w-md mx-auto lg:max-w-4xl">
            <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
              {/* Untuk Diri Sendiri Card */}
              <div className="group cursor-pointer" onClick={onOpenDiriSendiri}>
                <div className="bg-gradient-to-br from-[#e8f5e9] to-[#d4edda] rounded-3xl p-6 relative overflow-hidden hover:shadow-xl transition-all duration-300 h-48 lg:h-80 flex items-center">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-[#2d5a45] leading-tight lg:text-5xl">
                      Untuk
                      <br />
                      Diri
                      <br />
                      Sendiri
                    </h2>
                  </div>
                  <div className="absolute right-0 bottom-0 top-0 w-1/2 lg:w-3/5 flex items-center justify-center">
                    <Image
                      src="/images/untuk-diri-sendiri.png"
                      alt="Untuk Diri Sendiri"
                      width={280}
                      height={280}
                      className="w-full h-full object-contain object-right-bottom"
                    />
                  </div>
                </div>
              </div>

              {/* Untuk Keluarga Card */}
              <div className="group cursor-pointer" onClick={onOpenKeluarga}>
                <div className="bg-gradient-to-br from-[#e3f2fd] to-[#d4e8f9] rounded-3xl relative overflow-hidden border-2 border-[#4a90d9]/30 hover:shadow-xl hover:border-[#4a90d9]/50 transition-all duration-300 h-72 lg:h-80 flex flex-col">
                  <div className="flex-1 flex items-center justify-center px-6 pt-4 overflow-hidden min-h-0">
                    <Image
                      src="/images/untuk-keluarga.png"
                      alt="Untuk Keluarga"
                      width={320}
                      height={200}
                      className="w-full h-auto object-contain max-h-[140px] lg:max-h-[180px]"
                    />
                  </div>
                  <div className="flex-shrink-0 h-20 lg:h-24 flex items-center justify-center px-6 pb-4">
                    <h2 className="text-2xl font-bold text-[#4a90d9] leading-tight text-center lg:text-3xl">
                      Untuk
                      <br />
                      Keluarga
                    </h2>
                  </div>
                </div>
              </div>

              {/* Desktop-only additional cards */}
              <div className="hidden lg:block">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 h-48 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#fef3c7] flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📋</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Panduan Pengobatan</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Pelajari cara minum obat yang benar dan jadwal pengobatan TBC selama 6 bulan.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-[#f5a623] text-sm font-medium group-hover:underline">
                    Baca selengkapnya {">>"}
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 h-48 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#dcfce7] flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🥗</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Nutrisi & Gaya Hidup</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Tips menjaga pola makan dan gaya hidup sehat selama masa pengobatan.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-[#f5a623] text-sm font-medium group-hover:underline">
                    Baca selengkapnya {">>"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 shadow-lg lg:hidden">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            onClick={() => onNavigate("home")}
            className="flex flex-col items-center gap-1 px-4 py-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <Home className="w-5 h-5 text-gray-400" />
          </button>
          <button className="flex flex-col items-center gap-1 px-6 py-2 bg-[#d4e8f9] rounded-full">
            <BookOpen className="w-5 h-5 text-[#4a90d9]" />
            <span className="text-xs font-medium text-[#4a90d9]">Education</span>
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
