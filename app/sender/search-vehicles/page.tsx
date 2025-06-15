"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Truck, MapPin, Calendar, Star, Filter } from "lucide-react"
import { NoVehiclesAlert } from "@/components/no-vehicles-alert"

interface Vehicle {
  id: number
  driverName: string
  vehicleType: string
  vehicleNumber: string
  capacity: string
  rating: number
  completedTrips: number
  estimatedCost: number
  estimatedTime: string
  distance: string
}

export default function SearchVehiclesPage() {
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const date = searchParams.get("date") || ""
  const vehicleType = searchParams.get("vehicleType") || "Any"

  const [isLoading, setIsLoading] = useState(true)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  // Simulate API call to fetch available vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, we'll return an empty array to show the "no vehicles" state
      // In a real app, this would be an API call that might return vehicles
      setVehicles([])
      setIsLoading(false)
    }

    fetchVehicles()
  }, [from, to, date, vehicleType])

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
          {/* Search Details */}
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                <span className="text-xl">
                  {from} <span className="text-gray-400 mx-2">→</span> {to}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                  <span>{date}</span>
                </div>

                <Badge variant="outline" className="font-normal">
                  {vehicleType} vehicle
                </Badge>

                <div className="ml-auto">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Searching for available vehicles...</p>
            </div>
          )}

          {/* No Vehicles State */}
          {!isLoading && vehicles.length === 0 && (
            <NoVehiclesAlert from={from} to={to} date={date} vehicleType={vehicleType} />
          )}

          {/* Vehicle List */}
          {!isLoading && vehicles.length > 0 && (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Truck className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{vehicle.driverName}</h3>
                          <p className="text-sm text-gray-600">
                            {vehicle.vehicleType} • {vehicle.vehicleNumber}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          ₹{vehicle.estimatedCost.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">{vehicle.estimatedTime}</div>
                      </div>
                    </div>

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

                    <div className="mt-3 pt-3 border-t flex justify-end">
                      <Button>Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
