"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { ArrowRight, Bell } from "lucide-react"
import { SleepingDriverIllustration } from "./sleeping-driver-illustration"

interface NoVehiclesAlertProps {
  from: string
  to: string
  date: string
  vehicleType: string
}

export function NoVehiclesAlert({ from, to, date, vehicleType }: NoVehiclesAlertProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notifyOptions, setNotifyOptions] = useState({
    exactMatch: true,
    similarVehicles: false,
    priceDrops: false,
  })

  const handleCreateAlert = () => {
    // Here you would integrate with your notification system
    console.log("Alert created for:", { from, to, date, vehicleType, email, phone, notifyOptions })

    // Show success message
    toast({
      title: "Alert created successfully",
      description: "We'll notify you when matching vehicles become available.",
    })

    setIsDialogOpen(false)
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-8 relative w-64 h-64">
        <SleepingDriverIllustration />
      </div>

      <h2 className="text-3xl font-bold text-teal-800 mb-2">No vehicles available yet.</h2>
      <p className="text-xl text-teal-800 mb-8 max-w-md">Create an alert to get notified of upcoming vehicles.</p>

      <Button
        size="lg"
        onClick={() => setIsDialogOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-6 text-lg"
      >
        Create a vehicle alert
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Alert</DialogTitle>
            <DialogDescription>
              Get notified when vehicles matching your requirements become available.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Route:</span>
                <span>
                  {from} → {to}
                </span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Date:</span>
                <span>{date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Vehicle Type:</span>
                <span>{vehicleType}</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Notification preferences</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="exactMatch"
                  checked={notifyOptions.exactMatch}
                  onCheckedChange={(checked) => setNotifyOptions({ ...notifyOptions, exactMatch: checked as boolean })}
                />
                <Label htmlFor="exactMatch">Exact match for my requirements</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="similarVehicles"
                  checked={notifyOptions.similarVehicles}
                  onCheckedChange={(checked) =>
                    setNotifyOptions({ ...notifyOptions, similarVehicles: checked as boolean })
                  }
                />
                <Label htmlFor="similarVehicles">Similar vehicle types</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="priceDrops"
                  checked={notifyOptions.priceDrops}
                  onCheckedChange={(checked) => setNotifyOptions({ ...notifyOptions, priceDrops: checked as boolean })}
                />
                <Label htmlFor="priceDrops">Price drops on this route</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateAlert} className="bg-blue-500 hover:bg-blue-600">
              <Bell className="mr-2 h-4 w-4" />
              Create Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
