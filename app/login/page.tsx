"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserTypeSelector } from "@/components/user-type-selector"

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"sender" | "driver" | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Redirect based on user type
    if (userType === "sender") {
      router.push("/sender/dashboard")
    } else if (userType === "driver") {
      router.push("/driver/dashboard")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">LoadLoop</h1>
            <p className="mt-2 text-gray-600">Login to continue</p>
          </div>

          {/* User Type Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">I am a:</h2>
            <UserTypeSelector selectedType={userType} onSelect={(type) => setUserType(type)} />
          </div>

          {/* Login Form */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={!userType}>
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <div className="text-center p-4">
                <p className="mb-4">Create a new account to get started</p>
                <Button
                  onClick={() => router.push("/register")}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={!userType}
                >
                  Register Now
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
