"use client"

import { useState, useEffect } from "react"
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
  ChevronLeft,
  Save,
} from "lucide-react"

interface ProfileEditPageProps {
  onBack: () => void
  onSave: () => void
}

interface ProfileData {
  nama: string
  tanggalPertama: string
  waktuMinum: string
  jenisKelamin: string
  phoneNumber: string
  beratBadan: string
  tinggiBadan: string
  alamat: string
  email: string
}

export default function ProfileEditPage({ onBack, onSave }: ProfileEditPageProps) {
  const [formData, setFormData] = useState<ProfileData>({
    nama: "",
    tanggalPertama: "",
    waktuMinum: "",
    jenisKelamin: "",
    phoneNumber: "",
    beratBadan: "",
    tinggiBadan: "",
    alamat: "",
    email: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = () => {
    try {
      const localUser = localStorage.getItem("tbcare_current_user")
      if (localUser) {
        const userData = JSON.parse(localUser)
        setFormData({
          nama: userData.nama || "",
          tanggalPertama: userData.tanggalPertamaMinum || "",
          waktuMinum: userData.waktuMinum || "",
          jenisKelamin: userData.jenisKelamin || "",
          phoneNumber: userData.phoneNumber || "",
          beratBadan: userData.beratBadan || "",
          tinggiBadan: userData.tinggiBadan || "",
          alamat: userData.alamat || "",
          email: userData.email || "",
        })
      }
    } catch (error) {
      console.error("Error loading user data:", error)
      setError("Gagal memuat data profil")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
    setSuccess("")
  }

  const handleSubmit = () => {
    setError("")
    setSuccess("")
    setIsSaving(true)

    try {
      const localStorageData = {
        nama: formData.nama,
        email: formData.email,
        tanggalPertamaMinum: formData.tanggalPertama,
        waktuMinum: formData.waktuMinum,
        jenisKelamin: formData.jenisKelamin,
        phoneNumber: formData.phoneNumber,
        beratBadan: formData.beratBadan,
        tinggiBadan: formData.tinggiBadan,
        alamat: formData.alamat,
      }
      localStorage.setItem("tbcare_current_user", JSON.stringify(localStorageData))

      setSuccess("Profil berhasil diperbarui!")
      setTimeout(() => {
        onSave()
      }, 1500)
    } catch (error) {
      console.error("Error saving profile:", error)
      setError("Gagal menyimpan profil. Silakan coba lagi.")
    } finally {
      setIsSaving(false)
    }
  }

  const inputClass =
    "w-full pl-11 pr-4 py-3 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4a90d9] focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground text-sm"

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f7fa]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a90d9] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat data profil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f7fa] py-6 px-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="w-full max-w-sm mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Kembali</span>
        </button>

        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold text-foreground">Edit Profil</h1>
          <p className="text-sm text-muted-foreground mt-1">Perbarui informasi profil Anda</p>
        </div>

        {success && (
          <div className="mb-3 p-3 bg-green-100 border border-green-300 text-green-700 rounded-xl text-sm text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-3 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-2.5">
          {/* Nama */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <User className="w-4 h-4" />
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

          {/* Email (Read-only) */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              className={`${inputClass} bg-gray-50 cursor-not-allowed`}
              disabled
            />
            <p className="text-xs text-muted-foreground mt-1 ml-4">Email tidak dapat diubah</p>
          </div>

          {/* Tanggal Pertama Minum Obat */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
              <Calendar className="w-4 h-4" />
            </div>
            {!formData.tanggalPertama && (
              <span className="absolute left-11 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none z-10 select-none">
                Tanggal Pertama Minum Obat
              </span>
            )}
            <input
              type="date"
              name="tanggalPertama"
              value={formData.tanggalPertama}
              onChange={handleChange}
              className={`${inputClass} ${!formData.tanggalPertama ? "text-transparent" : "text-foreground"} relative z-0`}
            />
          </div>

          {/* Waktu Saat Minum Obat */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
              <Clock className="w-4 h-4" />
            </div>
            {!formData.waktuMinum && (
              <span className="absolute left-11 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none z-10 select-none">
                Waktu Saat Minum Obat
              </span>
            )}
            <input
              type="time"
              name="waktuMinum"
              value={formData.waktuMinum}
              onChange={handleChange}
              className={`${inputClass} ${!formData.waktuMinum ? "text-transparent" : "text-foreground"} relative z-0`}
            />
          </div>

          {/* Jenis Kelamin */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Users className="w-4 h-4" />
            </div>
            <select
              name="jenisKelamin"
              value={formData.jenisKelamin}
              onChange={handleChange}
              className={`${inputClass} appearance-none cursor-pointer ${!formData.jenisKelamin ? "text-muted-foreground" : ""}`}
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
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Berat Badan */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Scale className="w-4 h-4" />
            </div>
            <input
              type="number"
              name="beratBadan"
              placeholder="Berat Badan (kg)"
              value={formData.beratBadan}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Tinggi Badan */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Ruler className="w-4 h-4" />
            </div>
            <input
              type="number"
              name="tinggiBadan"
              placeholder="Tinggi Badan (cm)"
              value={formData.tinggiBadan}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Alamat */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="alamat"
              placeholder="Alamat"
              value={formData.alamat}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Save Button */}
          <div className="pt-3">
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="w-full py-3.5 bg-[#4a90d9] hover:bg-[#3a7dbf] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#4a90d9]/30 flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
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
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}