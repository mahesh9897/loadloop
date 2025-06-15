"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Truck, Mail, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { PasswordStrengthMeter } from "@/components/password-strength-meter"
import { calculatePasswordStrength } from "@/lib/password-strength"
import Link from "next/link"

type AuthStep = "login" | "gmail-auth" | "create-password" | "forgot-password" | "verify-otp" | "reset-password"

export default function AuthPage() {
  const router = useRouter()
  const {
    loginWithGmail,
    createPassword,
    loginWithCredentials,
    sendPasswordResetOTP,
    verifyOTP,
    resetPassword,
    isLoading,
  } = useAuth()

  const [step, setStep] = useState<AuthStep>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  })

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  // Simulate Gmail authentication
  const handleGmailAuth = async () => {
    // In real app, this would open Gmail OAuth popup
    const mockGmailData = {
      email: "user@gmail.com",
      name: "John Doe",
    }

    const result = await loginWithGmail(mockGmailData.email, mockGmailData.name)

    if (result.success) {
      if (result.isFirstTime) {
        setFormData({ ...formData, email: mockGmailData.email })
        setStep("create-password")
        setMessage({
          type: "success",
          text: "Gmail authentication successful! Please create a password to complete your registration.",
        })
      } else {
        router.push("/sender/dashboard")
      }
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const result = await loginWithCredentials(formData.email, formData.password)

    if (result.success) {
      setMessage({ type: "success", text: result.message })
      setTimeout(() => router.push("/sender/dashboard"), 1500)
    } else {
      setMessage({ type: "error", text: result.message })
    }
  }

  const handleCreatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false)
      setMessage({ type: "error", text: "Passwords do not match! Please retype." })
      return
    }

    // Check password strength
    const strength = calculatePasswordStrength(formData.password)
    if (strength.score < 2) {
      setMessage({ type: "error", text: "Password is too weak. Please create a stronger password." })
      return
    }

    const result = await createPassword(formData.password)

    if (result.success) {
      setMessage({ type: "success", text: result.message })
      setTimeout(() => router.push("/sender/dashboard"), 1500)
    } else {
      setMessage({ type: "error", text: result.message })
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const result = await sendPasswordResetOTP(formData.email)

    if (result.success) {
      setMessage({ type: "success", text: result.message })
      setStep("verify-otp")
    } else {
      setMessage({ type: "error", text: result.message })
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const result = await verifyOTP(formData.email, formData.otp)

    if (result.success) {
      setMessage({ type: "success", text: result.message })
      setStep("reset-password")
    } else {
      setMessage({ type: "error", text: result.message })
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false)
      setMessage({ type: "error", text: "Passwords do not match! Please retype." })
      return
    }

    // Check password strength
    const strength = calculatePasswordStrength(formData.password)
    if (strength.score < 2) {
      setMessage({ type: "error", text: "Password is too weak. Please create a stronger password." })
      return
    }

    const result = await resetPassword(formData.email, formData.password)

    if (result.success) {
      setMessage({ type: "success", text: result.message })
      setTimeout(() => setStep("login"), 2000)
    } else {
      setMessage({ type: "error", text: result.message })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Real-time password matching validation
    if (name === "password" || name === "confirmPassword") {
      const newFormData = { ...formData, [name]: value }
      setPasswordsMatch(newFormData.password === newFormData.confirmPassword || newFormData.confirmPassword === "")
    }
  }

  const renderStep = () => {
    switch (step) {
      case "login":
        return (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">LoadLoop</h1>
              </div>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Sign in to your account or register with Gmail</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleGmailAuth} variant="outline" className="w-full" disabled={isLoading}>
                <Mail className="w-4 h-4 mr-2" />
                {isLoading ? "Authenticating..." : "Continue with Gmail"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      onClick={() => setStep("forgot-password")}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )

      case "create-password":
        return (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Create Your Password</CardTitle>
              <CardDescription>Complete your registration by creating a secure password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  <PasswordStrengthMeter password={formData.password} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className={!passwordsMatch && formData.confirmPassword ? "border-red-500" : ""}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {!passwordsMatch && formData.confirmPassword && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span>Passwords do not match! Please retype.</span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !passwordsMatch || calculatePasswordStrength(formData.password).score < 2}
                >
                  {isLoading ? "Creating Password..." : "Create Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )

      case "forgot-password":
        return (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Forgot Password?</CardTitle>
              <CardDescription>Enter your email to receive an OTP for password reset</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>

                <Button type="button" variant="ghost" onClick={() => setStep("login")} className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </form>
            </CardContent>
          </Card>
        )

      case "verify-otp":
        return (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Verify OTP</CardTitle>
              <CardDescription>Enter the 6-digit code sent to {formData.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP Code</Label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={handleInputChange}
                    required
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                  />
                  <p className="text-xs text-gray-500 text-center">Check your email inbox for the OTP</p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleForgotPassword({ preventDefault: () => {} } as React.FormEvent)}
                  className="w-full"
                  disabled={isLoading}
                >
                  Resend OTP
                </Button>
              </form>
            </CardContent>
          </Card>
        )

      case "reset-password":
        return (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>Create a new password for your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a new password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  <PasswordStrengthMeter password={formData.password} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className={!passwordsMatch && formData.confirmPassword ? "border-red-500" : ""}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {!passwordsMatch && formData.confirmPassword && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span>Passwords do not match! Please retype.</span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !passwordsMatch || calculatePasswordStrength(formData.password).score < 2}
                >
                  {isLoading ? "Resetting Password..." : "Reset Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {message && (
          <Alert className={message.type === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {renderStep()}

        {step === "login" && (
          <div className="text-center text-sm text-gray-600">
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
