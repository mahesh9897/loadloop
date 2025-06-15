"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface GlowEffectProps {
  children: React.ReactNode
  isActive: boolean
  color?: string
}

export function GlowEffect({ children, isActive, color = "blue" }: GlowEffectProps) {
  const [isGlowing, setIsGlowing] = useState(false)

  useEffect(() => {
    if (isActive) {
      // Create pulsing effect
      const interval = setInterval(() => {
        setIsGlowing((prev) => !prev)
      }, 1500)

      return () => clearInterval(interval)
    }
  }, [isActive])

  const colorClasses = {
    blue: "shadow-blue-300",
    green: "shadow-green-300",
    purple: "shadow-purple-300",
  }

  return (
    <div
      className={`relative transition-all duration-700 ${
        isActive ? `${isGlowing ? "shadow-lg" : "shadow-md"} ${colorClasses[color as keyof typeof colorClasses]}` : ""
      }`}
    >
      {children}

      {isActive && (
        <div
          className={`absolute inset-0 rounded-lg ${
            isGlowing ? "opacity-20" : "opacity-10"
          } transition-opacity duration-700 ${color === "blue" ? "bg-blue-300" : color === "green" ? "bg-green-300" : "bg-purple-300"}`}
        ></div>
      )}
    </div>
  )
}
