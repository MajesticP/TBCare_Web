"use client"

import { useState } from "react"
import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft } from "lucide-react"

interface PembuanganDahakPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

const instructions = [
  {
    id: 1,
    title: "Tutup mulut saat batuk/bersin 🤧",
    description: "Gunakan tisu atau lengan atas (bukan tangan).",
  },
  {
    id: 2,
    title: "Gunakan wadah tertutup berisi cairan pembersih 🧴",
    description: "Contohnya botol/toples kecil berisi cairan pel atau sabun.",
  },
  {
    id: 3,
    title: "Langsung tutup rapat setelah meludah 🔒",
    description: "Supaya kuman tidak menyebar ke udara",
  },
  {
    id: 4,
    title: "Buang isi wadah ke toilet setiap hari 🚽",
    description: "Lalu siram sampai bersih",
  },
  {
    id: 5,
    title: "Buang tisu bekas ke tempat sampah tertutup 🗑️",
    description: "Cuci tangan pakai sabun sesudahnya.",
  },
]

export default function PembuanganDahakPage({ onBack, onNavigate }: PembuanganDahakPageProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

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
          <h1 className="text-xl font-bold text-foreground">Pembuangan Dahak</h1>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
          <div>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Edukasi</span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span>Untuk Diri Sendiri</span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span className="text-foreground font-medium">Pembuangan Dahak</span>
            </nav>
            <h1 className="text-2xl font-bold text-foreground">Pembuangan Dahak</h1>
            <p className="text-muted-foreground">Panduan cara membuang dahak dengan benar dan aman</p>
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
            {/* Hero Illustration - Mobile */}
            <div className="mb-6 lg:hidden">
              <div className="bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] rounded-2xl p-4 flex items-center justify-center">
                <Image
                  src="/images/people-covering-mouth-coughing.jpg"
                  alt="Pembuangan Dahak"
                  width={280}
                  height={120}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Desktop Layout with Hero */}
            <div className="hidden lg:block mb-8">
              <div className="bg-gradient-to-br from-[#e8f5e9] to-[#d4edda] rounded-3xl p-8 flex items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#2d5a45] mb-4">Pentingnya Membuang Dahak dengan Benar</h2>
                  <p className="text-[#3d6b55] text-lg leading-relaxed">
                    Dahak dari pasien TBC mengandung bakteri yang dapat menular ke orang lain. Ikuti panduan ini untuk
                    melindungi keluarga dan lingkungan Anda.
                  </p>
                </div>
                <div className="w-80 h-48 flex-shrink-0">
                  <Image
                    src="/images/people-covering-mouth-coughing.jpg"
                    alt="Pembuangan Dahak"
                    width={320}
                    height={192}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Instruction Cards */}
            <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
              {instructions.map((instruction, index) => (
                <div
                  key={instruction.id}
                  className={`bg-gradient-to-r from-[#e8f5e9] to-[#d4edda] rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg lg:rounded-3xl ${
                    expandedCard === instruction.id ? "ring-2 ring-[#4caf50]" : ""
                  }`}
                  onClick={() => setExpandedCard(expandedCard === instruction.id ? null : instruction.id)}
                >
                  <h3 className="text-center text-[#2d5a45] font-bold text-lg mb-2 lg:text-xl">{instruction.title}</h3>
                  <p className="text-center text-[#3d6b55] text-sm lg:text-base">{instruction.description}</p>

                  {/* Expanded content on desktop */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedCard === instruction.id ? "max-h-40 mt-4 pt-4 border-t border-[#4caf50]/20" : "max-h-0"
                    }`}
                  >
                    <p className="text-[#3d6b55] text-sm lg:text-base">
                      {index === 0 &&
                        "Dengan menutup mulut saat batuk atau bersin, Anda mencegah percikan dahak yang mengandung bakteri TBC menyebar ke udara dan menginfeksi orang lain di sekitar Anda."}
                      {index === 1 &&
                        "Wadah tertutup berisi cairan pembersih akan membunuh bakteri TBC dalam dahak. Pastikan wadah selalu tertutup rapat untuk mencegah penyebaran bakteri."}
                      {index === 2 &&
                        "Bakteri TBC dapat bertahan di udara selama beberapa jam. Menutup wadah dengan rapat segera setelah meludah mencegah bakteri menyebar ke lingkungan sekitar."}
                      {index === 3 &&
                        "Membuang isi wadah ke toilet setiap hari dan menyiramnya sampai bersih adalah cara aman untuk membuang dahak yang mengandung bakteri TBC."}
                      {index === 4 &&
                        "Tisu bekas yang mengandung dahak harus dibuang ke tempat sampah tertutup. Selalu cuci tangan dengan sabun setelahnya untuk mencegah penyebaran bakteri."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Additional Tips Section */}
            <div className="hidden lg:block mt-8">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-4">Tips Tambahan</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-[#e8f5e9] rounded-2xl">
                    <div className="text-3xl mb-2">💨</div>
                    <h4 className="font-semibold text-[#2d5a45] mb-1">Ventilasi Ruangan</h4>
                    <p className="text-sm text-[#3d6b55]">Buka jendela agar udara segar masuk</p>
                  </div>
                  <div className="text-center p-4 bg-[#e8f5e9] rounded-2xl">
                    <div className="text-3xl mb-2">☀️</div>
                    <h4 className="font-semibold text-[#2d5a45] mb-1">Sinar Matahari</h4>
                    <p className="text-sm text-[#3d6b55]">Bakteri TBC mati terkena sinar UV</p>
                  </div>
                  <div className="text-center p-4 bg-[#e8f5e9] rounded-2xl">
                    <div className="text-3xl mb-2">🧼</div>
                    <h4 className="font-semibold text-[#2d5a45] mb-1">Cuci Tangan</h4>
                    <p className="text-sm text-[#3d6b55]">Selalu cuci tangan setelah kontak</p>
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
