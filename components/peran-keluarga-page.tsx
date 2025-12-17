"use client"

import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft, Users, Pill, ShieldCheck, Heart } from "lucide-react"

interface PeranKeluargaPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

const familyRoles = [
  {
    id: 1,
    title: "Dukungan Tanpa Stigma",
    description:
      "TBC bisa disembuhkan. Jangan menjauh atau menyalahkan pasien — beri penerimaan dan semangat agar pasien tidak merasa dikucilkan.",
    image: "/family-support-hugging-caring-illustration.jpg",
    icon: Users,
  },
  {
    id: 2,
    title: "Awasi Pengobatan",
    description: "Bantu pasien minum obat teratur. Gunakan pengingat di aplikasi dan hubungi petugas jika ada keluhan.",
    image: "/medicine-supervision-house-pills-illustration.jpg",
    icon: Pill,
  },
  {
    id: 3,
    title: "Cegah Penularan di Rumah",
    description: "Buka ventilasi, ajarkan etika batuk, jaga kebersihan, dan periksa anggota keluarga yang kontak erat.",
    image: "/home-ventilation-cleaning-prevention-virus-illustr.jpg",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Jadilah Sumber Kekuatan",
    description: "Keluarga yang penuh kasih dan dukungan mempercepat kesembuhan dan menghapus stigma.",
    image: "/family-strength-support-love-caring-illustration.jpg",
    icon: Heart,
  },
]

export default function PeranKeluargaPage({ onBack, onNavigate }: PeranKeluargaPageProps) {
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
        <header className="lg:hidden relative overflow-hidden">
          {/* Light blue gradient background with wave */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#e3f2fd] via-[#e8f4fc] to-[#d6ebf7]">
            {/* Decorative wave at bottom */}
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
              {/* Left: Back button + Title */}
              <div className="flex items-start gap-3">
                <button
                  onClick={onBack}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform mt-1"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-[#1a3a5c] leading-tight">Peran</h1>
                  <h1 className="text-2xl font-bold text-[#1a3a5c] leading-tight">Keluarga</h1>
                </div>
              </div>
              {/* Right: Family illustration */}
              <div className="w-40 h-36 relative -mt-2 -mr-3">
                <Image
                  src="/happy-family-parents-children-blue-illustration.jpg"
                  alt="Family illustration"
                  width={160}
                  height={144}
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
                <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">Peran Keluarga</h1>
                <p className="text-gray-600 max-w-lg">
                  Dukungan keluarga sangat penting dalam proses penyembuhan TBC. Pelajari cara mendampingi dengan penuh
                  kasih.
                </p>
              </div>
              <div className="w-48 h-36 relative">
                <Image
                  src="/happy-family-parents-children-blue-illustration.jpg"
                  alt="Family illustration"
                  width={192}
                  height={144}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-5 pt-4 pb-28 lg:p-8 lg:pb-8">
          <div className="lg:hidden space-y-4">
            {familyRoles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-2xl p-3.5 flex items-start gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                {/* Image container - rounded with light blue background */}
                <div className="w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#e8f4fc]">
                  <Image
                    src={role.image || "/placeholder.svg"}
                    alt={role.title}
                    width={96}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-[#1a3a5c] mb-1.5 leading-snug">{role.title}</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-3">{role.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Content - Clean grid layout */}
          <div className="hidden lg:block max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-6">
              {familyRoles.map((role) => {
                const IconComponent = role.icon
                return (
                  <div
                    key={role.id}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#e3f2fd] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4a90d9] transition-colors">
                        <IconComponent className="w-6 h-6 text-[#4a90d9] group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">{role.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{role.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Desktop CTA Section */}
            <div className="mt-8 bg-gradient-to-r from-[#4a90d9] to-[#2563eb] rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Bersama Kita Bisa</h3>
                  <p className="text-white/90 max-w-md">
                    Dengan dukungan keluarga yang tepat, proses penyembuhan TBC menjadi lebih mudah dan cepat.
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

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
