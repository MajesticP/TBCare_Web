"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft } from "lucide-react"

interface UntukKeluargaPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
  onOpenApaItuTbc?: () => void
  onOpenPencegahanPenularan?: () => void
  onOpenTandaGejala?: () => void
  onOpenPeranKeluarga?: () => void
  onOpenVaksinBcg?: () => void
}

interface UserData {
  nama: string
  waktuMinum: string
}

const educationTopics = [
  {
    id: 1,
    title: "Apa itu TBC",
    image: "/doctor-examining-bacteria-with-magnifying-glass-bl.jpg",
  },
  {
    id: 2,
    title: "Pencegahan Penularan",
    image: "/healthcare-workers-medical-team-blue-illustration.jpg",
  },
  {
    id: 3,
    title: "Tanda dan Gejala TBC",
    image: "/question-mark-symptoms-medical-blue-illustration.jpg",
  },
  {
    id: 4,
    title: "Peran Keluarga",
    image: "/family-support-caring-blue-illustration.jpg",
  },
  {
    id: 5,
    title: "Vaksin BCG untuk Anak",
    image: "/doctor-vaccinating-child-blue-illustration.jpg",
  },
]

export default function UntukKeluargaPage({
  onBack,
  onNavigate,
  onOpenApaItuTbc,
  onOpenPencegahanPenularan,
  onOpenTandaGejala,
  onOpenPeranKeluarga,
  onOpenVaksinBcg,
}: UntukKeluargaPageProps) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("tbcare_current_user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const handleTopicClick = (topicId: number) => {
    switch (topicId) {
      case 1:
        if (onOpenApaItuTbc) onOpenApaItuTbc()
        break
      case 2:
        if (onOpenPencegahanPenularan) onOpenPencegahanPenularan()
        break
      case 3:
        if (onOpenTandaGejala) onOpenTandaGejala()
        break
      case 4:
        if (onOpenPeranKeluarga) onOpenPeranKeluarga()
        break
      case 5:
        if (onOpenVaksinBcg) onOpenVaksinBcg()
        break
      default:
        console.log(`Topic ${topicId} clicked`)
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
        <header className="flex items-center justify-center p-4 lg:hidden relative">
          <button
            onClick={onBack}
            className="absolute left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#4a90d9]/30">
            <Image
              src="/images/avatar.png"
              alt="Profile"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Untuk Keluarga</h1>
            <p className="text-muted-foreground">
              Pelajari cara mendukung anggota keluarga yang sedang menjalani pengobatan TBC
            </p>
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
                  {/* Mobile Design - Illustration on left, text on right */}
                  <div className="lg:hidden bg-[#e3f2fd] rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
                    <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white/50">
                      <Image
                        src={topic.image || "/placeholder.svg"}
                        alt={topic.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-[#1e3a5f] leading-tight">{topic.title}</h3>
                  </div>

                  {/* Desktop Design - Similar to Untuk Diri Sendiri */}
                  <div className="hidden lg:flex bg-gradient-to-r from-[#e3f2fd] to-[#d4e8f9] rounded-3xl p-6 items-center justify-between hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-bold text-[#1e3a5f]">{topic.title}</h3>
                    <div className="w-32 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white/50">
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
