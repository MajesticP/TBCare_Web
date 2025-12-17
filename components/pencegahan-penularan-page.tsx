"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Home,
  BookOpen,
  Calendar,
  ChevronLeft,
  Stethoscope,
  ShieldCheck,
  Hand,
  Utensils,
  Sun,
  Heart,
} from "lucide-react"

interface PencegahanPenularanPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

const preventionTips = [
  {
    id: 1,
    title: "Periksa bila batuk >2 minggu",
    description: "Segera ke puskesmas untuk cek dahak",
    icon: Stethoscope,
    color: "bg-[#5a8a6e]",
  },
  {
    id: 2,
    title: "Gunakan masker",
    description: "Lindungi orang lain dari percikan batuk/bersin",
    icon: ShieldCheck,
    color: "bg-[#6b9a7e]",
  },
  {
    id: 3,
    title: "Etika Batuk & Cuci Tangan",
    description: "Tutup mulut dengan siku atau tisu, lalu buang tisu ke tempat sampah",
    icon: Hand,
    color: "bg-[#7caa8e]",
  },
  {
    id: 4,
    title: "Makan Seimbang dan Bergizi",
    description: "Konsumsi protein yang cukup (telur, ikan, tempe) untuk daya tahan",
    icon: Utensils,
    color: "bg-[#5a8a6e]",
  },
  {
    id: 5,
    title: "Istirahat Cukup & Berjemur",
    description: "Tidur teratur dan dapatkan sinar matahari pagi",
    icon: Sun,
    color: "bg-[#6b9a7e]",
  },
  {
    id: 6,
    title: "Dukungan Tanpa Stigma",
    description: "Jangan mendiskriminasi, dukung pasien TB untuk sembuh",
    icon: Heart,
    color: "bg-[#7caa8e]",
  },
]

