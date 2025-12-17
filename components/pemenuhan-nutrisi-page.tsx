"use client"

import type React from "react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useState } from "react"
import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

interface PemenuhanNutrisiPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

const slides = [
  {
    id: 1,
    type: "intro",
    title: "Pemenuhan Nutrisi",
    videoUrl: "https://youtu.be/XQlwcqf4lgQ?si=h89CUilH70n8h2hD",
  },
  {
    id: 2,
    type: "content",
    sections: [
      {
        title: "Syarat Diet",
        bgColor: "bg-gradient-to-b from-[#c5e8b7] to-[#e8f5e9]",
        items: [
          "Energi tinggi Karbohidrat cukup (60-70% total energi)",
          "Protein tinggi (75-100 gr/hari)/ 2-2.5 gr/kg BBI",
          "Lemak cukup (20 ± 25% total energi)",
          "Vitamin dan mineral cukup, terutama vitamin C dan Fe",
          "Bentuk makanan sesuai kemampuan pasien Makanan mudah cerna",
        ],
      },
      {
        title: "Makanan Anjuran",
        bgColor: "bg-white",
        items: [
          { name: "Karbohidrat", desc: "Nasi, roti, dan hasil olahan tepung seperti kue" },
          { name: "Protein", desc: "Daging sapi, ayam, ikan, telur, susu, dan hasil olahan seperti keju dan yoghurt" },
          { name: "Protein Nabati", desc: "Semua jenis kacang-kacangan dan hasil olahannya seperti tempe dan keju" },
          {
            name: "Sayuran",
            desc: "Semua jenis sayuran seperti; bayam, buncis, daun singkong, kacang panjang, labu siam dan wortel direbus, ditumis dan kukus",
          },
          {
            name: "Buah-buahan",
            desc: "Semua jenis segar seperti; pepaya, semangka, melon, pisang, buah kaleng, buah kering dan jus buah",
          },
          { name: "Lemak dan minyak", desc: "Minyak goreng, mentega, margarin, santan encer, salad" },
        ],
      },
    ],
  },
  {
    id: 3,
    type: "warning",
    title: "Tidak Dianjurkan",
    items: [
      "Hindari tembakau dalam segala bentuk.",
      "Jangan minum alkohol - dapat menambah risiko kerusakan hati dari beberapa obat yang dipakai untuk mengobati TB Anda.",
      "Batasi kopi dan minuman berkafein lainnya",
      "Batasi produk olahan, seperti gula, roti putih, dan nasi putih.",
      "Hindari tinggi lemak, tinggi kolesterol daging merah dan bukannya beban di sumber protein lebih ramping seperti unggas, kacang, tahu, dan ikan.",
      "Makanan yang dimasak dengan minyak kelapa atau santan kental",
    ],
  },
]

