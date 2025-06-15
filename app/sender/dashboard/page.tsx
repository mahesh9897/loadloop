"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  Plus,
  Truck,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  LogOut,
  Search,
} from "lucide-react"
import { useLoads } from "@/contexts/loads-context"

export default function SenderDashboard() {
  const router = useRouter()
  const { activeLoads, completedLoads } = useLoads()
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    vehicleType: "Any",
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Create query string
    const queryParams = new URLSearchParams({
      from: searchParams.from,
      to: searchParams.to,
      date: searchParams.date,
      vehicleType: searchParams.vehicleType,
    }).toString()

    // Navigate to search page
    router.push(`/sender/search-vehicles?${queryParams}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-transit":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "in-transit":
        return <Truck className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  // Calculate total bids from active loads
  const totalBids = activeLoads.reduce((sum, load) => sum + (load.bids || 0), 0)

  // Calculate total spent from completed loads
  const totalSpent = completedLoads.reduce((sum, load) => {
    const amount =
      typeof load.budget === "string" ? Number.parseInt(load.budget.replace(/[₹,]/g, "")) : load.budget || 0
    return sum + amount
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LoadLoop</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
          <p className="text-gray-600">Manage your shipments and track deliveries</p>
        </div>

        {/* Search Vehicle Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Available Vehicles</CardTitle>
            <CardDescription>Search for vehicles that match your requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    placeholder="Pickup location"
                    value={searchParams.from}
                    onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    placeholder="Delivery location"
                    value={searchParams.to}
                    onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Select
                    value={searchParams.vehicleType}
                    onValueChange={(value) => setSearchParams({ ...searchParams, vehicleType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any Vehicle</SelectItem>
                      <SelectItem value="Pickup">Pickup Truck</SelectItem>
                      <SelectItem value="Van">Van</SelectItem>
                      <SelectItem value="Truck">Truck</SelectItem>
                      <SelectItem value="Trailer">Trailer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Search Vehicles
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Loads</p>
                  <p className="text-2xl font-bold text-gray-900">{activeLoads.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bids</p>
                  <p className="text-2xl font-bold text-gray-900">{totalBids}</p>
                </div>
                <Truck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedLoads.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Loads Management */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Your Loads</h3>
              <Link href="/sender/post-load">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Load
                </Button>
              </Link>
            </div>

            <Tabs defaultValue="active" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active Loads</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {activeLoads.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No active loads</h3>
                      <p className="text-gray-500 mb-4">Start by posting your first load to get bids from drivers</p>
                      <Link href="/sender/post-load">
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Post Your First Load
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  activeLoads.map((load) => (
                    <Card key={load.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{load.title}</CardTitle>
                          <Badge className={getStatusColor(load.status)}>
                            {getStatusIcon(load.status)}
                            <span className="ml-1 capitalize">{load.status}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>
                              {load.from} → {load.to}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Package className="w-4 h-4 text-gray-500" />
                            <span>{load.weight}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>{load.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-gray-500" />
                            <span>{load.budget}</span>
                          </div>
                        </div>
                        {load.bids > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm text-blue-600 font-medium">
                              {load.bids} bid{load.bids > 1 ? "s" : ""} received
                            </p>
                            <Button variant="outline" size="sm" className="mt-2">
                              View Bids
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedLoads.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No completed loads</h3>
                      <p className="text-gray-500">Your completed deliveries will appear here</p>
                    </CardContent>
                  </Card>
                ) : (
                  completedLoads.map((load) => (
                    <Card key={load.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{load.title}</CardTitle>
                          <Badge className={getStatusColor(load.status)}>
                            {getStatusIcon(load.status)}
                            <span className="ml-1 capitalize">{load.status}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>
                              {load.from} → {load.to}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Package className="w-4 h-4 text-gray-500" />
                            <span>{load.weight}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>{load.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-gray-500" />
                            <span>{load.budget}</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm text-green-600 font-medium">⭐ Rating: {load.rating}/5</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Post a Load</CardTitle>
                  <CardDescription>Create a new shipment request and get bids from drivers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/sender/post-load">
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Post Load
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Find Drivers</CardTitle>
                  <CardDescription>Browse available drivers in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Truck className="w-4 h-4 mr-2" />
                    Browse Drivers
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Track Shipment</CardTitle>
                  <CardDescription>Monitor your active deliveries in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    Track Loads
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
