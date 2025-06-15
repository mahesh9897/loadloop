"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, Package, ArrowLeft, AlertCircle } from "lucide-react"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const initialRole = searchParams.get("role") || "sender"

  const [role, setRole] = useState(initialRole)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Driver specific
    vehicleType: "",
    vehicleCapacity: "",
    licenseNumber: "",
    // Sender specific
    companyName: "",
    businessType: "",
  })

  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [showPasswordError, setShowPasswordError] = useState(false)

  // Check if passwords match whenever either password field changes
  useEffect(() => {
    if (formData.confirmPassword) {
      setPasswordsMatch(formData.password === formData.confirmPassword)
      setShowPasswordError(formData.password !== formData.confirmPassword)
    } else {
      setShowPasswordError(false)
    }
  }, [formData.password, formData.confirmPassword])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match before submission
    if (!passwordsMatch) {
      setShowPasswordError(true)
      return
    }

    // Handle registration logic here
    console.log("Registration data:", { role, ...formData })
    // Redirect to dashboard based on role
    window.location.href = role === "driver" ? "/driver/dashboard" : "/sender/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">LoadLoop</h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Create Your Account</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Choose your role and fill in your details to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label>I am a:</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={role === "sender" ? "default" : "outline"}
                      onClick={() => setRole("sender")}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Package className="w-4 h-4" />
                      <span>Sender</span>
                    </Button>
                    <Button
                      type="button"
                      variant={role === "driver" ? "default" : "outline"}
                      onClick={() => setRole("driver")}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Driver</span>
                    </Button>
                  </div>
                </div>

                {/* Common Fields */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                {/* Role-specific fields */}
                {role === "driver" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Vehicle Type</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pickup">Pickup Truck</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                          <SelectItem value="trailer">Trailer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicleCapacity">Vehicle Capacity (kg)</Label>
                      <Input
                        id="vehicleCapacity"
                        type="number"
                        value={formData.vehicleCapacity}
                        onChange={(e) => setFormData({ ...formData, vehicleCapacity: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        required
                      />
                    </div>
                  </>
                )}

                {role === "sender" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name (Optional)</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className={showPasswordError ? "border-red-500 focus:ring-red-500" : ""}
                  />
                  {showPasswordError && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span>Passwords do not match! Please retype.</span>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <Link href="/login" className="text-blue-600 hover:text-blue-700">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
