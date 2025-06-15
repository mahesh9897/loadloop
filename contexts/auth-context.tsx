"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  email: string
  name: string
  hasPassword: boolean
  isFirstTime: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  loginWithGmail: (email: string, name: string) => Promise<{ success: boolean; isFirstTime: boolean }>
  createPassword: (password: string) => Promise<{ success: boolean; message: string }>
  loginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  sendPasswordResetOTP: (email: string) => Promise<{ success: boolean; message: string }>
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; message: string }>
  resetPassword: (email: string, newPassword: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate checking for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem("loadloop_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const loginWithGmail = async (email: string, name: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user exists in localStorage (simulating database)
    const existingUsers = JSON.parse(localStorage.getItem("loadloop_users") || "{}")
    const isFirstTime = !existingUsers[email]

    if (isFirstTime) {
      // First time user - register with Gmail
      existingUsers[email] = {
        email,
        name,
        hasPassword: false,
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem("loadloop_users", JSON.stringify(existingUsers))
    }

    const userData = {
      email,
      name,
      hasPassword: existingUsers[email].hasPassword || false,
      isFirstTime,
    }

    setUser(userData)
    localStorage.setItem("loadloop_user", JSON.stringify(userData))
    setIsLoading(false)

    return { success: true, isFirstTime }
  }

  const createPassword = async (password: string) => {
    if (!user) return { success: false, message: "No user found" }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update user in storage
    const existingUsers = JSON.parse(localStorage.getItem("loadloop_users") || "{}")
    existingUsers[user.email].hasPassword = true
    existingUsers[user.email].password = password // In real app, this would be hashed
    localStorage.setItem("loadloop_users", JSON.stringify(existingUsers))

    const updatedUser = { ...user, hasPassword: true, isFirstTime: false }
    setUser(updatedUser)
    localStorage.setItem("loadloop_user", JSON.stringify(updatedUser))
    setIsLoading(false)

    return { success: true, message: "Password created successfully!" }
  }

  const loginWithCredentials = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const existingUsers = JSON.parse(localStorage.getItem("loadloop_users") || "{}")
    const userData = existingUsers[email]

    if (!userData) {
      setIsLoading(false)
      return { success: false, message: "Account not found. Please register with Gmail first." }
    }

    if (!userData.hasPassword) {
      setIsLoading(false)
      return { success: false, message: "Please complete your registration by creating a password." }
    }

    if (userData.password !== password) {
      setIsLoading(false)
      return { success: false, message: "Incorrect password. Please try again." }
    }

    const user = {
      email: userData.email,
      name: userData.name,
      hasPassword: true,
      isFirstTime: false,
    }

    setUser(user)
    localStorage.setItem("loadloop_user", JSON.stringify(user))
    setIsLoading(false)

    return { success: true, message: "Login successful!" }
  }

  const sendPasswordResetOTP = async (email: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const existingUsers = JSON.parse(localStorage.getItem("loadloop_users") || "{}")
    if (!existingUsers[email]) {
      setIsLoading(false)
      return { success: false, message: "Email not found. Please check your email address." }
    }

    // Generate and store OTP (in real app, send via email service)
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    localStorage.setItem(`otp_${email}`, otp)
    localStorage.setItem(`otp_${email}_expires`, (Date.now() + 10 * 60 * 1000).toString()) // 10 minutes

    setIsLoading(false)
    console.log(`OTP for ${email}: ${otp}`) // In real app, this would be sent via email

    return { success: true, message: `OTP sent to ${email}. Please check your inbox.` }
  }

  const verifyOTP = async (email: string, otp: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const storedOTP = localStorage.getItem(`otp_${email}`)
    const otpExpires = localStorage.getItem(`otp_${email}_expires`)

    if (!storedOTP || !otpExpires) {
      setIsLoading(false)
      return { success: false, message: "No OTP found. Please request a new one." }
    }

    if (Date.now() > Number.parseInt(otpExpires)) {
      setIsLoading(false)
      return { success: false, message: "OTP has expired. Please request a new one." }
    }

    if (storedOTP !== otp) {
      setIsLoading(false)
      return { success: false, message: "Incorrect OTP. Please try again." }
    }

    setIsLoading(false)
    return { success: true, message: "OTP verified successfully!" }
  }

  const resetPassword = async (email: string, newPassword: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const existingUsers = JSON.parse(localStorage.getItem("loadloop_users") || "{}")
    existingUsers[email].password = newPassword
    localStorage.setItem("loadloop_users", JSON.stringify(existingUsers))

    // Clean up OTP
    localStorage.removeItem(`otp_${email}`)
    localStorage.removeItem(`otp_${email}_expires`)

    setIsLoading(false)
    return { success: true, message: "Password reset successfully! You can now log in with your new password." }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("loadloop_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithGmail,
        createPassword,
        loginWithCredentials,
        sendPasswordResetOTP,
        verifyOTP,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
