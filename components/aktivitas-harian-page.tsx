"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Home,
  BookOpen,
  Calendar,
  ChevronLeft,
  ExternalLink,
  Wind,
  Dumbbell,
  Heart,
  Activity,
  AlertTriangle,
} from "lucide-react"

interface AktivitasHarianPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

const activities = [
  {
    id: 1,
    title: "Latihan Pernapasan",
    description:
      "Tarik napas dalam dan buang perlahan (deep breathing) beberapa kali sehari untuk membantu fungsi paru.",
    icon: Wind,
  },
  {
    id: 2,
    title: "Aktivitas Aerobik Ringan",
    description:
      "Jalan kaki di rumah, peregangan sambil berdiri/duduk, atau bersepeda statis ringan ±10-20 menit sesuai toleransi.",
    icon: Activity,
  },
  {
    id: 3,
    title: "Penguatan Otot Ringan",
    description: "Squat ringan, push-up dinding, atau latihan beban tubuh sendiri untuk mencegah kelemahan otot.",
    icon: Dumbbell,
  },
  {
    id: 4,
    title: "Aktivitas Sehari-hari",
    description: "Membersihkan rumah ringan, berkebun, atau aktivitas domestik lain yang tidak membuat sesak.",
    icon: Heart,
  },
  {
    id: 5,
    title: "Pemantauan",
    description: "Hentikan bila muncul sesak berat, nyeri dada, batuk darah, demam tinggi, atau efek samping obat.",
    icon: AlertTriangle,
  },
]

export default function AktivitasHarianPage({ onBack, onNavigate }: AktivitasHarianPageProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

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

        <button
          onClick={onBack}
          className="mt-auto flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="flex items-center gap-4 p-4 lg:hidden">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-[#2d5a45]">Aktivitas Harian</h1>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Edukasi</span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span>Untuk Diri Sendiri</span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span className="text-[#4a90d9]">Aktivitas Harian</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Aktivitas Harian</h1>
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
          <div className="max-w-md mx-auto lg:max-w-5xl">
            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              {/* Warning Banner */}
              <div className="bg-gradient-to-r from-[#f8b4b4] to-[#f9a8a8] rounded-2xl p-4 text-center">
                <p className="text-sm font-medium text-[#7c2d2d] leading-relaxed">
                  Pastikan pengobatan TBC teratur, konsultasi dokter sebelum olahraga, mulai perlahan, jaga asupan gizi
                  dan istirahat.
                </p>
              </div>

              {/* Activity List */}
              <div className="bg-gradient-to-br from-[#e8f5e9] to-[#d4edda] rounded-2xl p-4">
                <ul className="space-y-4">
                  {activities.map((activity) => (
                    <li key={activity.id} className="flex gap-2">
                      <span className="text-[#2d5a45] font-bold">•</span>
                      <div>
                        <span className="font-semibold text-[#2d5a45]">{activity.title}:</span>{" "}
                        <span className="text-[#3d6b55] text-sm">{activity.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video Link */}
              <a
                href="https://youtu.be/N8ayqS7FKVs?si=QAyZ82wHdfx2mn1w"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-[#fef3c7] to-[#fde68a] rounded-2xl p-4 text-center hover:shadow-md transition-all"
              >
                <p className="text-[#92400e] font-medium text-sm break-all">
                  https://youtu.be/N8ayqS7FKVs?si=QAyZ82wHdfx2mn1w
                </p>
              </a>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block space-y-6">
              {/* Top Section - Warning + Video */}
              <div className="grid grid-cols-3 gap-6">
                {/* Warning Banner */}
                <div className="col-span-2 bg-gradient-to-r from-[#fee2e2] to-[#fecaca] rounded-2xl p-6 flex items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-white/50 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-800 mb-2">Perhatian Penting</h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      Pastikan pengobatan TBC teratur, konsultasi dokter sebelum olahraga, mulai perlahan, jaga asupan
                      gizi dan istirahat.
                    </p>
                  </div>
                </div>

                {/* Video Link */}
                <a
                  href="https://youtu.be/N8ayqS7FKVs?si=QAyZ82wHdfx2mn1w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 bg-white/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ExternalLink className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="font-semibold text-amber-800">Video Edukasi</span>
                  <span className="text-xs text-amber-600">Klik untuk menonton</span>
                </a>
              </div>

              {/* Activity Cards Grid */}
              <div className="grid grid-cols-3 gap-4">
                {activities.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div
                      key={activity.id}
                      onClick={() => setExpandedId(expandedId === activity.id ? null : activity.id)}
                      className={`bg-white rounded-2xl p-5 border-2 cursor-pointer transition-all duration-300 ${
                        expandedId === activity.id
                          ? "border-[#4a90d9] shadow-lg"
                          : "border-gray-100 hover:border-[#d4edda] hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            activity.id === 5 ? "bg-red-100" : "bg-[#e8f5e9]"
                          }`}
                        >
                          <IconComponent
                            className={`w-6 h-6 ${activity.id === 5 ? "text-red-500" : "text-[#2d5a45]"}`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#2d5a45] mb-2">{activity.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{activity.description}</p>
                        </div>
                      </div>
                      {expandedId === activity.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs text-[#4a90d9]">
                            Lakukan secara rutin dan konsisten untuk hasil yang optimal.
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Tips Section */}
              <div className="bg-gradient-to-r from-[#e8f5e9] to-[#d4edda] rounded-2xl p-6">
                <h3 className="font-bold text-[#2d5a45] mb-4">Tips Aktivitas Harian</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white/70 rounded-xl p-4 text-center">
                    <span className="text-2xl mb-2 block">🌅</span>
                    <span className="text-sm font-medium text-[#2d5a45]">Mulai Pagi</span>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4 text-center">
                    <span className="text-2xl mb-2 block">💧</span>
                    <span className="text-sm font-medium text-[#2d5a45]">Minum Air</span>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4 text-center">
                    <span className="text-2xl mb-2 block">😴</span>
                    <span className="text-sm font-medium text-[#2d5a45]">Istirahat Cukup</span>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4 text-center">
                    <span className="text-2xl mb-2 block">🧘</span>
                    <span className="text-sm font-medium text-[#2d5a45]">Tetap Tenang</span>
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
