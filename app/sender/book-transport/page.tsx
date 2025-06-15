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
import { ArrowLeft, Truck, Package, Upload, Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getAIVehicleMatching, type MatchingRequest, type Vehicle } from "@/lib/gemini-ai"

export default function BookTransportPage() {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    pickupLocation: "",
    dropLocation: "",
    goodsType: "",
    weight: "",
    dimensions: "",
    pickupDate: "",
    pickupTime: "",
    specialInstructions: "",
    documents: [] as File[],
  })

  const [availableVehicles] = useState([
    {
      id: 1,
      driverName: "Rajesh Kumar",
      vehicleType: "Truck",
      vehicleNumber: "MH 01 AB 1234",
      capacity: "1000 kg",
      rating: 4.8,
      completedTrips: 150,
      estimatedCost: 15000,
      estimatedTime: "8-10 hours",
      distance: "450 km",
    },
    {
      id: 2,
      driverName: "Suresh Patel",
      vehicleType: "Van",
      vehicleNumber: "GJ 05 CD 5678",
      capacity: "800 kg",
      rating: 4.6,
      completedTrips: 120,
      estimatedCost: 12000,
      estimatedTime: "6-8 hours",
      distance: "450 km",
    },
    {
      id: 3,
      driverName: "Amit Singh",
      vehicleType: "Pickup",
      vehicleNumber: "UP 32 EF 9012",
      capacity: "500 kg",
      rating: 4.9,
      completedTrips: 200,
      estimatedCost: 10000,
      estimatedTime: "7-9 hours",
      distance: "450 km",
    },
  ])

  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null)
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([])
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [insuranceOption, setInsuranceOption] = useState<"none" | "basic" | "comprehensive">("none")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setBookingData({ ...bookingData, documents: [...bookingData.documents, ...newFiles] })
    }
  }

  const removeDocument = (index: number) => {
    const newDocs = bookingData.documents.filter((_, i) => i !== index)
    setBookingData({ ...bookingData, documents: newDocs })
  }

  const handleBookingSubmit = () => {
    console.log("Booking confirmed:", { ...bookingData, selectedVehicle })
    // Redirect to tracking page
    window.location.href = "/sender/track-shipment"
  }

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>{t("bookTransport")}</span>
        </CardTitle>
        <CardDescription>Enter your shipment details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickupLocation">{t("pickupLocation")}</Label>
            <Input
              id="pickupLocation"
              placeholder="Enter pickup address"
              value={bookingData.pickupLocation}
              onChange={(e) => setBookingData({ ...bookingData, pickupLocation: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dropLocation">{t("dropLocation")}</Label>
            <Input
              id="dropLocation"
              placeholder="Enter drop address"
              value={bookingData.dropLocation}
              onChange={(e) => setBookingData({ ...bookingData, dropLocation: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="goodsType">{t("goodsType")}</Label>
          <Select onValueChange={(value) => setBookingData({ ...bookingData, goodsType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select goods type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="food">Food Items</SelectItem>
              <SelectItem value="machinery">Machinery</SelectItem>
              <SelectItem value="documents">Documents</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">{t("weight")} (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="500"
              value={bookingData.weight}
              onChange={(e) => setBookingData({ ...bookingData, weight: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dimensions">{t("dimensions")} (L×W×H cm)</Label>
            <Input
              id="dimensions"
              placeholder="100×50×30"
              value={bookingData.dimensions}
              onChange={(e) => setBookingData({ ...bookingData, dimensions: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickupDate">Pickup Date</Label>
            <Input
              id="pickupDate"
              type="date"
              value={bookingData.pickupDate}
              onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pickupTime">Pickup Time</Label>
            <Input
              id="pickupTime"
              type="time"
              value={bookingData.pickupTime}
              onChange={(e) => setBookingData({ ...bookingData, pickupTime: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialInstructions">Special Instructions</Label>
          <Textarea
            id="specialInstructions"
            placeholder="Any special handling instructions..."
            value={bookingData.specialInstructions}
            onChange={(e) => setBookingData({ ...bookingData, specialInstructions: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Upload Documents (Invoice, E-way Bill, etc.)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB each</p>
              </div>
            </label>
          </div>
          {bookingData.documents.length > 0 && (
            <div className="space-y-2">
              {bookingData.documents.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm">{file.name}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button onClick={() => setStep(2)} className="w-full">
          Find Available Vehicles
        </Button>
      </CardContent>
    </Card>
  )

  const getAIRecommendations = async () => {
    setIsLoadingAI(true)
    try {
      const matchingRequest: MatchingRequest = {
        goodsType: bookingData.goodsType,
        weight: Number.parseFloat(bookingData.weight) || 0,
        dimensions: bookingData.dimensions,
        distance: 450, // This would be calculated from actual route
        urgency: "medium", // This could be derived from pickup date
        fragile: bookingData.specialInstructions.toLowerCase().includes("fragile"),
        route: `${bookingData.pickupLocation} to ${bookingData.dropLocation}`,
      }

      const vehicleData: Vehicle[] = availableVehicles.map((v) => ({
        id: v.id,
        type: v.vehicleType,
        capacity: Number.parseInt(v.capacity.replace(" kg", "")),
        fuelEfficiency: 12, // Mock data
        driverRating: v.rating,
        cost: v.estimatedCost,
        ecoScore: v.vehicleType === "truck" ? 75 : 85,
      }))

      const recommendations = await getAIVehicleMatching(matchingRequest, vehicleData)
      setAiRecommendations(recommendations)
    } catch (error) {
      console.error("AI matching error:", error)
    } finally {
      setIsLoadingAI(false)
    }
  }

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Available Vehicles on Your Route</CardTitle>
            <CardDescription>
              Route: {bookingData.pickupLocation} → {bookingData.dropLocation}
            </CardDescription>
          </div>
          <Button variant="outline" onClick={getAIRecommendations} disabled={isLoadingAI}>
            🤖 {isLoadingAI ? "AI Analyzing..." : "Get AI Recommendations"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {aiRecommendations.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">🤖 AI Recommendations</h4>
            <div className="text-sm text-blue-700">
              Best match: Vehicle #{aiRecommendations[0]?.vehicleId} - {aiRecommendations[0]?.reason}
            </div>
          </div>
        )}

        {availableVehicles.map((vehicle) => {
          const aiRec = aiRecommendations.find((r) => r.vehicleId === vehicle.id)
          return (
            <Card
              key={vehicle.id}
              className={`cursor-pointer transition-all ${
                selectedVehicle === vehicle.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
              } ${aiRec?.score > 90 ? "border-green-300 bg-green-50" : ""}`}
              onClick={() => setSelectedVehicle(vehicle.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center space-x-2">
                        <span>{vehicle.driverName}</span>
                        {aiRec?.score > 90 && <Badge className="bg-green-100 text-green-800">🤖 AI Recommended</Badge>}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {vehicle.vehicleType} • {vehicle.vehicleNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">₹{vehicle.estimatedCost.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{vehicle.estimatedTime}</div>
                  </div>
                </div>

                {aiRec && (
                  <div className="bg-blue-50 p-2 rounded text-xs text-blue-700 mb-3">
                    AI Score: {aiRec.score}/100 - {aiRec.reason}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{vehicle.rating}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Capacity:</span> {vehicle.capacity}
                  </div>
                  <div>
                    <span className="text-gray-500">Trips:</span> {vehicle.completedTrips}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Distance: {vehicle.distance}</span>
                    {selectedVehicle === vehicle.id && <Badge className="bg-blue-100 text-blue-800">Selected</Badge>}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        <div className="flex space-x-4 pt-4">
          <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
            Back
          </Button>
          <Button onClick={() => setStep(3)} disabled={!selectedVehicle} className="flex-1">
            Continue to Insurance & Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep3 = () => {
    const selected = availableVehicles.find((v) => v.id === selectedVehicle)
    if (!selected) return null

    const goodsValue = Number.parseFloat(bookingData.weight) * 100 // Assume ₹100 per kg as base value
    const basicInsurance = goodsValue * 0.02 // 2% of goods value
    const comprehensiveInsurance = goodsValue * 0.05 // 5% of goods value

    return (
      <Card>
        <CardHeader>
          <CardTitle>Insurance & Payment</CardTitle>
          <CardDescription>Protect your shipment and confirm booking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Insurance Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Load Insurance</h3>

            <div className="grid gap-3">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  insuranceOption === "none" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setInsuranceOption("none")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">No Insurance</h4>
                    <p className="text-sm text-gray-600">Transport at your own risk</p>
                  </div>
                  <div className="text-lg font-bold">₹0</div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  insuranceOption === "basic" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setInsuranceOption("basic")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Basic Insurance</h4>
                    <p className="text-sm text-gray-600">Coverage up to ₹{goodsValue.toLocaleString()}</p>
                  </div>
                  <div className="text-lg font-bold text-blue-600">₹{basicInsurance.toFixed(0)}</div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  insuranceOption === "comprehensive" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setInsuranceOption("comprehensive")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Comprehensive Insurance</h4>
                    <p className="text-sm text-gray-600">Full coverage + theft protection</p>
                  </div>
                  <div className="text-lg font-bold text-green-600">₹{comprehensiveInsurance.toFixed(0)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Existing booking summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Route:</span>
                <span>
                  {bookingData.pickupLocation} → {bookingData.dropLocation}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Goods:</span>
                <span>
                  {bookingData.goodsType} ({bookingData.weight} kg)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pickup:</span>
                <span>
                  {bookingData.pickupDate} at {bookingData.pickupTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Driver:</span>
                <span>{selected.driverName}</span>
              </div>
              <div className="flex justify-between">
                <span>Vehicle:</span>
                <span>
                  {selected.vehicleType} ({selected.vehicleNumber})
                </span>
              </div>
            </div>
          </div>

          {/* Updated total with insurance */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Transport Cost:</span>
                <span className="font-semibold">₹{selected.estimatedCost.toLocaleString()}</span>
              </div>
              {insuranceOption !== "none" && (
                <div className="flex justify-between items-center">
                  <span>Insurance ({insuranceOption}):</span>
                  <span className="font-semibold">
                    ₹{(insuranceOption === "basic" ? basicInsurance : comprehensiveInsurance).toFixed(0)}
                  </span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹
                  {(
                    selected.estimatedCost +
                    (insuranceOption === "basic"
                      ? basicInsurance
                      : insuranceOption === "comprehensive"
                        ? comprehensiveInsurance
                        : 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">Payment will be processed securely via Razorpay</p>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
              Back
            </Button>
            <Button onClick={handleBookingSubmit} className="flex-1">
              Confirm & Pay
            </Button>
          </div>
        </CardContent>
      </Card>
    )
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
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNum ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 3 && <div className={`w-16 h-1 mx-2 ${step > stepNum ? "bg-blue-600" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Booking Details</span>
              <span>Select Vehicle</span>
              <span>Confirm & Pay</span>
            </div>
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  )
}
