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
import ProfileEditPage from "@/components/profile-edit-page"

type Page =
  | "login"
  | "register"
  | "home"
  | "edukasi"
  | "jadwal"
  | "profile"
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

const validPages: Page[] = [
  "login", "register", "home", "edukasi", "jadwal", "profile", "diri-sendiri",
  "keluarga", "pembuangan-dahak", "efek-samping-obat", "pemenuhan-nutrisi",
  "aktivitas-harian", "pencegahan-penularan", "apa-itu-tbc",
  "pencegahan-penularan-keluarga", "tanda-gejala-tbc", "peran-keluarga",
  "vaksin-bcg", "berita-tbc"
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>("login")
  const [isClient, setIsClient] = useState(false)

  // Mark when we're on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Universal navigation function
  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page)
    const url = page === "login" ? "/" : `/${page}`
    window.history.pushState(null, "", url)
  }, [])

  // Initial setup - only runs on client
  useEffect(() => {
    if (!isClient) return

    // Get the current path from URL
    const path = window.location.pathname.slice(1) || "login"
    const targetPage = validPages.includes(path as Page) ? (path as Page) : "login"

    // Check if user is logged in
    const savedUser = localStorage.getItem("tbcare_current_user")
    
    // If trying to access protected page without login, redirect to login
    if (!savedUser && targetPage !== "login" && targetPage !== "register") {
      setCurrentPage("login")
      window.history.replaceState(null, "", "/")
    } else {
      setCurrentPage(targetPage)
    }

    // Show loading screen for 3 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(loadingTimer)
  }, [isClient])

  // Handle back/forward buttons
  useEffect(() => {
    if (!isClient) return

    const handleUrlChange = () => {
      const path = window.location.pathname.slice(1) || "login"
      const targetPage = validPages.includes(path as Page) ? (path as Page) : "login"
      
      // Check if user is logged in
      const savedUser = localStorage.getItem("tbcare_current_user")
      
      // If trying to access protected page without login, redirect to login
      if (!savedUser && targetPage !== "login" && targetPage !== "register") {
        setCurrentPage("login")
        window.history.replaceState(null, "", "/")
      } else {
        setCurrentPage(targetPage)
      }
    }

    window.addEventListener("popstate", handleUrlChange)
    return () => window.removeEventListener("popstate", handleUrlChange)
  }, [isClient])

  // Show loading until client-side is ready
  if (!isClient || isLoading) {
    return (
      <main className="min-h-screen bg-[#f0f7fa]">
        <LoadingScreen />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f0f7fa]">
      {currentPage === "login" && (
        <LoginPage
          onRegister={() => navigateTo("register")}
          onLogin={() => navigateTo("home")}
        />
      )}

      {currentPage === "register" && (
        <RegisterPage onBackToLogin={() => navigateTo("login")} />
      )}

      {currentPage === "home" && (
        <HomePage
          onLogout={() => {
            localStorage.removeItem("tbcare_current_user")
            navigateTo("login")
          }}
          onNavigate={navigateTo}
          onNavigateToProfile={() => navigateTo("profile")}
          onOpenBerita={() => navigateTo("berita-tbc")}
        />
      )}

      {currentPage === "profile" && (
        <ProfileEditPage
          onBack={() => navigateTo("home")}
          onSave={() => navigateTo("home")}
        />
      )}

      {currentPage === "edukasi" && (
        <EdukasiPage
          onBack={() => navigateTo("home")}
          onNavigate={navigateTo}
          onOpenDiriSendiri={() => navigateTo("diri-sendiri")}
          onOpenKeluarga={() => navigateTo("keluarga")}
        />
      )}

      {currentPage === "jadwal" && (
        <JadwalPage 
          onLogout={() => {
            localStorage.removeItem("tbcare_current_user")
            navigateTo("login")
          }}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === "diri-sendiri" && (
        <UntukDiriSendiriPage
          onBack={() => navigateTo("edukasi")}
          onNavigate={navigateTo}
          onOpenPencegahanPenularan={() => navigateTo("pencegahan-penularan")}
          onOpenEfekSampingObat={() => navigateTo("efek-samping-obat")}
          onOpenPembuanganDahak={() => navigateTo("pembuangan-dahak")}
          onOpenPemenuhanNutrisi={() => navigateTo("pemenuhan-nutrisi")}
          onOpenAktivitasHarian={() => navigateTo("aktivitas-harian")}
        />
      )}

      {currentPage === "keluarga" && (
        <UntukKeluargaPage
          onBack={() => navigateTo("edukasi")}
          onNavigate={navigateTo}
          onOpenApaItuTbc={() => navigateTo("apa-itu-tbc")}
          onOpenPencegahanPenularan={() => navigateTo("pencegahan-penularan-keluarga")}
          onOpenTandaGejala={() => navigateTo("tanda-gejala-tbc")}
          onOpenPeranKeluarga={() => navigateTo("peran-keluarga")}
          onOpenVaksinBcg={() => navigateTo("vaksin-bcg")}
        />
      )}

      {currentPage === "pembuangan-dahak" && (
        <PembuanganDahakPage onBack={() => navigateTo("diri-sendiri")} onNavigate={navigateTo} />
      )}
      {currentPage === "efek-samping-obat" && (
        <EfekSampingObatPage onBack={() => navigateTo("diri-sendiri")} onNavigate={navigateTo} />
      )}
      {currentPage === "pemenuhan-nutrisi" && (
        <PemenuhanNutrisiPage onBack={() => navigateTo("diri-sendiri")} onNavigate={navigateTo} />
      )}
      {currentPage === "aktivitas-harian" && (
        <AktivitasHarianPage onBack={() => navigateTo("diri-sendiri")} onNavigate={navigateTo} />
      )}
      {currentPage === "pencegahan-penularan" && (
        <PencegahanPenularanPage onBack={() => navigateTo("diri-sendiri")} onNavigate={navigateTo} />
      )}
      {currentPage === "apa-itu-tbc" && (
        <ApaItuTbcPage onBack={() => navigateTo("keluarga")} onNavigate={navigateTo} />
      )}
      {currentPage === "pencegahan-penularan-keluarga" && (
        <PencegahanPenularanKeluargaPage onBack={() => navigateTo("keluarga")} onNavigate={navigateTo} />
      )}
      {currentPage === "tanda-gejala-tbc" && (
        <TandaGejalaTbcPage onBack={() => navigateTo("keluarga")} onNavigate={navigateTo} />
      )}
      {currentPage === "peran-keluarga" && (
        <PeranKeluargaPage onBack={() => navigateTo("keluarga")} onNavigate={navigateTo} />
      )}
      {currentPage === "vaksin-bcg" && (
        <VaksinBcgPage onBack={() => navigateTo("keluarga")} onNavigate={navigateTo} />
      )}
      {currentPage === "berita-tbc" && (
        <BeritaTbcPage onBack={() => navigateTo("home")} onNavigate={navigateTo} />
      )}
    </main>
  )
}