"use client"

import { useState, useEffect, useCallback } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authCheckComplete, setAuthCheckComplete] = useState(false)

  // Get page from URL query parameter
  const getPageFromUrl = useCallback((): Page => {
    if (typeof window === "undefined") return "login"
    
    const params = new URLSearchParams(window.location.search)
    const page = params.get("page") as Page
    
    if (page && validPages.includes(page)) {
      return page
    }
    return "login"
  }, [])

  // Universal navigation function
  const navigateTo = useCallback((page: Page) => {
    console.log("Navigating to:", page)
    setCurrentPage(page)
    const url = page === "login" ? "/" : `/?page=${page}`
    window.history.pushState(null, "", url)
  }, [])

  // Check authentication on mount - checks BOTH Firebase and localStorage
  useEffect(() => {
    let firebaseChecked = false
    
    // Set up Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Firebase auth state:", !!firebaseUser)
      firebaseChecked = true
      
      // Check localStorage for local account
      const localUser = localStorage.getItem("tbcare_current_user")
      console.log("Local user exists:", !!localUser)
      
      // User is authenticated if EITHER Firebase user exists OR local user exists
      const isAuth = !!firebaseUser || !!localUser
      console.log("Is authenticated:", isAuth)
      
      setIsAuthenticated(isAuth)
      
      if (isAuth) {
        // If Firebase user exists, save to localStorage
        if (firebaseUser) {
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
          }
          localStorage.setItem("tbcare_current_user", JSON.stringify(userData))
        }
        
        // Get the current page from URL
        const urlPage = getPageFromUrl()
        
        // If on login/register page, redirect to home
        if (urlPage === "login" || urlPage === "register") {
          setCurrentPage("home")
          window.history.replaceState(null, "", "/?page=home")
        } else {
          // Stay on current page
          setCurrentPage(urlPage)
        }
      } else {
        // User is logged out
        const urlPage = getPageFromUrl()
        
        // If trying to access protected pages, redirect to login
        if (urlPage !== "login" && urlPage !== "register") {
          setCurrentPage("login")
          window.history.replaceState(null, "", "/")
        } else {
          setCurrentPage(urlPage)
        }
      }
      
      setAuthCheckComplete(true)
      setIsLoading(false)
    })

    // Fallback: if Firebase takes too long, check localStorage only
    const fallbackTimer = setTimeout(() => {
      if (!firebaseChecked) {
        console.log("Firebase check timeout, using localStorage only")
        const localUser = localStorage.getItem("tbcare_current_user")
        const isAuth = !!localUser
        
        setIsAuthenticated(isAuth)
        
        if (isAuth) {
          const urlPage = getPageFromUrl()
          if (urlPage === "login" || urlPage === "register") {
            setCurrentPage("home")
            window.history.replaceState(null, "", "/?page=home")
          } else {
            setCurrentPage(urlPage)
          }
        } else {
          const urlPage = getPageFromUrl()
          if (urlPage !== "login" && urlPage !== "register") {
            setCurrentPage("login")
            window.history.replaceState(null, "", "/")
          } else {
            setCurrentPage(urlPage)
          }
        }
        
        setAuthCheckComplete(true)
        setIsLoading(false)
      }
    }, 1000) // 1 second fallback

    return () => {
      unsubscribe()
      clearTimeout(fallbackTimer)
    }
  }, [getPageFromUrl])

  // Handle browser back/forward buttons
  useEffect(() => {
    if (!authCheckComplete) return

    const handlePopState = () => {
      const page = getPageFromUrl()
      
      // Check authentication (both Firebase and localStorage)
      const localUser = localStorage.getItem("tbcare_current_user")
      const isAuth = !!auth.currentUser || !!localUser
      
      // Check if user is trying to access protected page without auth
      if (!isAuth && page !== "login" && page !== "register") {
        setCurrentPage("login")
        window.history.replaceState(null, "", "/")
      } else if (isAuth && (page === "login" || page === "register")) {
        setCurrentPage("home")
        window.history.replaceState(null, "", "/?page=home")
      } else {
        setCurrentPage(page)
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [getPageFromUrl, authCheckComplete])

  // Handle logout
  const handleLogout = useCallback(() => {
    console.log("Logging out...")
    // Clear localStorage
    localStorage.removeItem("tbcare_current_user")
    // Sign out from Firebase
    auth.signOut()
    // Update state
    setIsAuthenticated(false)
    // Navigate to login
    navigateTo("login")
  }, [navigateTo])

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
        <LoginPage
          onRegister={() => navigateTo("register")}
          onLogin={() => {
            console.log("Login callback triggered")
            // Update authentication state
            setIsAuthenticated(true)
            // Navigate to home
            navigateTo("home")
          }}
        />
      )}

      {currentPage === "register" && (
        <RegisterPage onBackToLogin={() => navigateTo("login")} />
      )}

      {currentPage === "home" && (
        <HomePage
          onLogout={handleLogout}
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
          onLogout={handleLogout}
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