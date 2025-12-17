"use client"

import type React from "react"
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useState } from "react"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface LoginPageProps {
  onRegister: () => void
  onLogin: () => void
}

export default function LoginPage({ onRegister, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [showChangePassword, setShowChangePassword] = useState(false)
  const [changePasswordEmail, setChangePasswordEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [changePasswordError, setChangePasswordError] = useState("")
  const [changePasswordSuccess, setChangePasswordSuccess] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const users = JSON.parse(localStorage.getItem("tbcare_users") || "[]")
    const user = users.find((u: { email: string; kataSandi: string }) => u.email === email && u.kataSandi === password)

    if (user) {
      localStorage.setItem("tbcare_current_user", JSON.stringify(user))
      onLogin()
    } else {
      setError("Email atau kata sandi salah!")
    }

    setIsLoading(false)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setChangePasswordError("")
    setChangePasswordSuccess("")
    setIsChangingPassword(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    if (!changePasswordEmail || !newPassword) {
      setChangePasswordError("Semua field harus diisi!")
      setIsChangingPassword(false)
      return
    }

    if (newPassword.length < 6) {
      setChangePasswordError("Kata sandi baru minimal 6 karakter!")
      setIsChangingPassword(false)
      return
    }

    const users = JSON.parse(localStorage.getItem("tbcare_users") || "[]")
    const userIndex = users.findIndex((u: { email: string }) => u.email === changePasswordEmail)

    if (userIndex === -1) {
      setChangePasswordError("Email tidak ditemukan!")
      setIsChangingPassword(false)
      return
    }

    // Update password
    users[userIndex].kataSandi = newPassword
    localStorage.setItem("tbcare_users", JSON.stringify(users))

    setChangePasswordSuccess("Kata sandi berhasil diubah!")
    setIsChangingPassword(false)

    // Close modal after success
    setTimeout(() => {
      setShowChangePassword(false)
      resetChangePasswordForm()
    }, 1500)
  }

  const resetChangePasswordForm = () => {
    setChangePasswordEmail("")
    setNewPassword("")
    setChangePasswordError("")
    setChangePasswordSuccess("")
  }

  const openChangePasswordModal = () => {
    resetChangePasswordForm()
    setShowChangePassword(true)
  }
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)

      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      const userRef = doc(db, "users", user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          provider: "google",
          createdAt: serverTimestamp(),
        })
      }

      onLogin()
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        console.log("Popup ditutup oleh user")
      } else {
        console.error("Google login gagal:", error)
        setError("Login dengan Google gagal")
      }
    } finally {
      setIsLoading(false)
    }
  }





  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f7fa] p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">We Say Hello!!</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Selamat Datang kembali. Gunakan email Anda dan kata sandi untuk masuk
          </p>
        </div>

        {/* Form Label */}
        <p className="text-center text-sm font-medium text-foreground mb-4">Masukkan E-Mail / Nama Pengguna Anda</p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              placeholder="Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Forgot Password - Added onClick handler */}
          <div className="text-right">
            <button
              type="button"
              onClick={openChangePasswordModal}
              className="text-sm font-medium text-foreground hover:text-[#f5a623] transition-colors"
            >
              Lupa Kata Sandi?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#f5a623] hover:bg-[#e09000] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#f5a623]/30"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Memproses...
              </span>
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-foreground">
          Tidak punya akun?{" "}
          <button onClick={onRegister} className="font-semibold underline hover:text-[#f5a623] transition-colors">
            Daftar
          </button>
        </p>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-4 bg-white border border-gray-200 rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm disabled:opacity-70"
          >
            <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} />
            <span className="font-medium text-foreground">Continue with Google</span>
          </button>

      </div>

      {showChangePassword && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setShowChangePassword(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#e8a4a4]/90 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowChangePassword(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <h2 className="text-xl font-bold text-center text-foreground mb-6">Change Password</h2>

            {/* Error Message */}
            {changePasswordError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm text-center animate-in shake duration-300">
                {changePasswordError}
              </div>
            )}

            {/* Success Message */}
            {changePasswordSuccess && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-xl text-sm text-center animate-in fade-in duration-300">
                {changePasswordSuccess}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="Email Anda"
                  value={changePasswordEmail}
                  onChange={(e) => setChangePasswordEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground text-sm"
                  required
                />
              </div>

              {/* New Password */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground text-sm"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full py-3.5 bg-[#f5a623] hover:bg-[#e09000] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#f5a623]/30 mt-2"
              >
                {isChangingPassword ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  "Simpan"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
