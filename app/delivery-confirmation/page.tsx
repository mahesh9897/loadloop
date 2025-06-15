"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, QrCode, CheckCircle, Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function DeliveryConfirmationPage() {
  const { t } = useLanguage()
  const [userType] = useState<"sender" | "driver">("driver") // This would come from auth context
  const [confirmationMethod, setConfirmationMethod] = useState<"qr" | "otp">("qr")
  const [otpCode, setOtpCode] = useState("")
  const [deliveryPhotos, setDeliveryPhotos] = useState<File[]>([])
  const [deliveryNotes, setDeliveryNotes] = useState("")
  const [recipientSignature, setRecipientSignature] = useState<string | null>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const bookingDetails = {
    id: "LL001234",
    from: "Mumbai",
    to: "Delhi",
    goods: "Electronics",
    weight: "500 kg",
    recipient: "John Doe",
    recipientPhone: "+91 9876543210",
    deliveryAddress: "123 Business Park, Delhi",
  }

  // Generate random OTP for demo
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const [generatedOTP] = useState(generateOTP())

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setDeliveryPhotos([...deliveryPhotos, ...newFiles])
    }
  }

  const removePhoto = (index: number) => {
    setDeliveryPhotos(deliveryPhotos.filter((_, i) => i !== index))
  }

  const handleQRScan = () => {
    // Simulate QR code scanning
    console.log("QR Code scanned successfully")
    setIsConfirmed(true)
  }

  const handleOTPVerification = () => {
    if (otpCode === generatedOTP) {
      setIsConfirmed(true)
    } else {
      alert("Invalid OTP. Please try again.")
    }
  }

  const handleDeliveryComplete = () => {
    const deliveryData = {
      bookingId: bookingDetails.id,
      confirmationMethod,
      photos: deliveryPhotos,
      notes: deliveryNotes,
      signature: recipientSignature,
      rating: userType === "sender" ? rating : null,
      feedback: userType === "sender" ? feedback : null,
    }

    console.log("Delivery completed:", deliveryData)

    // Redirect based on user type
    if (userType === "driver") {
      window.location.href = "/driver/dashboard"
    } else {
      window.location.href = "/sender/dashboard"
    }
  }

  const renderDriverView = () => (
    <div className="space-y-6">
      {/* Delivery Details */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Details</CardTitle>
          <CardDescription>Booking ID: {bookingDetails.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Route:</span>
              <p className="font-medium">
                {bookingDetails.from} → {bookingDetails.to}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Goods:</span>
              <p className="font-medium">
                {bookingDetails.goods} ({bookingDetails.weight})
              </p>
            </div>
            <div>
              <span className="text-gray-500">Recipient:</span>
              <p className="font-medium">{bookingDetails.recipient}</p>
            </div>
            <div>
              <span className="text-gray-500">Phone:</span>
              <p className="font-medium">{bookingDetails.recipientPhone}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-gray-500">Delivery Address:</span>
            <p className="font-medium">{bookingDetails.deliveryAddress}</p>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Method */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Confirmation</CardTitle>
          <CardDescription>Choose your preferred confirmation method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={confirmationMethod === "qr" ? "default" : "outline"}
              onClick={() => setConfirmationMethod("qr")}
              className="h-20 flex flex-col space-y-2"
            >
              <QrCode className="w-6 h-6" />
              <span>QR Code</span>
            </Button>
            <Button
              variant={confirmationMethod === "otp" ? "default" : "outline"}
              onClick={() => setConfirmationMethod("otp")}
              className="h-20 flex flex-col space-y-2"
            >
              <span className="text-2xl">#</span>
              <span>OTP Code</span>
            </Button>
          </div>

          {confirmationMethod === "qr" && (
            <div className="text-center space-y-4">
              <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                <QrCode className="w-24 h-24 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">Ask recipient to show their QR code</p>
              <Button onClick={handleQRScan} disabled={isConfirmed}>
                {isConfirmed ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    QR Code Verified
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4 mr-2" />
                    Scan QR Code
                  </>
                )}
              </Button>
            </div>
          )}

          {confirmationMethod === "otp" && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-blue-700 mb-2">Share this OTP with recipient:</p>
                <div className="text-3xl font-bold text-blue-800 tracking-wider">{generatedOTP}</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="otpInput">Enter OTP from recipient:</Label>
                <Input
                  id="otpInput"
                  placeholder="Enter 6-digit OTP"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <Button onClick={handleOTPVerification} disabled={isConfirmed || otpCode.length !== 6}>
                {isConfirmed ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    OTP Verified
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </div>
          )}

          {isConfirmed && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Delivery Confirmed!</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delivery Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Documentation</CardTitle>
          <CardDescription>Upload photos and add notes for delivery proof</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Delivery Photos</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <div className="text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Take photos of delivered goods</p>
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photos
                </Button>
              </div>
            </div>

            {deliveryPhotos.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {deliveryPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo) || "/placeholder.svg"}
                      alt={`Delivery photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => removePhoto(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryNotes">Delivery Notes</Label>
            <Textarea
              id="deliveryNotes"
              placeholder="Add any notes about the delivery condition, recipient feedback, etc."
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Complete Delivery */}
      <Card>
        <CardContent className="pt-6">
          <Button onClick={handleDeliveryComplete} disabled={!isConfirmed} className="w-full" size="lg">
            <CheckCircle className="w-5 h-5 mr-2" />
            Complete Delivery
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderSenderView = () => (
    <div className="space-y-6">
      {/* Delivery Confirmation */}
      <Card>
        <CardHeader>
          <CardTitle>Confirm Delivery Receipt</CardTitle>
          <CardDescription>Booking ID: {bookingDetails.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Delivery Completed</span>
              </div>
              <p className="text-sm text-green-700">
                Your goods have been successfully delivered to {bookingDetails.deliveryAddress}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Driver:</span>
                <p className="font-medium">Rajesh Kumar</p>
              </div>
              <div>
                <span className="text-gray-500">Delivery Time:</span>
                <p className="font-medium">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Photos */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Photos</CardTitle>
          <CardDescription>Photos taken by driver at delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rate Driver */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Your Experience</CardTitle>
          <CardDescription>Help us improve by rating the driver and service</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Driver Rating</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                  <Star className={`w-8 h-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback (Optional)</Label>
            <Textarea
              id="feedback"
              placeholder="Share your experience with the driver and delivery service..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
            />
          </div>

          <Button onClick={handleDeliveryComplete} className="w-full">
            Submit Rating & Close
          </Button>
        </CardContent>
      </Card>
    </div>
  )

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
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Delivery Confirmation</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {userType === "driver" ? "Confirm Delivery" : "Delivery Received"}
            </h2>
            <p className="text-gray-600">
              {userType === "driver"
                ? "Complete the delivery process with recipient confirmation"
                : "Rate your delivery experience and provide feedback"}
            </p>
          </div>

          {userType === "driver" ? renderDriverView() : renderSenderView()}
        </div>
      </div>
    </div>
  )
}
