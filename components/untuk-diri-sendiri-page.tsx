"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft } from "lucide-react"

interface UntukDiriSendiriPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
  onOpenPencegahanPenularan: () => void
  onOpenEfekSampingObat: () => void
  onOpenPembuanganDahak: () => void
  onOpenPemenuhanNutrisi: () => void
  onOpenAktivitasHarian: () => void
}

interface UserData {
  nama: string
  waktuMinum: string
}

const educationTopics = [
  {
    id: 1,
    title: "Pembuangan Dahak",
    image: "/person-coughing-into-tissue-green-illustration.jpg",
  },
  {
    id: 2,
    title: "Efek Samping Obat",
    image: "/doctor-explaining-medicine-side-effects-green-illu.jpg",
  },
  {
    id: 3,
    title: "Pemenuhan Nutrisi",
    image: "/healthy-food-vegetables-green-illustration.jpg",
  },
  {
    id: 4,
    title: "Aktivitas Harian",
    image: "/person-doing-daily-activities-exercise-green-illus.jpg",
  },
  {
    id: 5,
    title: "Pencegahan Penularan",
    image: "/doctor-patient-mask-prevention-green-illustration.jpg",
  },
]

export default function UntukDiriSendiriPage({
  onBack,
  onNavigate,
  onOpenPencegahanPenularan,
  onOpenEfekSampingObat,
  onOpenPembuanganDahak,
  onOpenPemenuhanNutrisi,
  onOpenAktivitasHarian,
}: UntukDiriSendiriPageProps) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("tbcare_current_user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const handleTopicClick = (topicId: number) => {
    if (topicId === 1) {
      onOpenPembuanganDahak()
    }
    if (topicId === 2) {
      onOpenEfekSampingObat()
    }
    if (topicId === 3) {
      onOpenPemenuhanNutrisi()
    }
    if (topicId === 4) {
      onOpenAktivitasHarian()
    }
    if (topicId === 5) {
      onOpenPencegahanPenularan()
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f7fa] flex">
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

        <button
          onClick={onBack}
          className="mt-auto flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Edukasi</span>
        </button>
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

          <div className="flex-1" />

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
            <h1 className="text-2xl font-bold text-foreground">Untuk Diri Sendiri</h1>
            <p className="text-muted-foreground">Pelajari cara menjaga kesehatan Anda selama pengobatan TBC</p>
          </div>
          <div className="flex items-center gap-4">
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
            <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
              {educationTopics.map((topic) => (
                <div key={topic.id} className="group cursor-pointer" onClick={() => handleTopicClick(topic.id)}>
                  <div className="bg-gradient-to-r from-[#e8f5e9] to-[#d4edda] rounded-2xl p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300 lg:rounded-3xl lg:p-6">
                    <h3 className="text-lg font-bold text-[#2d5a45] lg:text-xl">{topic.title}</h3>
                    <div className="w-24 h-16 lg:w-32 lg:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white/50">
                      <Image
                        src={topic.image || "/placeholder.svg"}
                        alt={topic.title}
                        width={150}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
