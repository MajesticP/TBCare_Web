"use client"

import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft } from "lucide-react"

interface ApaItuTbcPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

const riskGroups = [
  "Anggota keluarga yang sering kontak dekat dengan pasien",
  "Anak-anak dan orang lanjut usia",
  "Orang dengan daya tahan tubuh rendah (contoh: penderita HIV, diabetes, gizi buruk)",
  "Petugas kesehatan",
  "Orang yang Bekerja atau Tinggal di Tempat Padat dan Tertutup",
  "Perokok dan Pecandu Alkohol",
]

export default function ApaItuTbcPage({ onBack, onNavigate }: ApaItuTbcPageProps) {
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
        <header className="flex items-center justify-center p-4 lg:hidden relative">
          <button
            onClick={onBack}
            className="absolute left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-[#1e3a5f]">Apa itu TBC</h1>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Apa itu TBC</h1>
            <p className="text-muted-foreground">Pelajari tentang Tuberkulosis dan siapa saja yang beresiko tertular</p>
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
          {/* Mobile Layout */}
          <div className="lg:hidden max-w-md mx-auto space-y-6">
            {/* Bacteria Image */}
            <div className="flex justify-center">
              <div className="w-48 h-36 rounded-xl overflow-hidden border-4 border-[#4a90d9] shadow-lg">
                <Image
                  src="/tbc-bacteria-lung-illustration.jpg"
                  alt="TBC Bacteria"
                  width={200}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Main Description */}
            <p className="text-center text-[#1e3a5f] leading-relaxed px-2">
              Tuberkulosis (TBC) adalah penyakit infeksi menular yang disebabkan oleh bakteri Mycobacterium
              tuberculosis, yang paling sering menyerang paru-paru, tetapi juga bisa menyerang bagian tubuh lain seperti
              tulang, kelenjar getah bening, ginjal, otak, dan lainnya.
            </p>

            {/* Risk Section */}
            <div className="bg-[#e3f2fd] rounded-3xl p-5 relative overflow-hidden">
              {/* Doctor Illustration positioned to the right */}
              <div className="absolute right-0 top-0 w-28 h-full opacity-80">
                <Image
                  src="/doctor-with-magnifying-glass-blue-illustration.jpg"
                  alt="Doctor illustration"
                  width={120}
                  height={200}
                  className="w-full h-full object-contain object-right"
                />
              </div>

              <h2 className="text-xl font-bold text-[#1e3a5f] mb-2 pr-24">
                Siapa yang
                <br />
                Beresiko Tertular?
              </h2>
            </div>

            {/* Risk Groups List */}
            <ul className="space-y-3 px-2">
              {riskGroups.map((risk, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1e3a5f] mt-2 flex-shrink-0" />
                  <span className="text-[#1e3a5f] leading-relaxed">{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Layout - Clean and Minimalist */}
          <div className="hidden lg:block max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              {/* Hero Section */}
              <div className="grid grid-cols-2 gap-8 p-8">
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Tentang Tuberkulosis</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Tuberkulosis (TBC) adalah penyakit infeksi menular yang disebabkan oleh bakteri
                    <span className="font-semibold text-[#4a90d9]"> Mycobacterium tuberculosis</span>, yang paling
                    sering menyerang paru-paru, tetapi juga bisa menyerang bagian tubuh lain seperti tulang, kelenjar
                    getah bening, ginjal, otak, dan lainnya.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-72 h-56 rounded-2xl overflow-hidden border-4 border-[#4a90d9]/30 shadow-lg">
                    <Image
                      src="/tbc-bacteria-lung-illustration.jpg"
                      alt="TBC Bacteria"
                      width={300}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mx-8" />

              {/* Risk Groups Section */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#e3f2fd] flex items-center justify-center">
                    <Image
                      src="/doctor-with-magnifying-glass-blue-illustration.jpg"
                      alt="Doctor"
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1e3a5f]">Siapa yang Beresiko Tertular?</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {riskGroups.map((risk, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-[#f8fafc] rounded-xl hover:bg-[#e3f2fd]/50 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#4a90d9]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#4a90d9]" />
                      </div>
                      <span className="text-gray-700">{risk}</span>
                    </div>
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
