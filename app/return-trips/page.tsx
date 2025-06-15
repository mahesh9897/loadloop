"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Truck, Search, MapPin, Calendar, Package, DollarSign, RotateCcw, Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ReturnTripsPage() {
  const { t } = useLanguage()
  const [userType] = useState<"sender" | "driver">("sender") // This would come from auth context
  const [searchFilters, setSearchFilters] = useState({
    from: "",
    to: "",
    date: "",
    vehicleType: "",
    maxPrice: "",
  })

  const [returnTrips] = useState([
    {
      id: 1,
      driverName: "Rajesh Kumar",
      vehicleType: "Truck",
      vehicleNumber: "MH 01 AB 1234",
      from: "Delhi",
      to: "Mumbai",
      departureDate: "2024-01-18",
      departureTime: "06:00 AM",
      availableSpace: "800 kg",
      pricePerKg: 12,
      distance: "1,400 km",
      estimatedTime: "18 hours",
      rating: 4.8,
      completedTrips: 150,
      isEcoRoute: true,
      originalDelivery: "Electronics to Delhi",
    },
    {
      id: 2,
      driverName: "Suresh Patel",
      vehicleType: "Van",
      vehicleNumber: "GJ 05 CD 5678",
      from: "Bangalore",
      to: "Chennai",
      departureDate: "2024-01-19",
      departureTime: "08:00 AM",
      availableSpace: "400 kg",
      pricePerKg: 15,
      distance: "350 km",
      estimatedTime: "6 hours",
      rating: 4.6,
      completedTrips: 120,
      isEcoRoute: false,
      originalDelivery: "Furniture to Bangalore",
    },
    {
      id: 3,
      driverName: "Amit Singh",
      vehicleType: "Pickup",
      vehicleNumber: "UP 32 EF 9012",
      from: "Pune",
      to: "Nashik",
      departureDate: "2024-01-17",
      departureTime: "02:00 PM",
      availableSpace: "300 kg",
      pricePerKg: 18,
      distance: "210 km",
      estimatedTime: "4 hours",
      rating: 4.9,
      completedTrips: 200,
      isEcoRoute: true,
      originalDelivery: "Medical supplies to Pune",
    },
  ])

  const [myReturnTrips] = useState([
    {
      id: 1,
      from: "Mumbai",
      to: "Delhi",
      departureDate: "2024-01-20",
      availableSpace: "600 kg",
      pricePerKg: 14,
      status: "active",
      bookings: 2,
      revenue: 8400,
    },
    {
      id: 2,
      from: "Chennai",
      to: "Bangalore",
      departureDate: "2024-01-22",
      availableSpace: "300 kg",
      pricePerKg: 16,
      status: "booked",
      bookings: 1,
      revenue: 4800,
    },
  ])

  const filteredTrips = returnTrips.filter((trip) => {
    return (
      (!searchFilters.from || trip.from.toLowerCase().includes(searchFilters.from.toLowerCase())) &&
      (!searchFilters.to || trip.to.toLowerCase().includes(searchFilters.to.toLowerCase())) &&
      (!searchFilters.date || trip.departureDate === searchFilters.date) &&
      (!searchFilters.vehicleType || trip.vehicleType.toLowerCase() === searchFilters.vehicleType.toLowerCase())
    )
  })

  const handleBookReturnTrip = (tripId: number) => {
    console.log("Booking return trip:", tripId)
    // Handle booking logic
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "booked":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderAvailableTrips = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Return Trips</CardTitle>
          <CardDescription>Search for available return trips that match your route</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                placeholder="Origin city"
                value={searchFilters.from}
                onChange={(e) => setSearchFilters({ ...searchFilters, from: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder="Destination city"
                value={searchFilters.to}
                onChange={(e) => setSearchFilters({ ...searchFilters, to: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={searchFilters.date}
                onChange={(e) => setSearchFilters({ ...searchFilters, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select onValueChange={(value) => setSearchFilters({ ...searchFilters, vehicleType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Vehicle</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="trailer">Trailer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Return Trips */}
      <div className="space-y-4">
        {filteredTrips.map((trip) => (
          <Card key={trip.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <RotateCcw className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span>
                        {trip.from} → {trip.to}
                      </span>
                      {trip.isEcoRoute && <Badge className="bg-green-100 text-green-800">🌱 Eco Route</Badge>}
                    </CardTitle>
                    <CardDescription>Return trip after: {trip.originalDelivery}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">₹{trip.pricePerKg}/kg</div>
                  <div className="text-sm text-gray-500">{trip.availableSpace} available</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>
                    {trip.departureDate} at {trip.departureTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-gray-500" />
                  <span>
                    {trip.vehicleType} ({trip.vehicleNumber})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>
                    {trip.distance} • {trip.estimatedTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    {trip.rating} ({trip.completedTrips} trips)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Driver: <span className="font-medium">{trip.driverName}</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" onClick={() => handleBookReturnTrip(trip.id)}>
                    Book Space
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderMyReturnTrips = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">My Posted Return Trips</h3>
        <Link href="/driver/post-return-trip">
          <Button>
            <RotateCcw className="w-4 h-4 mr-2" />
            Post Return Trip
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {myReturnTrips.map((trip) => (
          <Card key={trip.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {trip.from} → {trip.to}
                </CardTitle>
                <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{trip.departureDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span>{trip.availableSpace} available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>₹{trip.pricePerKg}/kg</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Revenue:</span>
                  <span className="font-medium">₹{trip.revenue.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {trip.bookings} booking{trip.bookings !== 1 ? "s" : ""} received
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Edit Trip
                  </Button>
                  {trip.status === "active" && <Button size="sm">View Bookings</Button>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
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
                <RotateCcw className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Return Trips</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Return Trip Marketplace</h2>
            <p className="text-gray-600">
              {userType === "sender"
                ? "Find drivers returning on your route for cost-effective shipping"
                : "Monetize your return trips by offering available space"}
            </p>
          </div>

          {userType === "sender" ? (
            renderAvailableTrips()
          ) : (
            <Tabs defaultValue="available" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="available">Available Trips</TabsTrigger>
                <TabsTrigger value="my-trips">My Return Trips</TabsTrigger>
              </TabsList>

              <TabsContent value="available">{renderAvailableTrips()}</TabsContent>

              <TabsContent value="my-trips">{renderMyReturnTrips()}</TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}
