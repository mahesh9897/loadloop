"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Star, Upload, Phone, Mail, MapPin, Truck } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"

export default function ProfilePage() {
  const { t } = useLanguage()
  const [userType] = useState<"sender" | "driver">("sender") // This would come from auth context

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    address: "Mumbai, Maharashtra",
    companyName: "TechCorp Ltd",
    businessType: "ecommerce",
    bio: "Experienced in logistics and supply chain management.",
    // Driver specific
    vehicleType: "truck",
    licenseNumber: "MH123456789",
    experience: "5 years",
  })

  const [ratings] = useState([
    {
      id: 1,
      from: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent service! Very professional and timely delivery.",
      date: "2024-01-10",
      bookingId: "LL001234",
    },
    {
      id: 2,
      from: "Priya Sharma",
      rating: 4,
      comment: "Good communication throughout the journey. Recommended!",
      date: "2024-01-08",
      bookingId: "LL001235",
    },
    {
      id: 3,
      from: "Amit Singh",
      rating: 5,
      comment: "Very careful with fragile items. Will book again.",
      date: "2024-01-05",
      bookingId: "LL001236",
    },
  ])

  const [documents] = useState([
    { name: "Driving License", status: "verified", expiryDate: "2026-12-31" },
    { name: "Vehicle Registration", status: "verified", expiryDate: "2025-06-30" },
    { name: "Insurance Certificate", status: "pending", expiryDate: "2024-12-31" },
    { name: "PAN Card", status: "verified", expiryDate: null },
  ])

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile updated:", profileData)
    // Handle profile update
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/${userType}/dashboard`} className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">LoadLoop</h1>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("profile")}</h2>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-600" />
                  </div>
                  <CardTitle>{profileData.name}</CardTitle>
                  <CardDescription>{profileData.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-bold">{averageRating.toFixed(1)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{ratings.length} reviews</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{profileData.address}</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Personal Information */}
                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details and preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={profileData.name}
                              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              value={profileData.address}
                              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                            />
                          </div>
                        </div>

                        {userType === "sender" && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input
                                  id="companyName"
                                  value={profileData.companyName}
                                  onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="businessType">Business Type</Label>
                                <Select
                                  value={profileData.businessType}
                                  onValueChange={(value) => setProfileData({ ...profileData, businessType: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
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
                            </div>
                          </>
                        )}

                        {userType === "driver" && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="vehicleType">Primary Vehicle Type</Label>
                                <Select
                                  value={profileData.vehicleType}
                                  onValueChange={(value) => setProfileData({ ...profileData, vehicleType: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
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
                                <Label htmlFor="licenseNumber">License Number</Label>
                                <Input
                                  id="licenseNumber"
                                  value={profileData.licenseNumber}
                                  onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="experience">Experience</Label>
                              <Input
                                id="experience"
                                value={profileData.experience}
                                onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                              />
                            </div>
                          </>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={profileData.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            rows={3}
                          />
                        </div>

                        <Button type="submit" className="w-full">
                          {t("save")} Changes
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Documents */}
                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle>Documents</CardTitle>
                      <CardDescription>Manage your verification documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{doc.name}</h4>
                              {doc.expiryDate && <p className="text-sm text-gray-600">Expires: {doc.expiryDate}</p>}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getDocumentStatusColor(doc.status)}>{doc.status}</Badge>
                              <Button size="sm" variant="outline">
                                <Upload className="w-4 h-4 mr-2" />
                                Update
                              </Button>
                            </div>
                          </div>
                        ))}

                        <Button className="w-full" variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload New Document
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Reviews */}
                <TabsContent value="reviews">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reviews & Ratings</CardTitle>
                      <CardDescription>See what others say about your service</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {ratings.map((review) => (
                          <div key={review.id} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium">{review.from}</h4>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            <p className="text-xs text-gray-500">Booking ID: {review.bookingId}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
