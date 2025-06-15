"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Trophy, Target, TrendingUp } from "lucide-react"
import { badges, checkBadgeEligibility, getBadgeRarityColor } from "@/lib/gamification"

export default function BadgesPage() {
  // Mock driver stats - this would come from API
  const [driverStats] = useState({
    totalDeliveries: 127,
    averageRating: 4.8,
    ecoRoutesUsed: 15,
    fuelSaved: 120,
    cleanDeliveries: 30,
    urgentDeliveries: 12,
    nightDeliveries: 8,
    returnTrips: 18,
  })

  const earnedBadges = checkBadgeEligibility(driverStats)
  const unlockedBadgeIds = earnedBadges.map((b) => b.id)

  const getBadgeProgress = (badge: any) => {
    switch (badge.category) {
      case "delivery":
        return Math.min((driverStats.totalDeliveries / badge.requirement) * 100, 100)
      case "rating":
        return Math.min((driverStats.averageRating / badge.requirement) * 100, 100)
      case "eco":
        if (badge.id === "eco_warrior") {
          return Math.min((driverStats.ecoRoutesUsed / badge.requirement) * 100, 100)
        }
        if (badge.id === "fuel_saver") {
          return Math.min((driverStats.fuelSaved / badge.requirement) * 100, 100)
        }
        return 0
      case "special":
        if (badge.id === "clean_load") {
          return Math.min((driverStats.cleanDeliveries / badge.requirement) * 100, 100)
        }
        if (badge.id === "speed_demon") {
          return Math.min((driverStats.urgentDeliveries / badge.requirement) * 100, 100)
        }
        if (badge.id === "night_owl") {
          return Math.min((driverStats.nightDeliveries / badge.requirement) * 100, 100)
        }
        if (badge.id === "return_master") {
          return Math.min((driverStats.returnTrips / badge.requirement) * 100, 100)
        }
        return 0
      default:
        return 0
    }
  }

  const renderBadgeCard = (badge: any, isEarned: boolean) => {
    const progress = getBadgeProgress(badge)

    return (
      <Card
        key={badge.id}
        className={`transition-all ${isEarned ? "ring-2 ring-yellow-400 bg-yellow-50" : "opacity-75"}`}
      >
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className={`text-4xl ${isEarned ? "" : "grayscale"}`}>{badge.icon}</div>
            <div>
              <h3 className="font-semibold text-lg">{badge.name}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>

            <Badge className={getBadgeRarityColor(badge.rarity)}>{badge.rarity.toUpperCase()}</Badge>

            {!isEarned && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-gray-500">
                  {badge.category === "delivery" && `${driverStats.totalDeliveries}/${badge.requirement} deliveries`}
                  {badge.category === "rating" && `${driverStats.averageRating}/${badge.requirement} rating`}
                  {badge.category === "eco" &&
                    badge.id === "eco_warrior" &&
                    `${driverStats.ecoRoutesUsed}/${badge.requirement} eco routes`}
                  {badge.category === "eco" &&
                    badge.id === "fuel_saver" &&
                    `${driverStats.fuelSaved}L/${badge.requirement}L saved`}
                  {badge.category === "special" &&
                    badge.id === "clean_load" &&
                    `${driverStats.cleanDeliveries}/${badge.requirement} clean deliveries`}
                  {badge.category === "special" &&
                    badge.id === "speed_demon" &&
                    `${driverStats.urgentDeliveries}/${badge.requirement} urgent deliveries`}
                  {badge.category === "special" &&
                    badge.id === "night_owl" &&
                    `${driverStats.nightDeliveries}/${badge.requirement} night deliveries`}
                  {badge.category === "special" &&
                    badge.id === "return_master" &&
                    `${driverStats.returnTrips}/${badge.requirement} return trips`}
                </p>
              </div>
            )}

            {isEarned && (
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                ✨ Unlocked!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  const categoryStats = {
    delivery: badges.filter((b) => b.category === "delivery" && unlockedBadgeIds.includes(b.id)).length,
    rating: badges.filter((b) => b.category === "rating" && unlockedBadgeIds.includes(b.id)).length,
    eco: badges.filter((b) => b.category === "eco" && unlockedBadgeIds.includes(b.id)).length,
    special: badges.filter((b) => b.category === "special" && unlockedBadgeIds.includes(b.id)).length,
  }

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
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Driver Badges</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Achievement Badges</h2>
            <p className="text-gray-600">Unlock badges by completing deliveries and providing excellent service</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{earnedBadges.length}</div>
                <div className="text-sm text-gray-600">Total Badges</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{categoryStats.delivery}</div>
                <div className="text-sm text-gray-600">Delivery Badges</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{categoryStats.rating}</div>
                <div className="text-sm text-gray-600">Rating Badges</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{categoryStats.eco + categoryStats.special}</div>
                <div className="text-sm text-gray-600">Special Badges</div>
              </CardContent>
            </Card>
          </div>

          {/* Driver Level */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Driver Level</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-blue-600">Level {Math.floor(earnedBadges.length / 3) + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress to next level</span>
                    <span>{earnedBadges.length % 3}/3 badges</span>
                  </div>
                  <Progress value={(earnedBadges.length % 3) * 33.33} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges by Category */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Badges</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
              <TabsTrigger value="rating">Rating</TabsTrigger>
              <TabsTrigger value="eco">Eco</TabsTrigger>
              <TabsTrigger value="special">Special</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.map((badge) => renderBadgeCard(badge, unlockedBadgeIds.includes(badge.id)))}
              </div>
            </TabsContent>

            <TabsContent value="delivery">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges
                  .filter((badge) => badge.category === "delivery")
                  .map((badge) => renderBadgeCard(badge, unlockedBadgeIds.includes(badge.id)))}
              </div>
            </TabsContent>

            <TabsContent value="rating">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges
                  .filter((badge) => badge.category === "rating")
                  .map((badge) => renderBadgeCard(badge, unlockedBadgeIds.includes(badge.id)))}
              </div>
            </TabsContent>

            <TabsContent value="eco">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges
                  .filter((badge) => badge.category === "eco")
                  .map((badge) => renderBadgeCard(badge, unlockedBadgeIds.includes(badge.id)))}
              </div>
            </TabsContent>

            <TabsContent value="special">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges
                  .filter((badge) => badge.category === "special")
                  .map((badge) => renderBadgeCard(badge, unlockedBadgeIds.includes(badge.id)))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Next Goals */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Next Goals</span>
              </CardTitle>
              <CardDescription>Badges you're close to unlocking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {badges
                  .filter((badge) => !unlockedBadgeIds.includes(badge.id))
                  .filter((badge) => getBadgeProgress(badge) > 50)
                  .slice(0, 3)
                  .map((badge) => (
                    <div key={badge.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl">{badge.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{badge.name}</h4>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{badge.description}</span>
                          <span>{Math.round(getBadgeProgress(badge))}%</span>
                        </div>
                        <Progress value={getBadgeProgress(badge)} className="h-2" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
