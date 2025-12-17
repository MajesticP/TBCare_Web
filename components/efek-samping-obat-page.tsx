"use client"

import { useState } from "react"
import Image from "next/image"
import { Home, BookOpen, Calendar, ChevronLeft, AlertTriangle, AlertCircle } from "lucide-react"

interface EfekSampingObatPageProps {
  onBack: () => void
  onNavigate: (page: "home" | "edukasi" | "jadwal") => void
}

const ringanEffects = [
  "Air kencing bewarna merah atau kemerahan",
  "Mual, Muntah, Diare",
  "Nafsu makan berkurang",
  "Nyeri otot, sendi, pegal linu",
  "Kesemutan, baal",
  "Lidah tidak berasa, baal",
]

const beratEffects = [
  "Gatal dan kemerahan pada kulit",
  "Gangguan Pendengaran",
  "Gangguan Penglihatan",
  "Warna Kuning pada kulit, kuku, dan mata",
  "Gangguan keseimbangan, pusing, sempoyongan",
  "Halusinasi",
]

export default function EfekSampingObatPage({ onBack, onNavigate }: EfekSampingObatPageProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

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
          <h1 className="text-xl font-bold text-[#2d5a45]">Efek Samping Obat</h1>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Edukasi</span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span>Untuk Diri Sendiri</span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span className="text-foreground font-medium">Efek Samping Obat</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Efek Samping Obat TBC</h1>
            <p className="text-muted-foreground">Kenali efek samping dan cara penanganannya</p>
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
            <div className="flex justify-center mb-6 lg:hidden">
              <div className="w-48 h-32 rounded-2xl overflow-hidden bg-[#e8f5e9]">
                <Image
                  src="/images/medical-checklist.jpg"
                  alt="Medical Checklist"
                  width={200}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              {/* Left Column - Hero & Info */}
              <div className="hidden lg:block">
                <div className="bg-gradient-to-br from-[#e8f5e9] to-[#d4edda] rounded-3xl p-8 mb-6">
                  <div className="w-full h-48 rounded-2xl overflow-hidden bg-white/50 mb-6">
                    <Image
                      src="/images/medical-checklist.jpg"
                      alt="Medical Checklist"
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-[#2d5a45] mb-3">Tentang Efek Samping</h2>
                  <p className="text-[#3d6a55] leading-relaxed">
                    Obat TBC dapat menyebabkan efek samping ringan hingga berat. Penting untuk mengenali gejala-gejala
                    ini dan tahu kapan harus berkonsultasi dengan tenaga kesehatan.
                  </p>
                </div>

                {/* Quick Reference Card - Desktop */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-foreground mb-4">Referensi Cepat</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <span className="text-sm text-amber-700">
                        Efek ringan: Konsultasi, jangan berhenti minum obat
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-red-700">Efek berat: Segera ke rumah sakit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Effects List */}
              <div className="space-y-6">
                {/* Ringan Section */}
                <div
                  className="bg-white rounded-2xl p-5 border border-[#d4edda] shadow-sm cursor-pointer hover:shadow-md transition-shadow lg:p-6"
                  onClick={() => setExpandedSection(expandedSection === "ringan" ? null : "ringan")}
                >
                  <h2 className="text-xl font-bold text-[#2d5a45] text-center mb-4 lg:text-left lg:text-2xl">Ringan</h2>
                  <ul className="space-y-2 text-[#3d6a55]">
                    {ringanEffects.map((effect, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#4a9d6b] mt-1">•</span>
                        <span className="text-sm lg:text-base">{effect}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expanded Content */}
                  {expandedSection === "ringan" && (
                    <div className="mt-4 pt-4 border-t border-[#d4edda]">
                      <h4 className="font-semibold text-[#2d5a45] mb-2">Apa yang harus dilakukan:</h4>
                      <ul className="space-y-1 text-sm text-[#3d6a55]">
                        <li>• Minum obat setelah makan untuk mengurangi mual</li>
                        <li>• Istirahat cukup jika merasa lelah</li>
                        <li>• Minum air putih yang banyak</li>
                        <li>• Konsultasi dengan dokter saat kontrol berikutnya</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Warning Banner - Ringan */}
                <div className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-2xl p-5 shadow-md">
                  <p className="text-center text-white font-medium leading-relaxed">
                    Jika timbul gejala tersebut{" "}
                    <span className="font-bold underline">JANGAN BERHENTI MINUM OBAT!!</span>
                    <br />
                    konsultasikan ke pelayanan kesehatan terdekat
                  </p>
                </div>

                {/* Berat Section */}
                <div
                  className="bg-white rounded-2xl p-5 border border-[#d4edda] shadow-sm cursor-pointer hover:shadow-md transition-shadow lg:p-6"
                  onClick={() => setExpandedSection(expandedSection === "berat" ? null : "berat")}
                >
                  <h2 className="text-xl font-bold text-[#2d5a45] text-center mb-4 lg:text-left lg:text-2xl">Berat</h2>
                  <ul className="space-y-2 text-[#3d6a55]">
                    {beratEffects.map((effect, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#4a9d6b] mt-1">•</span>
                        <span className="text-sm lg:text-base">{effect}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expanded Content */}
                  {expandedSection === "berat" && (
                    <div className="mt-4 pt-4 border-t border-[#d4edda]">
                      <h4 className="font-semibold text-[#2d5a45] mb-2">Tindakan Segera:</h4>
                      <ul className="space-y-1 text-sm text-[#3d6a55]">
                        <li>• Hentikan obat sementara</li>
                        <li>• Segera pergi ke puskesmas atau rumah sakit</li>
                        <li>• Bawa catatan obat yang sedang diminum</li>
                        <li>• Jangan tunda, efek samping berat perlu penanganan cepat</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Warning Banner - Berat */}
                <div className="bg-gradient-to-r from-[#ef4444] to-[#dc2626] rounded-2xl p-5 shadow-md">
                  <p className="text-center text-white font-medium leading-relaxed">
                    Bila Pasien mengalami efek samping Berat{" "}
                    <span className="font-bold underline">SEGERA BAWA KE PUSKESMAS ATAU RUMAH SAKIT TERDEKAT!!</span>
                  </p>
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
