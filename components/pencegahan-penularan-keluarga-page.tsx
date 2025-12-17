"use client"

import Image from "next/image"
import {
  Home,
  BookOpen,
  Calendar,
  ChevronLeft,
  HeartPulse,
  ClipboardList,
  ShieldCheck,
  Hand,
  Utensils,
  BedDouble,
  Heart,
} from "lucide-react"

interface PencegahanPenularanKeluargaPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

const preventionTips = [
  {
    icon: ClipboardList,
    title: "Periksa bila batuk >2 minggu",
    description: "Segera ke puskesmas untuk cek dahak",
  },
  {
    icon: ShieldCheck,
    title: "Gunakan masker",
    description: "Lindungi orang lain dari percikan batuk/bersin",
  },
  {
    icon: Hand,
    title: "Etika Batuk & Cuci Tangan",
    description: "Tutup mulut dengan siku atau tisu, lalu buang tisu ke tempat sampah",
  },
  {
    icon: Utensils,
    title: "Makan Seimbang dan Bergizi",
    description: "Konsumsi protein yang cukup (telur, ikan, tempe) untuk daya tahan",
  },
  {
    icon: BedDouble,
    title: "Istirahat Cukup & Berjemur",
    description: "Tidur teratur dan dapatkan sinar matahari pagi",
  },
  {
    icon: Heart,
    title: "Dukungan Tanpa Stigma",
    description: "Jangan mendiskriminasi, dukung pasien TB untuk sembuh",
  },
]

export default function PencegahanPenularanKeluargaPage({ onBack, onNavigate }: PencegahanPenularanKeluargaPageProps) {
  return (
    <div className="min-h-screen bg-[#f0f7fa] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4a90d9] to-[#2563eb] flex items-center justify-center">
            <HeartPulse className="w-6 h-6 text-white" />
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
        {/* Mobile Layout */}
        <div className="lg:hidden min-h-screen pb-24">
          {/* Mobile Header with Illustration */}
          <div className="relative bg-gradient-to-b from-white to-[#f0f7fa] px-4 pt-4 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-[#1e3a5f]">Pencegahan Penularan</h1>
            </div>

            <div className="flex items-start justify-between mt-2">
              <div className="flex-1 pr-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Hindari dekat dengan orang yang batuk, bersin, atau berbicara tanpa masker.
                </p>
              </div>
              <div className="w-28 h-28 flex-shrink-0">
                <Image
                  src="/woman-avoiding-contact-pink-illustration.jpg"
                  alt="Avoid close contact"
                  width={112}
                  height={112}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Quote Box */}
          <div className="px-4 -mt-2">
            <div className="bg-[#4a90d9] rounded-2xl p-4 text-white">
              <p className="text-sm font-medium leading-relaxed">
                "Tuberkulosis (TB) tidak menular melalui makanan, minuman, pakaian, atau sentuhan biasa."
              </p>
            </div>
          </div>

          {/* Risk Warning Card */}
          <div className="px-4 mt-4">
            <div className="bg-[#e3f2fd] rounded-3xl p-4 flex items-center gap-4">
              <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                <Image
                  src="/woman-by-window-illustration.jpg"
                  alt="Woman by window"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#1e3a5f] font-semibold text-sm leading-relaxed">
                Waspadai risiko lebih tinggi bila berada di ruangan sempit, tertutup, tanpa ventilasi, atau tinggal
                bersama banyak orang.
              </p>
            </div>
          </div>

          {/* Prevention Tips Grid */}
          <div className="px-4 mt-6">
            <div className="grid grid-cols-3 gap-3">
              {preventionTips.map((tip, index) => {
                const IconComponent = tip.icon
                return (
                  <div key={index} className="bg-[#e3f2fd] rounded-2xl p-3 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#d4e8f9] flex items-center justify-center mb-2">
                      <IconComponent className="w-6 h-6 text-[#4a90d9]" />
                    </div>
                    <h3 className="text-xs font-bold text-[#1e3a5f] mb-1 leading-tight">{tip.title}</h3>
                    <p className="text-[10px] text-gray-600 leading-tight">{tip.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Desktop Header */}
          <header className="bg-white border-b border-gray-100 px-8 py-6">
            <div className="max-w-4xl">
              <h1 className="text-2xl font-bold text-foreground">Pencegahan Penularan</h1>
              <p className="text-muted-foreground">Cara mencegah penularan TBC di lingkungan keluarga</p>
            </div>
          </header>

          <main className="p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Hero Section */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-8">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">Hindari Kontak Dekat</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Hindari dekat dengan orang yang batuk, bersin, atau berbicara tanpa masker. Menjaga jarak adalah
                      langkah pertama pencegahan.
                    </p>
                    <div className="bg-[#4a90d9] rounded-xl p-4 text-white">
                      <p className="text-sm font-medium">
                        "Tuberkulosis (TB) tidak menular melalui makanan, minuman, pakaian, atau sentuhan biasa."
                      </p>
                    </div>
                  </div>
                  <div className="w-48 h-48 flex-shrink-0 rounded-2xl overflow-hidden bg-[#f0f7fa]">
                    <Image
                      src="/woman-avoiding-contact-pink-illustration.jpg"
                      alt="Avoid close contact"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Risk Warning */}
              <div className="bg-gradient-to-r from-[#e3f2fd] to-[#d4e8f9] rounded-3xl p-6">
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-white/50">
                    <Image
                      src="/woman-by-window-illustration.jpg"
                      alt="Woman by window"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">Waspadai Lingkungan Berisiko</h3>
                    <p className="text-[#1e3a5f]">
                      Waspadai risiko lebih tinggi bila berada di ruangan sempit, tertutup, tanpa ventilasi, atau
                      tinggal bersama banyak orang. Pastikan sirkulasi udara yang baik di rumah.
                    </p>
                  </div>
                </div>
              </div>

              {/* Prevention Tips */}
              <div>
                <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">Tips Pencegahan</h2>
                <div className="grid grid-cols-3 gap-4">
                  {preventionTips.map((tip, index) => {
                    const IconComponent = tip.icon
                    return (
                      <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 rounded-xl bg-[#e3f2fd] flex items-center justify-center mb-4">
                          <IconComponent className="w-7 h-7 text-[#4a90d9]" />
                        </div>
                        <h3 className="font-bold text-[#1e3a5f] mb-2">{tip.title}</h3>
                        <p className="text-sm text-gray-600">{tip.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
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
