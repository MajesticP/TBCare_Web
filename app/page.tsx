"use client"

import { useState, useEffect, useCallback } from "react"
import LoadingScreen from "@/components/loading-screen"
import LoginPage from "@/components/login-page"
import RegisterPage from "@/components/register-page"
import HomePage from "@/components/home-page"
import EdukasiPage from "@/components/edukasi-page"
import UntukDiriSendiriPage from "@/components/untuk-diri-sendiri-page"
import UntukKeluargaPage from "@/components/untuk-keluarga-page"
import PembuanganDahakPage from "@/components/pembuangan-dahak-page"
import EfekSampingObatPage from "@/components/efek-samping-obat-page"
import PemenuhanNutrisiPage from "@/components/pemenuhan-nutrisi-page"
import AktivitasHarianPage from "@/components/aktivitas-harian-page"
import PencegahanPenularanPage from "@/components/pencegahan-penularan-page"
import ApaItuTbcPage from "@/components/apa-itu-tbc-page"
import PencegahanPenularanKeluargaPage from "@/components/pencegahan-penularan-keluarga-page"
import TandaGejalaTbcPage from "@/components/tanda-gejala-tbc-page"
import PeranKeluargaPage from "@/components/peran-keluarga-page"
import VaksinBcgPage from "@/components/vaksin-bcg-page"
import BeritaTbcPage from "@/components/berita-tbc-page"
import JadwalPage from "@/components/jadwal-page"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<
    | "login"
    | "register"
    | "home"
    | "edukasi"
    | "jadwal"
    | "diri-sendiri"
    | "keluarga"
    | "pembuangan-dahak"
    | "efek-samping-obat"
    | "pemenuhan-nutrisi"
    | "aktivitas-harian"
    | "pencegahan-penularan"
    | "apa-itu-tbc"
    | "pencegahan-penularan-keluarga"
    | "tanda-gejala-tbc"
    | "peran-keluarga"
    | "vaksin-bcg"
    | "berita-tbc"
  >("login")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      const currentUser = localStorage.getItem("tbcare_current_user")
      if (currentUser) {
        setCurrentPage("home")
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = useCallback((page: "home" | "edukasi" | "jadwal") => {
    console.log("[v0] Navigating to:", page)
    setCurrentPage(page)
  }, [])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f0f7fa]">
        <LoadingScreen />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f0f7fa]">
      {currentPage === "login" && (
        <LoginPage onRegister={() => setCurrentPage("register")} onLogin={() => setCurrentPage("home")} />
      )}
      {currentPage === "register" && <RegisterPage onBackToLogin={() => setCurrentPage("login")} />}
      {currentPage === "home" && (
        <HomePage
          onLogout={() => setCurrentPage("login")}
          onNavigate={handleNavigate}
          onOpenBerita={() => setCurrentPage("berita-tbc")}
        />
      )}
      {currentPage === "edukasi" && (
        <EdukasiPage
          onBack={() => setCurrentPage("home")}
          onNavigate={handleNavigate}
          onOpenDiriSendiri={() => setCurrentPage("diri-sendiri")}
          onOpenKeluarga={() => setCurrentPage("keluarga")}
        />
      )}
      {currentPage === "jadwal" && <JadwalPage onBack={() => setCurrentPage("home")} onNavigate={handleNavigate} />}
      {currentPage === "diri-sendiri" && (
        <UntukDiriSendiriPage
          onBack={() => setCurrentPage("edukasi")}
          onNavigate={handleNavigate}
          onOpenPencegahanPenularan={() => setCurrentPage("pencegahan-penularan")}
          onOpenEfekSampingObat={() => setCurrentPage("efek-samping-obat")}
          onOpenPembuanganDahak={() => setCurrentPage("pembuangan-dahak")}
          onOpenPemenuhanNutrisi={() => setCurrentPage("pemenuhan-nutrisi")}
          onOpenAktivitasHarian={() => setCurrentPage("aktivitas-harian")}
        />
      )}
      {currentPage === "keluarga" && (
        <UntukKeluargaPage
          onBack={() => setCurrentPage("edukasi")}
          onNavigate={handleNavigate}
          onOpenApaItuTbc={() => setCurrentPage("apa-itu-tbc")}
          onOpenPencegahanPenularan={() => setCurrentPage("pencegahan-penularan-keluarga")}
          onOpenTandaGejala={() => setCurrentPage("tanda-gejala-tbc")}
          onOpenPeranKeluarga={() => setCurrentPage("peran-keluarga")}
          onOpenVaksinBcg={() => setCurrentPage("vaksin-bcg")}
        />
      )}
      {currentPage === "pembuangan-dahak" && (
        <PembuanganDahakPage onBack={() => setCurrentPage("diri-sendiri")} onNavigate={handleNavigate} />
      )}
      {currentPage === "efek-samping-obat" && (
        <EfekSampingObatPage onBack={() => setCurrentPage("diri-sendiri")} onNavigate={handleNavigate} />
      )}
      {currentPage === "pemenuhan-nutrisi" && (
        <PemenuhanNutrisiPage onBack={() => setCurrentPage("diri-sendiri")} onNavigate={handleNavigate} />
      )}
      {currentPage === "aktivitas-harian" && (
        <AktivitasHarianPage onBack={() => setCurrentPage("diri-sendiri")} onNavigate={handleNavigate} />
      )}
      {currentPage === "pencegahan-penularan" && (
        <PencegahanPenularanPage onBack={() => setCurrentPage("diri-sendiri")} onNavigate={handleNavigate} />
      )}
      {currentPage === "apa-itu-tbc" && (
        <ApaItuTbcPage onBack={() => setCurrentPage("keluarga")} onNavigate={handleNavigate} />
      )}
      {currentPage === "pencegahan-penularan-keluarga" && (
        <PencegahanPenularanKeluargaPage onBack={() => setCurrentPage("keluarga")} onNavigate={handleNavigate} />
      )}
      {currentPage === "tanda-gejala-tbc" && (
        <TandaGejalaTbcPage onBack={() => setCurrentPage("keluarga")} onNavigate={handleNavigate} />
      )}
      {currentPage === "peran-keluarga" && (
        <PeranKeluargaPage onBack={() => setCurrentPage("keluarga")} onNavigate={handleNavigate} />
      )}
      {currentPage === "vaksin-bcg" && (
        <VaksinBcgPage onBack={() => setCurrentPage("keluarga")} onNavigate={handleNavigate} />
      )}
      {currentPage === "berita-tbc" && (
        <BeritaTbcPage onBack={() => setCurrentPage("home")} onNavigate={handleNavigate} />
      )}
    </main>
  )
}
