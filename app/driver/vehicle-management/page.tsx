"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Truck, Plus, Edit, Upload, MapPin, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function VehicleManagementPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"vehicles" | "routes" | "add-vehicle" | "add-route">("vehicles")

  const [vehicles] = useState([
    {
      id: 1,
      type: "Truck",
      number: "MH 01 AB 1234",
      capacity: "1000 kg",
      status: "active",
      currentLocation: "Mumbai",
      documents: {
        registration: "valid",
        insurance: "expires_soon",
        permit: "valid",
      },
    },
    {
      id: 2,
      type: "Van",
      number: "MH 02 CD 5678",
      capacity: "500 kg",
      status: "maintenance",
      currentLocation: "Pune",
      documents: {
        registration: "valid",
        insurance: "valid",
        permit: "expired",
      },
    },
  ])

  const [routes] = useState([
    {
      id: 1,
      from: "Mumbai",
      to: "Delhi",
      distance: "1,400 km",
      availableSpace: "800 kg",
      departureDate: "2024-01-16",
      status: "available",
    },
    {
      id: 2,
      from: "Pune",
      to: "Bangalore",
      distance: "850 km",
      availableSpace: "300 kg",
      departureDate: "2024-01-17",
      status: "booked",
    },
  ])

  const [newVehicle, setNewVehicle] = useState({
    type: "",
    number: "",
    capacity: "",
    model: "",
    year: "",
    fuelType: "",
    documents: [] as File[],
  })

  const [newRoute, setNewRoute] = useState({
    from: "",
    to: "",
    departureDate: "",
    departureTime: "",
    availableSpace: "",
    pricePerKg: "",
    specialRequirements: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "available":
        return "bg-blue-100 text-blue-800"
      case "booked":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDocumentStatus = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-green-100 text-green-800"
      case "expires_soon":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New vehicle:", newVehicle)
    setActiveTab("vehicles")
  }

  const handleRouteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New route:", newRoute)
    setActiveTab("routes")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setNewVehicle({ ...newVehicle, documents: [...newVehicle.documents, ...files] })
    }
  }

  const renderVehicles = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{t("vehicleDetails")}</h3>
        <Button onClick={() => setActiveTab("add-vehicle")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      <div className="grid gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{vehicle.type}</CardTitle>
                    <CardDescription>{vehicle.number}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-500">Capacity:</span>
                  <p className="font-medium">{vehicle.capacity}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Location:</span>
                  <p className="font-medium">{vehicle.currentLocation}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Document Status:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getDocumentStatus(vehicle.documents.registration)}>
                    Registration: {vehicle.documents.registration}
                  </Badge>
                  <Badge className={getDocumentStatus(vehicle.documents.insurance)}>
                    Insurance: {vehicle.documents.insurance}
                  </Badge>
                  <Badge className={getDocumentStatus(vehicle.documents.permit)}>
                    Permit: {vehicle.documents.permit}
                  </Badge>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Update Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderRoutes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{t("availableSpace")}</h3>
        <Button onClick={() => setActiveTab("add-route")}>
          <Plus className="w-4 h-4 mr-2" />
          Post Route
        </Button>
      </div>

      <div className="grid gap-6">
        {routes.map((route) => (
          <Card key={route.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {route.from} → {route.to}
                </CardTitle>
                <Badge className={getStatusColor(route.status)}>{route.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{route.distance}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{route.availableSpace} available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{route.departureDate}</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Route
                </Button>
                {route.status === "available" && <Button size="sm">View Requests</Button>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderAddVehicle = () => (
    <Card>
      <CardHeader>
        <CardTitle>Add New Vehicle</CardTitle>
        <CardDescription>Register a new vehicle to your fleet</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVehicleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select onValueChange={(value) => setNewVehicle({ ...newVehicle, type: value })}>
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
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                placeholder="MH 01 AB 1234"
                value={newVehicle.number}
                onChange={(e) => setNewVehicle({ ...newVehicle, number: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity (kg)</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="1000"
                value={newVehicle.capacity}
                onChange={(e) => setNewVehicle({ ...newVehicle, capacity: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                placeholder="Tata Ace"
                value={newVehicle.model}
                onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                placeholder="2020"
                value={newVehicle.year}
                onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelType">Fuel Type</Label>
            <Select onValueChange={(value) => setNewVehicle({ ...newVehicle, fuelType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="cng">CNG</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Upload Documents</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="vehicle-docs"
              />
              <label htmlFor="vehicle-docs" className="cursor-pointer">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload Registration, Insurance, Permit</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" className="flex-1">
              Add Vehicle
            </Button>
            <Button type="button" variant="outline" onClick={() => setActiveTab("vehicles")} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  const renderAddRoute = () => (
    <Card>
      <CardHeader>
        <CardTitle>Post Available Route</CardTitle>
        <CardDescription>Share your available space with potential customers</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRouteSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                placeholder="Mumbai"
                value={newRoute.from}
                onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder="Delhi"
                value={newRoute.to}
                onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={newRoute.departureDate}
                onChange={(e) => setNewRoute({ ...newRoute, departureDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureTime">Departure Time</Label>
              <Input
                id="departureTime"
                type="time"
                value={newRoute.departureTime}
                onChange={(e) => setNewRoute({ ...newRoute, departureTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="availableSpace">Available Space (kg)</Label>
              <Input
                id="availableSpace"
                type="number"
                placeholder="500"
                value={newRoute.availableSpace}
                onChange={(e) => setNewRoute({ ...newRoute, availableSpace: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerKg">Price per KG (₹)</Label>
              <Input
                id="pricePerKg"
                type="number"
                placeholder="15"
                value={newRoute.pricePerKg}
                onChange={(e) => setNewRoute({ ...newRoute, pricePerKg: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequirements">Special Requirements</Label>
            <Textarea
              id="specialRequirements"
              placeholder="Any special conditions or requirements..."
              value={newRoute.specialRequirements}
              onChange={(e) => setNewRoute({ ...newRoute, specialRequirements: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex space-x-4">
            <Button type="submit" className="flex-1">
              Post Route
            </Button>
            <Button type="button" variant="outline" onClick={() => setActiveTab("routes")} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/driver/dashboard" className="flex items-center text-blue-600 hover:text-blue-700">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Management</h2>
            <p className="text-gray-600">Manage your vehicles and available routes</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
            <Button
              variant={activeTab === "vehicles" ? "default" : "ghost"}
              onClick={() => setActiveTab("vehicles")}
              className="flex-1"
            >
              My Vehicles
            </Button>
            <Button
              variant={activeTab === "routes" ? "default" : "ghost"}
              onClick={() => setActiveTab("routes")}
              className="flex-1"
            >
              My Routes
            </Button>
          </div>

          {/* Content */}
          {activeTab === "vehicles" && renderVehicles()}
          {activeTab === "routes" && renderRoutes()}
          {activeTab === "add-vehicle" && renderAddVehicle()}
          {activeTab === "add-route" && renderAddRoute()}
        </div>
      </div>
    </div>
  )
}
