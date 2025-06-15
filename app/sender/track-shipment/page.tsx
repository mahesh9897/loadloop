"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Truck, MapPin, Phone, MessageCircle, Camera, Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function TrackShipmentPage() {
  const { t } = useLanguage()
  const [currentLocation, setCurrentLocation] = useState("Mumbai")
  const [progress, setProgress] = useState(45)

  // Simulate real-time tracking updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const trackingData = {
    bookingId: "LL001234",
    status: "in-transit",
    driver: {
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      rating: 4.8,
      vehicleNumber: "MH 01 AB 1234",
    },
    route: {
      from: "Mumbai",
      to: "Delhi",
      distance: "1,400 km",
      estimatedTime: "18 hours",
    },
    timeline: [
      { status: "booked", time: "2024-01-15 10:00 AM", completed: true, description: "Booking confirmed" },
      { status: "pickup", time: "2024-01-15 02:00 PM", completed: true, description: "Goods picked up from Mumbai" },
      {
        status: "in-transit",
        time: "2024-01-15 03:30 PM",
        completed: true,
        description: "In transit - Currently near Nashik",
      },
      { status: "delivery", time: "2024-01-16 08:00 AM", completed: false, description: "Expected delivery in Delhi" },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "booked":
        return "bg-blue-100 text-blue-800"
      case "pickup":
        return "bg-yellow-100 text-yellow-800"
      case "in-transit":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/sender/dashboard" className="flex items-center text-blue-600 hover:text-blue-700">
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Track Your Shipment</h2>
            <p className="text-gray-600">Booking ID: {trackingData.bookingId}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tracking Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Status */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Current Status</CardTitle>
                    <Badge className={getStatusColor(trackingData.status)}>{t(trackingData.status as any)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        Currently near: <strong>{currentLocation}</strong>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Route Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Route Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">{trackingData.route.from}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium">{trackingData.route.to}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Distance:</span>
                        <span className="ml-2 font-medium">{trackingData.route.distance}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Est. Time:</span>
                        <span className="ml-2 font-medium">{trackingData.route.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipment Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingData.timeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full mt-2 ${item.completed ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`font-medium ${item.completed ? "text-gray-900" : "text-gray-500"}`}>
                              {item.description}
                            </p>
                            <span className="text-sm text-gray-500">{item.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Driver Info & Actions */}
            <div className="space-y-6">
              {/* Driver Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Driver</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Truck className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{trackingData.driver.name}</h3>
                        <p className="text-sm text-gray-600">{trackingData.driver.vehicleNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{trackingData.driver.rating}</span>
                      <span className="text-sm text-gray-500">(150 trips)</span>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Driver
                      </Button>
                      <Link href="/sender/chat">
                        <Button variant="outline" className="w-full" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {t("chatWithDriver")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    View Delivery Photos
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    Report Issue
                  </Button>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Emergency Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Need immediate assistance? Contact our 24/7 support team.
                  </p>
                  <Button variant="destructive" className="w-full" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
