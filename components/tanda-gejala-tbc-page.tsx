"use client"

import { useState } from "react"
import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft, AlertTriangle, X, HeartPulse } from "lucide-react"

interface TandaGejalaTbcPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

const symptoms = [
  {
    id: 1,
    title: "Batuk berdahak selama lebih dari 2 minggu",
    image: "/symptom-cough.jpg",
    description:
      "Batuk yang berlangsung lebih dari 2 minggu, terutama jika disertai dahak atau darah, adalah gejala utama TBC paru.",
    tips: "Segera periksakan diri ke fasilitas kesehatan jika mengalami batuk berkepanjangan.",
  },
  {
    id: 2,
    title: "Sesak napas dan nyeri dada.",
    image: "/symptom-chest-pain.jpg",
    description:
      "Sesak napas dan nyeri dada dapat terjadi akibat kerusakan pada paru-paru yang disebabkan oleh bakteri TBC.",
    tips: "Hindari aktivitas berat dan segera konsultasi ke dokter.",
  },
  {
    id: 3,
    title: "Demam berkepanjangan atau berulang tanpa penyebab yang jelas",
    image: "/symptom-fever.jpg",
    description:
      "Demam ringan yang terus-menerus atau berulang bisa menjadi tanda bahwa tubuh sedang melawan infeksi TBC.",
    tips: "Catat suhu tubuh secara berkala dan laporkan ke tenaga kesehatan.",
  },
  {
    id: 4,
    title: "Berkeringat di malam hari meskipun tidak aktif",
    image: "/symptom-night-sweats.jpg",
    description: "Keringat malam yang berlebihan tanpa sebab yang jelas adalah salah satu gejala klasik TBC.",
    tips: "Gunakan pakaian tidur yang nyaman dan jaga ventilasi kamar.",
  },
  {
    id: 5,
    title: "Penurunan berat badan yang drastis",
    image: "/symptom-weight-loss.jpg",
    description: "Penurunan berat badan tanpa diet atau olahraga bisa menandakan infeksi TBC yang aktif.",
    tips: "Konsumsi makanan bergizi dan tinggi protein untuk menjaga berat badan.",
  },
  {
    id: 6,
    title: "Hilangnya nafsu makan dan mudah lelah",
    image: "/symptom-fatigue.jpg",
    description: "Rasa lelah yang berlebihan dan hilangnya nafsu makan sering dialami penderita TBC.",
    tips: "Istirahat yang cukup dan makan dalam porsi kecil tapi sering.",
  },
]

