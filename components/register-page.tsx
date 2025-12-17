"use client"

import type React from "react"
import { useState } from "react"
import {
  User,
  Calendar,
  Clock,
  Users,
  Phone,
  Scale,
  Ruler,
  MapPin,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
} from "lucide-react"

interface RegisterPageProps {
  onBackToLogin: () => void
}

interface FormData {
  nama: string
  tanggalPertama: string
  waktuMinum: string
  jenisKelamin: string
  phoneNumber: string
  beratBadan: string
  tinggiBadan: string
  alamat: string
  email: string
  kataSandi: string
  verifikasiSandi: string
}

export default function RegisterPage({ onBackToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    tanggalPertama: "",
    waktuMinum: "",
    jenisKelamin: "",
    phoneNumber: "",
    beratBadan: "",
    tinggiBadan: "",
    alamat: "",
    email: "",
    kataSandi: "",
    verifikasiSandi: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showVerifyPassword, setShowVerifyPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.kataSandi !== formData.verifikasiSandi) {
      setError("Kata sandi tidak cocok!")
      return
    }

    if (formData.kataSandi.length < 6) {
      setError("Kata sandi minimal 6 karakter!")
      return
    }

    setIsLoading(true)

    // Simulate registration delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("tbcare_users") || "[]")

    // Check if email already exists
    if (existingUsers.some((user: FormData) => user.email === formData.email)) {
      setError("Email sudah terdaftar!")
      setIsLoading(false)
      return
    }

    // Save new user
    const newUser = { ...formData, id: Date.now() }
    existingUsers.push(newUser)
    localStorage.setItem("tbcare_users", JSON.stringify(existingUsers))

    setIsLoading(false)
    alert("Akun berhasil dibuat! Silakan login.")
    onBackToLogin()
  }

  const inputClass =
    "w-full pl-12 pr-4 py-3.5 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground text-sm"

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f7fa] p-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="w-full max-w-sm">
        {/* Back Button */}
        <button
          onClick={onBackToLogin}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Kembali</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Buat Akun</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Nama */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              value={formData.nama}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Tanggal Pertama Minum Obat */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Calendar className="w-5 h-5" />
            </div>
            <input
              type="date"
              name="tanggalPertama"
              placeholder="Tanggal Pertama Minum Obat"
              value={formData.tanggalPertama}
              onChange={handleChange}
              className={`${inputClass} ${!formData.tanggalPertama ? "text-muted-foreground" : ""}`}
              required
            />
          </div>

          {/* Waktu Saat Minum Obat */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Clock className="w-5 h-5" />
            </div>
            <input
              type="time"
              name="waktuMinum"
              placeholder="Waktu Saat Minum Obat"
              value={formData.waktuMinum}
              onChange={handleChange}
              className={`${inputClass} ${!formData.waktuMinum ? "text-muted-foreground" : ""}`}
              required
            />
          </div>

          {/* Jenis Kelamin */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Users className="w-5 h-5" />
            </div>
            <select
              name="jenisKelamin"
              value={formData.jenisKelamin}
              onChange={handleChange}
              className={`${inputClass} appearance-none cursor-pointer ${!formData.jenisKelamin ? "text-muted-foreground" : ""}`}
              required
            >
              <option value="" disabled>
                Jenis Kelamin
              </option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Phone className="w-5 h-5" />
            </div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Berat Badan */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Scale className="w-5 h-5" />
            </div>
            <input
              type="number"
              name="beratBadan"
              placeholder="Berat Badan (kg)"
              value={formData.beratBadan}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Tinggi Badan */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Ruler className="w-5 h-5" />
            </div>
            <input
              type="number"
              name="tinggiBadan"
              placeholder="Tinggi Badan (cm)"
              value={formData.tinggiBadan}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Alamat */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="alamat"
              placeholder="Alamat"
              value={formData.alamat}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* E-mail */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Kata Sandi */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="kataSandi"
              placeholder="Kata Sandi"
              value={formData.kataSandi}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-3.5 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground text-sm"
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

          {/* Verifikasi Kata Sandi */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type={showVerifyPassword ? "text" : "password"}
              name="verifikasiSandi"
              placeholder="Verifikasi Kata Sandi"
              value={formData.verifikasiSandi}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-3.5 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowVerifyPassword(!showVerifyPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showVerifyPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Register Button */}
          <div className="pt-2">
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
                "Daftar"
              )}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4 text-sm text-foreground">
          Sudah punya akun?{" "}
          <button onClick={onBackToLogin} className="font-semibold underline hover:text-[#f5a623] transition-colors">
            Masuk
          </button>
        </p>
      </div>
    </div>
  )
}
