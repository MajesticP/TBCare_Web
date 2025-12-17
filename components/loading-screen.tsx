"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [logoPopped, setLogoPopped] = useState(false)
  const [textVisible, setTextVisible] = useState(false)

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setLogoPopped(true)
    }, 200)

    const textTimer = setTimeout(() => {
      setTextVisible(true)
    }, 700)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(textTimer)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f7fa] overflow-hidden">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          {/* Hole shadow effect */}
          <div
            className={`absolute inset-0 rounded-full bg-[#1e5b7a]/20 transition-all duration-500 ease-out
              ${logoPopped ? "scale-110 opacity-0" : "scale-50 opacity-100"}`}
          />
          <div
            className={`absolute inset-0 rounded-full bg-[#1e5b7a]/10 transition-all duration-700 ease-out delay-100
              ${logoPopped ? "scale-125 opacity-0" : "scale-75 opacity-100"}`}
          />

          {/* Logo with pop out animation */}
          <div
            className={`relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${logoPopped ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-4"}`}
          >
            <Image
              src="/images/tbcare-logo.png"
              alt="TBCare Logo"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        <div className="overflow-hidden">
          <h1
            className={`text-3xl md:text-4xl font-bold text-[#1e5b7a] tracking-wide transition-all duration-700 ease-out
              ${textVisible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-8 opacity-0 scale-75"}`}
            style={{
              transitionDelay: textVisible ? "0ms" : "0ms",
            }}
          >
            TBCare
          </h1>
        </div>

        <div
          className={`flex gap-2 mt-4 transition-all duration-500 ease-out
            ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "300ms" }}
        >
          <span className="w-3 h-3 bg-[#1e5b7a] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 bg-[#c41e3a] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-3 h-3 bg-[#f5a623] rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  )
}