export default function PencegahanPenularanPage({ onBack, onNavigate }: PencegahanPenularanPageProps) {
  const [expandedTip, setExpandedTip] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#f0f7e8] flex">
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
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-[#2d5a45]">Pencegahan Penularan TBC</h1>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Edukasi</span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span>Untuk Diri Sendiri</span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span className="text-[#2d5a45] font-medium">Pencegahan Penularan</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Pencegahan Penularan TBC</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 pb-24 lg:p-8 lg:pb-8">
          <div className="max-w-md mx-auto lg:max-w-6xl">
            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              {/* Hero Section */}
              <div className="bg-gradient-to-br from-[#d4edda] to-[#e8f5e9] rounded-3xl p-5 relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#2d5a45] leading-tight mb-2">
                      Hindari Rasa Takut akan TBC
                    </h2>
                    <p className="text-sm text-[#4a7a5a]">
                      Hindari dekat dengan orang yang batuk, bersin, atau berbicara tanpa masker.
                    </p>
                  </div>
                  <div className="w-28 h-28 flex-shrink-0">
                    <Image
                      src="/woman-wearing-mask-illustration-green-theme.jpg"
                      alt="Woman with mask"
                      width={120}
                      height={120}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-[#5a8a6e] rounded-2xl p-4">
                <p className="text-white text-center text-sm font-medium italic">
                  "Tuberkulosis (TB) tidak menular melalui makanan, minuman, pakaian, atau sentuhan biasa."
                </p>
              </div>

              {/* Risk Warning Card */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 flex-shrink-0 bg-[#e0f0ff] rounded-2xl overflow-hidden">
                    <Image
                      src="/woman-at-window-ventilation-illustration.jpg"
                      alt="Woman at window"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-[#2d5a45] font-medium leading-relaxed">
                    Waspadai risiko lebih tinggi bila berada di ruangan sempit, tertutup, tanpa ventilasi, atau tinggal
                    bersama banyak orang.
                  </p>
                </div>
              </div>

              {/* Prevention Tips Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {preventionTips.map((tip) => (
                  <button
                    key={tip.id}
                    onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={`w-16 h-16 ${tip.color} rounded-2xl flex items-center justify-center mb-2 shadow-md`}
                    >
                      <tip.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xs font-bold text-[#2d5a45] leading-tight mb-1">{tip.title}</h4>
                    <p className="text-[10px] text-[#5a8a6e] leading-tight">{tip.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block space-y-8">
              {/* Hero Section */}
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-[#d4edda] to-[#e8f5e9] rounded-3xl p-8 relative overflow-hidden">
                  <div className="flex items-center gap-6">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-[#2d5a45] leading-tight mb-4">
                        Hindari Rasa Takut akan TBC
                      </h2>
                      <p className="text-[#4a7a5a] leading-relaxed">
                        Hindari dekat dengan orang yang batuk, bersin, atau berbicara tanpa masker. Dengan pemahaman
                        yang benar, Anda dapat melindungi diri dan keluarga.
                      </p>
                    </div>
                    <div className="w-40 h-40 flex-shrink-0">
                      <Image
                        src="/woman-wearing-mask-illustration-green-theme.jpg"
                        alt="Woman with mask"
                        width={160}
                        height={160}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Info Banner */}
                  <div className="bg-[#5a8a6e] rounded-2xl p-6 flex-1 flex items-center">
                    <p className="text-white text-center text-lg font-medium italic">
                      "Tuberkulosis (TB) tidak menular melalui makanan, minuman, pakaian, atau sentuhan biasa."
                    </p>
                  </div>

                  {/* Risk Warning Card */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-5">
                    <div className="w-20 h-20 flex-shrink-0 bg-[#e0f0ff] rounded-xl overflow-hidden">
                      <Image
                        src="/woman-at-window-ventilation-illustration.jpg"
                        alt="Woman at window"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-[#2d5a45] font-medium leading-relaxed">
                      Waspadai risiko lebih tinggi bila berada di ruangan sempit, tertutup, tanpa ventilasi, atau
                      tinggal bersama banyak orang.
                    </p>
                  </div>
                </div>
              </div>

              {/* Prevention Tips Grid */}
              <div>
                <h3 className="text-xl font-bold text-[#2d5a45] mb-6">Langkah Pencegahan</h3>
                <div className="grid grid-cols-3 gap-6">
                  {preventionTips.map((tip) => (
                    <button
                      key={tip.id}
                      onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left transition-all duration-300 hover:shadow-lg hover:border-[#5a8a6e]/30 ${
                        expandedTip === tip.id ? "ring-2 ring-[#5a8a6e]" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-14 h-14 ${tip.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <tip.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#2d5a45] mb-1">{tip.title}</h4>
                          <p className="text-sm text-[#5a8a6e] leading-relaxed">{tip.description}</p>
                        </div>
                      </div>
                      {expandedTip === tip.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-600">
                            {tip.id === 1 &&
                              "Batuk berkepanjangan lebih dari 2 minggu adalah salah satu gejala utama TBC. Segera periksakan diri ke fasilitas kesehatan terdekat untuk mendapatkan diagnosis yang tepat."}
                            {tip.id === 2 &&
                              "Masker membantu mencegah penyebaran droplet yang mengandung bakteri TBC saat batuk atau bersin. Gunakan masker dengan benar menutupi hidung dan mulut."}
                            {tip.id === 3 &&
                              "Etika batuk yang baik dan mencuci tangan secara teratur dapat mengurangi risiko penularan penyakit. Gunakan tisu sekali pakai dan buang dengan benar."}
                            {tip.id === 4 &&
                              "Nutrisi yang baik memperkuat sistem kekebalan tubuh untuk melawan infeksi. Pastikan asupan protein dan vitamin yang cukup setiap hari."}
                            {tip.id === 5 &&
                              "Istirahat yang cukup membantu pemulihan tubuh. Sinar matahari pagi mengandung vitamin D yang baik untuk sistem kekebalan tubuh."}
                            {tip.id === 6 &&
                              "Stigma dapat membuat pasien TBC enggan berobat. Berikan dukungan moral dan bantu mereka menjalani pengobatan sampai tuntas."}
                          </p>
                        </div>
                      )}
                    </button>
                  ))}
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