export default function TandaGejalaTbcPage({ onBack, onNavigate }: TandaGejalaTbcPageProps) {
  const [selectedSymptom, setSelectedSymptom] = useState<(typeof symptoms)[0] | null>(null)

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
          <span>Kembali</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="flex items-center gap-3 p-4 lg:hidden">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="bg-white px-6 py-2 rounded-full shadow-sm">
            <h1 className="text-lg font-bold text-[#1e3a5f]">Tanda dan Gejala TBC</h1>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tanda dan Gejala TBC</h1>
            <p className="text-muted-foreground">Kenali tanda-tanda awal TBC untuk penanganan yang lebih cepat</p>
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
            {/* Mobile Layout - Interactive Masonry-style grid */}
            <div className="lg:hidden">
              {/* Top row - 3 cards */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {/* Left column */}
                <div className="flex flex-col gap-2">
                  {/* Batuk berdahak - tall card */}
                  <button
                    onClick={() => setSelectedSymptom(symptoms[0])}
                    className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md active:scale-95 transition-transform duration-200 text-left"
                  >
                    <Image
                      src={symptoms[0].image || "/placeholder.svg"}
                      alt={symptoms[0].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-[#4a90d9]/30 to-[#4a90d9]/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-xs font-medium leading-tight">{symptoms[0].title}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </button>

                  {/* Berkeringat di malam hari - tall card */}
                  <button
                    onClick={() => setSelectedSymptom(symptoms[3])}
                    className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md active:scale-95 transition-transform duration-200 text-left"
                  >
                    <Image
                      src={symptoms[3].image || "/placeholder.svg"}
                      alt={symptoms[3].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-[#4a90d9]/30 to-[#4a90d9]/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-xs font-medium leading-tight">{symptoms[3].title}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </button>

                  {/* Penurunan berat badan - square card */}
                  <button
                    onClick={() => setSelectedSymptom(symptoms[4])}
                    className="relative rounded-2xl overflow-hidden aspect-square shadow-md active:scale-95 transition-transform duration-200 text-left"
                  >
                    <Image
                      src={symptoms[4].image || "/placeholder.svg"}
                      alt={symptoms[4].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-[#4a90d9]/30 to-[#4a90d9]/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-xs font-medium leading-tight">{symptoms[4].title}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </button>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-2">
                  {/* Sesak napas - square card */}
                  <button
                    onClick={() => setSelectedSymptom(symptoms[1])}
                    className="relative rounded-2xl overflow-hidden aspect-square shadow-md active:scale-95 transition-transform duration-200 text-left"
                  >
                    <Image
                      src={symptoms[1].image || "/placeholder.svg"}
                      alt={symptoms[1].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-[#4a90d9]/30 to-[#4a90d9]/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-xs font-medium leading-tight">{symptoms[1].title}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </button>

                  {/* Demam berkepanjangan - tall card */}
                  <button
                    onClick={() => setSelectedSymptom(symptoms[2])}
                    className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md active:scale-95 transition-transform duration-200 text-left"
                  >
                    <Image
                      src={symptoms[2].image || "/placeholder.svg"}
                      alt={symptoms[2].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-[#4a90d9]/30 to-[#4a90d9]/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-xs font-medium leading-tight">{symptoms[2].title}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </button>

                  {/* Hilangnya nafsu makan - tall card */}
                  <button
                    onClick={() => setSelectedSymptom(symptoms[5])}
                    className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md active:scale-95 transition-transform duration-200 text-left"
                  >
                    <Image
                      src={symptoms[5].image || "/placeholder.svg"}
                      alt={symptoms[5].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-[#4a90d9]/30 to-[#4a90d9]/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-xs font-medium leading-tight">{symptoms[5].title}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Tap hint */}
              <p className="text-center text-xs text-[#4a90d9]/60 mb-4">Ketuk kartu untuk melihat detail gejala</p>

              {/* Warning Card - Mobile */}
              <div className="bg-gradient-to-r from-[#fee2e2] to-[#fecaca] rounded-2xl p-4 flex gap-4 border border-red-200">
                <div className="w-20 h-20 flex-shrink-0">
                  <Image
                    src="/doctor-warning-illustration.jpg"
                    alt="Warning"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-red-800 font-bold text-sm mb-1">
                    Gejala ini bisa muncul pada berbagai penyakit, bukan hanya TBC.
                  </p>
                  <p className="text-red-700/80 text-xs leading-relaxed">
                    Untuk lebih aman, periksakan diri ke tenaga kesehatan agar mendapat kepastian dan penanganan sedini
                    mungkin. Lebih cepat dicek, lebih baik untuk kesehatanmu.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Clean and minimalist */}
            <div className="hidden lg:block">
              {/* Symptoms Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => setSelectedSymptom(symptom)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group text-left"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={symptom.image || "/placeholder.svg"}
                        alt={symptom.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-bold leading-none">+</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[#1e3a5f] font-semibold text-sm leading-relaxed">{symptom.title}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Warning Card - Desktop */}
              <div className="bg-gradient-to-r from-[#fee2e2] to-[#fecaca] rounded-2xl p-6 flex items-start gap-6 border border-red-200">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-red-800 font-bold text-lg mb-2">Penting untuk Diketahui</h3>
                  <p className="text-red-700/80 leading-relaxed">
                    Gejala ini bisa muncul pada berbagai penyakit, bukan hanya TBC. Untuk lebih aman, periksakan diri ke
                    tenaga kesehatan agar mendapat kepastian dan penanganan sedini mungkin. Lebih cepat dicek, lebih
                    baik untuk kesehatanmu.
                  </p>
                </div>
                <div className="w-32 h-32 flex-shrink-0">
                  <Image
                    src="/doctor-warning-illustration.jpg"
                    alt="Doctor"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {selectedSymptom && (
        <div
          className="fixed inset-0 z-50 flex items-end lg:items-center lg:justify-center"
          onClick={() => setSelectedSymptom(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" />

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-t-3xl lg:rounded-2xl p-6 pb-8 animate-in slide-in-from-bottom lg:slide-in-from-bottom-0 lg:zoom-in-95 duration-300 w-full lg:max-w-lg lg:mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar - mobile only */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 lg:hidden" />

            {/* Image with close button overlaid */}
            <div className="relative w-full h-40 lg:h-56 rounded-2xl overflow-hidden mb-4">
              <Image
                src={selectedSymptom.image || "/placeholder.svg"}
                alt={selectedSymptom.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/60 to-transparent" />
              <button
                onClick={() => setSelectedSymptom(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">{selectedSymptom.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{selectedSymptom.description}</p>

            {/* Tips section */}
            <div className="bg-[#e3f2fd] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <HeartPulse className="w-4 h-4 text-[#4a90d9]" />
                <span className="text-sm font-semibold text-[#1e3a5f]">Tips</span>
              </div>
              <p className="text-sm text-[#1e3a5f]/70">{selectedSymptom.tips}</p>
            </div>

            {/* Navigation hint - mobile only */}
            <p className="text-center text-xs text-gray-400 mt-4 lg:hidden">
              Geser ke bawah atau ketuk di luar untuk menutup
            </p>
          </div>
        </div>
      )}

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
