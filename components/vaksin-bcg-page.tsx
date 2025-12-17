"use client"

import { useState } from "react"
import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft, Syringe, Users, ClipboardList, Heart, X } from "lucide-react"

interface VaksinBcgPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

const bcgContent = [
  {
    id: 1,
    title: "Apa Itu Vaksin BCG?",
    description:
      "Vaksin BCG adalah suntikan untuk mencegah penyakit TBC pada anak, terutama yang bisa menyerang otak dan tulang.\nBiasanya diberikan sejak bayi baru lahir sampai usia 2 bulan, cukup sekali seumur hidup.",
    image: "/doctor-examining-child-checkup-illustration.jpg",
    icon: Syringe,
    type: "text",
  },
  {
    id: 2,
    title: "Apa yang Harus Dilakukan Keluarga?",
    description: "",
    bulletPoints: [
      "Pastikan anak mendapat vaksin sesuai jadwal di posyandu, puskesmas, atau rumah sakit.",
      "Simpan kartu imunisasi anak agar mudah dicek.",
      "Jika anak sedang demam tinggi, tunda dulu dan konsultasikan ke petugas kesehatan.",
      "Ajak anak dengan tenang dan beri semangat supaya tidak takut disuntik.",
    ],
    image: "/family-visiting-health-clinic-illustration.jpg",
    icon: Users,
    type: "bullets",
  },
  {
    id: 3,
    title: "Setelah Disuntik BCG",
    description: "",
    bulletPoints: [
      "Akan muncul benjolan kecil di bekas suntikan — itu normal.",
      "Jangan dioles obat atau ditutup plester, cukup jaga tetap bersih.",
      "Kalau lukanya besar atau keluar nanah banyak, segera datang ke petugas kesehatan.",
    ],
    image: "/after-vaccination-care-baby-illustration.jpg",
    icon: ClipboardList,
    type: "bullets",
  },
  {
    id: 4,
    title: "Dukung Tanpa Stigma",
    description:
      "Vaksin bukan tanda anak sakit, tapi perlindungan supaya tidak kena TBC.\nKeluarga yang paham dan peduli bisa bantu cegah TBC sejak dini, tanpa rasa takut atau malu.",
    image: "/happy-family-supporting-child-illustration.jpg",
    icon: Heart,
    type: "text",
  },
]

export default function VaksinBcgPage({ onBack, onNavigate }: VaksinBcgPageProps) {
  const [selectedContent, setSelectedContent] = useState<(typeof bcgContent)[0] | null>(null)

  return (
    <div className="min-h-screen bg-[#f5f9fc] flex">
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
        <header className="lg:hidden relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e3f2fd] via-[#e8f4fc] to-[#d6ebf7]">
            <svg
              className="absolute bottom-0 left-0 right-0 w-full"
              viewBox="0 0 400 40"
              preserveAspectRatio="none"
              style={{ height: "40px" }}
            >
              <path d="M0,40 L0,20 Q100,0 200,20 T400,20 L400,40 Z" fill="#f5f9fc" />
            </svg>
          </div>

          <div className="relative px-5 pt-10 pb-12">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <button
                  onClick={onBack}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform mt-1"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-[#1a3a5c] leading-tight">Vaksin</h1>
                  <h1 className="text-2xl font-bold text-[#1a3a5c] leading-tight">BCG</h1>
                  <h1 className="text-2xl font-bold text-[#1a3a5c] leading-tight">untuk</h1>
                  <h1 className="text-2xl font-bold text-[#1a3a5c] leading-tight">Anak</h1>
                </div>
              </div>
              <div className="w-44 h-40 relative -mt-2 -mr-3">
                <Image
                  src="/doctor-vaccinating-child-nurse-illustration.jpg"
                  alt="Doctor vaccinating child"
                  width={176}
                  height={160}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:block bg-white border-b border-gray-100">
          <div className="px-8 py-8">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">Vaksin BCG untuk Anak</h1>
                <p className="text-gray-600 max-w-lg">
                  Lindungi anak Anda dari TBC dengan vaksinasi BCG sejak dini. Pelajari informasi penting tentang vaksin
                  ini.
                </p>
              </div>
              <div className="w-48 h-36 relative">
                <Image
                  src="/doctor-vaccinating-child-nurse-illustration.jpg"
                  alt="Doctor vaccinating child"
                  width={192}
                  height={144}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Content */}
        <main className="px-5 pt-4 pb-28 lg:hidden">
          <div className="space-y-5">
            {bcgContent.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#e8f4fc]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={96}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-[15px] font-bold text-[#1a3a5c] leading-snug pt-1">{item.title}</h3>
                </div>

                {item.type === "text" ? (
                  <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">{item.description}</p>
                ) : (
                  <ul className="space-y-2">
                    {item.bulletPoints?.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[13px] text-gray-600 leading-relaxed">
                        <span className="text-[#4a90d9] mt-1.5 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </main>

        {/* Desktop Content */}
        <main className="hidden lg:block p-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-6">
              {bcgContent.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedContent(item)}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group text-left relative overflow-hidden"
                  >
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#e3f2fd] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[#4a90d9] text-lg font-medium leading-none">+</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#e3f2fd] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4a90d9] transition-colors">
                        <IconComponent className="w-7 h-7 text-[#4a90d9] group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 group-hover:text-[#4a90d9] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {item.type === "text" ? item.description?.split("\n")[0] : item.bulletPoints?.[0]}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Desktop Info Banner */}
            <div className="mt-8 bg-gradient-to-r from-[#4a90d9] to-[#2563eb] rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Lindungi Anak Sejak Dini</h3>
                  <p className="text-white/90 max-w-md">
                    Vaksin BCG adalah langkah pertama melindungi anak dari TBC. Pastikan anak Anda mendapat vaksinasi
                    tepat waktu.
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Syringe className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Desktop Modal */}
      {selectedContent && (
        <div
          className="hidden lg:flex fixed inset-0 bg-black/50 items-center justify-center z-50 p-8"
          onClick={() => setSelectedContent(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-[#e3f2fd] to-[#d6ebf7]">
                <Image
                  src={selectedContent.image || "/placeholder.svg"}
                  alt={selectedContent.title}
                  width={640}
                  height={192}
                  className="w-full h-full object-contain"
                />
              </div>
              <button
                onClick={() => setSelectedContent(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">{selectedContent.title}</h2>

              {selectedContent.type === "text" ? (
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{selectedContent.description}</p>
              ) : (
                <ul className="space-y-3">
                  {selectedContent.bulletPoints?.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                      <span className="w-6 h-6 rounded-full bg-[#e3f2fd] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#4a90d9] text-sm font-medium">{idx + 1}</span>
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 lg:hidden">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button onClick={() => onNavigate("home")} className="flex flex-col items-center gap-1 p-2">
            <Home className="w-6 h-6 text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4a90d9] rounded-full">
            <BookOpen className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">Education</span>
          </button>
          <button onClick={() => onNavigate("jadwal")} className="flex flex-col items-center gap-1 p-2">
            <Calendar className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
