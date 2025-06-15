"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Truck, Package, MapPin, Calendar, DollarSign } from "lucide-react"
import { useLoads } from "@/contexts/loads-context"

export default function PostLoadPage() {
  const router = useRouter()
  const { addLoad } = useLoads()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pickupLocation: "",
    deliveryLocation: "",
    weight: "",
    dimensions: "",
    vehicleType: "",
    pickupDate: "",
    deliveryDate: "",
    budget: "",
    isFragile: false,
    requiresInsurance: false,
    contactPhone: "",
    specialInstructions: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Load posted:", formData)

    // Add the load to our context
    addLoad({
      title: formData.title,
      from: formData.pickupLocation,
      to: formData.deliveryLocation,
      date: formData.pickupDate,
      weight: `${formData.weight} kg`,
      vehicleType: formData.vehicleType || "Any",
      budget: `₹${formData.budget}`,
    })

    // Redirect back to dashboard
    router.push("/sender/dashboard")
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Post a New Load</h2>
            <p className="text-gray-600">Fill in the details of your shipment to get bids from drivers</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Load Details</span>
              </CardTitle>
              <CardDescription>Provide comprehensive information about your shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="title">Load Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Electronics Shipment"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you're shipping..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Location Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Location Details</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupLocation">Pickup Location</Label>
                      <Input
                        id="pickupLocation"
                        placeholder="City, State"
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryLocation">Delivery Location</Label>
                      <Input
                        id="deliveryLocation"
                        placeholder="City, State"
                        value={formData.deliveryLocation}
                        onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Load Specifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Load Specifications</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="500"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Dimensions (L×W×H cm)</Label>
                      <Input
                        id="dimensions"
                        placeholder="100×50×30"
                        value={formData.dimensions}
                        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Required Vehicle Type</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Vehicle</SelectItem>
                        <SelectItem value="pickup">Pickup Truck</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="trailer">Trailer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Timeline</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupDate">Pickup Date</Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">Delivery Date</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Budget</span>
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (₹)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="15000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Special Requirements</h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isFragile"
                        checked={formData.isFragile}
                        onCheckedChange={(checked) => setFormData({ ...formData, isFragile: checked as boolean })}
                      />
                      <Label htmlFor="isFragile">Fragile items - requires careful handling</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requiresInsurance"
                        checked={formData.requiresInsurance}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, requiresInsurance: checked as boolean })
                        }
                      />
                      <Label htmlFor="requiresInsurance">Requires insurance coverage</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      placeholder="Any special handling instructions..."
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button type="submit" className="flex-1">
                    Post Load
                  </Button>
                  <Link href="/sender/dashboard">
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
