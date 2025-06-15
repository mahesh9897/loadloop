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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, RotateCcw, Leaf, Route, Calculator } from "lucide-react"
import { getEcoRoute } from "@/lib/gemini-ai"

export default function PostReturnTripPage() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    departureTime: "",
    availableSpace: "",
    pricePerKg: "",
    vehicleType: "",
    specialRequirements: "",
    allowFragile: false,
    offerInsurance: false,
    useEcoRoute: false,
  })

  const [ecoRouteData, setEcoRouteData] = useState<any>(null)
  const [isLoadingEcoRoute, setIsLoadingEcoRoute] = useState(false)

  const handleEcoRouteCheck = async () => {
    if (!formData.from || !formData.to) {
      alert("Please enter both origin and destination first")
      return
    }

    setIsLoadingEcoRoute(true)
    try {
      const ecoData = await getEcoRoute(formData.from, formData.to)
      setEcoRouteData(ecoData)
      setFormData({ ...formData, useEcoRoute: true })
    } catch (error) {
      console.error("Error getting eco route:", error)
    } finally {
      setIsLoadingEcoRoute(false)
    }
  }

  const calculateEstimatedEarnings = () => {
    const space = Number.parseFloat(formData.availableSpace) || 0
    const price = Number.parseFloat(formData.pricePerKg) || 0
    return space * price
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Return trip posted:", formData)
    // Handle form submission
    window.location.href = "/return-trips"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/return-trips" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Return Trips
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Post Return Trip</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Post Your Return Trip</h2>
            <p className="text-gray-600">Monetize your return journey by offering available space</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Return Trip Details</CardTitle>
              <CardDescription>Fill in your return trip information to attract bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Route Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Route Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="from">From (Current Location)</Label>
                      <Input
                        id="from"
                        placeholder="Delhi"
                        value={formData.from}
                        onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to">To (Return Destination)</Label>
                      <Input
                        id="to"
                        placeholder="Mumbai"
                        value={formData.to}
                        onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Eco Route Section */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Leaf className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">Eco-Friendly Route</span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleEcoRouteCheck}
                        disabled={isLoadingEcoRoute}
                      >
                        <Route className="w-4 h-4 mr-2" />
                        {isLoadingEcoRoute ? "Analyzing..." : "Get Eco Route"}
                      </Button>
                    </div>

                    {ecoRouteData && (
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Route:</strong> {ecoRouteData.route}
                        </p>
                        <p>
                          <strong>Distance:</strong> {ecoRouteData.distance}
                        </p>
                        <p>
                          <strong>Fuel Saving:</strong> {ecoRouteData.estimatedFuelSaving}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Checkbox
                            id="useEcoRoute"
                            checked={formData.useEcoRoute}
                            onCheckedChange={(checked) => setFormData({ ...formData, useEcoRoute: checked as boolean })}
                          />
                          <Label htmlFor="useEcoRoute" className="text-green-700">
                            Use this eco-friendly route (attracts eco-conscious customers)
                          </Label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Schedule</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departureDate">Departure Date</Label>
                      <Input
                        id="departureDate"
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="departureTime">Departure Time</Label>
                      <Input
                        id="departureTime"
                        type="time"
                        value={formData.departureTime}
                        onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle & Capacity */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Vehicle & Capacity</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Label htmlFor="availableSpace">Available Space (kg)</Label>
                      <Input
                        id="availableSpace"
                        type="number"
                        placeholder="500"
                        value={formData.availableSpace}
                        onChange={(e) => setFormData({ ...formData, availableSpace: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pricePerKg">Price per KG (₹)</Label>
                      <Input
                        id="pricePerKg"
                        type="number"
                        placeholder="15"
                        value={formData.pricePerKg}
                        onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })}
                        required
                      />
                    </div>

                    {formData.availableSpace && formData.pricePerKg && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calculator className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-blue-800">Estimated Earnings</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{calculateEstimatedEarnings().toLocaleString()}
                        </div>
                        <p className="text-sm text-blue-600">
                          If fully booked ({formData.availableSpace} kg × ₹{formData.pricePerKg}/kg)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Special Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Special Options</h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowFragile"
                        checked={formData.allowFragile}
                        onCheckedChange={(checked) => setFormData({ ...formData, allowFragile: checked as boolean })}
                      />
                      <Label htmlFor="allowFragile">Accept fragile items (may attract premium pricing)</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="offerInsurance"
                        checked={formData.offerInsurance}
                        onCheckedChange={(checked) => setFormData({ ...formData, offerInsurance: checked as boolean })}
                      />
                      <Label htmlFor="offerInsurance">Offer load insurance (increases customer confidence)</Label>
                    </div>
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">Special Requirements or Notes</Label>
                  <Textarea
                    id="specialRequirements"
                    placeholder="Any special conditions, pickup/drop preferences, or additional services..."
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button type="submit" className="flex-1">
                    Post Return Trip
                  </Button>
                  <Link href="/return-trips">
                    <Button type="button" variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