export default function PemenuhanNutrisiPage({ onBack, onNavigate }: PemenuhanNutrisiPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
    }
    if (touchEnd - touchStart > 75) {
      setCurrentSlide((prev) => Math.max(prev - 1, 0))
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

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
        <header className="flex items-center justify-between p-4 lg:hidden">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-[#2d5a45]">Pemenuhan Nutrisi</h1>
          <div className="w-10" />
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Edukasi</span>
              <ChevronRight className="w-4 h-4" />
              <span>Untuk Diri Sendiri</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#4a90d9]">Pemenuhan Nutrisi</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Pemenuhan Nutrisi</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 pb-24 lg:p-8 lg:pb-8">
          <div className="max-w-md mx-auto lg:max-w-6xl">
            {/* Mobile Swipeable Slides */}
            <div
              className="lg:hidden overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Slide 1: Intro */}
                <div className="w-full flex-shrink-0 px-1">
                  <div className="bg-gradient-to-b from-[#e8f5e9] to-[#c5e8b7] rounded-3xl p-6 min-h-[500px] flex flex-col">
                    <div className="flex-1 flex items-center justify-center mb-6">
                      <Image
                        src="/images/woman-cooking-salad.jpg"
                        alt="Nutrition"
                        width={250}
                        height={200}
                        className="w-full max-w-[250px] h-auto object-contain"
                      />
                    </div>
                    <div className="bg-[#d4e8d4] rounded-2xl p-4">
                      <a
                        href="https://youtu.be/XQlwcqf4lgQ?si=h89CUilH70n8h2hD"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-[#2d5a45] text-sm font-medium break-all hover:underline"
                      >
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        https://youtu.be/XQlwcqf4lgQ?si=h89CUilH70n8h2hD
                      </a>
                    </div>
                  </div>
                </div>

                {/* Slide 2: Syarat Diet & Makanan Anjuran */}
                <div className="w-full flex-shrink-0 px-1">
                  <div className="space-y-4">
                    {/* Syarat Diet */}
                    <div className="bg-gradient-to-b from-[#c5e8b7] to-[#e8f5e9] rounded-3xl p-5">
                      <h3 className="text-lg font-bold text-[#5a7a52] text-center mb-4">Syarat Diet</h3>
                      <ul className="space-y-2">
                        {slides[1].sections?.[0].items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-[#4a6a42]">
                            <span className="text-[#8ab583] mt-1">•</span>
                            <span>{item as string}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Makanan Anjuran */}
                    <div className="bg-white rounded-3xl p-5 border border-[#c5e8b7]">
                      <h3 className="text-lg font-bold text-[#5a7a52] text-center mb-4">Makanan Anjuran</h3>
                      <ol className="space-y-4">
                        {(slides[1].sections?.[1].items as { name: string; desc: string }[])?.map((item, index) => (
                          <li key={index} className="text-sm">
                            <div className="flex items-start gap-2">
                              <span className="font-bold text-[#4a6a42]">{index + 1}.</span>
                              <div>
                                <span className="font-bold text-[#4a6a42]">{item.name}</span>
                                <p className="text-[#6a8a62] mt-1">{item.desc}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Slide 3: Tidak Dianjurkan */}
                <div className="w-full flex-shrink-0 px-1">
                  <div className="bg-gradient-to-b from-[#e8f5e9] to-[#c5e8b7] rounded-3xl p-5 min-h-[500px]">
                    <h3 className="text-lg font-bold text-[#5a7a52] text-center mb-4">Tidak Dianjurkan</h3>
                    <ul className="space-y-3 mb-6">
                      {slides[2].items?.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-[#4a6a42]">
                          <span className="text-[#8ab583] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-center">
                      <Image
                        src="/images/woman-unhealthy-food.jpg"
                        alt="Tidak Dianjurkan"
                        width={200}
                        height={180}
                        className="w-full max-w-[200px] h-auto object-contain opacity-80"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentSlide === index ? "bg-[#5a7a52] w-6" : "bg-[#c5e8b7]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Layout - Video Edukasi on top, then grid for other sections */}
            <div className="hidden lg:block space-y-8">
              {/* Video Edukasi - Full width at the top */}
              <div className="bg-gradient-to-r from-[#e8f5e9] to-[#c5e8b7] rounded-3xl p-8">
                <div className="flex items-center gap-8">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/woman-cooking-salad.jpg"
                      alt="Nutrition"
                      width={180}
                      height={140}
                      className="w-[180px] h-auto object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#2d5a45] mb-2">Video Edukasi</h3>
                    <p className="text-[#4a6a42] text-sm mb-4">
                      Pelajari lebih lanjut tentang nutrisi yang tepat untuk pasien TB melalui video edukasi berikut.
                    </p>
                    <a
                      href="https://youtu.be/XQlwcqf4lgQ?si=h89CUilH70n8h2hD"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-white rounded-xl px-5 py-2.5 hover:bg-gray-50 transition-colors group shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#2d5a45]">Tonton Video</p>
                        <p className="text-xs text-[#5a7a52]">YouTube</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#2d5a45] ml-2" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Three column grid with equal proportions */}
              <div className="grid grid-cols-3 gap-6 items-start">
                {/* Syarat Diet */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-[#5a7a52] text-center mb-4">Syarat Diet</h3>
                  <div className="space-y-3">
                    {slides[1].sections?.[0].items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#5a7a52] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-sm text-[#4a6a42] leading-snug">{item as string}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Makanan Anjuran */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#c5e8b7]">
                  <h3 className="text-lg font-bold text-[#5a7a52] text-center mb-4">Makanan Anjuran</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(slides[1].sections?.[1].items as { name: string; desc: string }[])?.map((item, index) => (
                      <div
                        key={index}
                        className="p-2.5 rounded-xl bg-[#f8faf8] border border-[#e8f5e9] hover:bg-[#e8f5e9] transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#8ab583] text-white text-xs flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-[#4a6a42]">{item.name}</p>
                            <p className="text-xs text-[#6a8a62] mt-0.5 line-clamp-2">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tidak Dianjurkan */}
                <div className="bg-gradient-to-b from-[#fff5f5] to-white rounded-2xl p-5 shadow-sm border border-red-100">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-500 text-xs font-bold">!</span>
                    </div>
                    <h3 className="text-lg font-bold text-red-600">Tidak Dianjurkan</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    {slides[2].items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <span className="text-red-400 font-bold flex-shrink-0">✕</span>
                        <span className="text-red-700 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center pt-2">
                    <Image
                      src="/images/woman-unhealthy-food.jpg"
                      alt="Tidak Dianjurkan"
                      width={120}
                      height={100}
                      className="w-[120px] h-auto object-contain opacity-80"
                    />
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
            <span>Jadwal</span>
          </button>
        </div>
      </div>
    </div>
  )
}
