export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  requirement: number
  category: "delivery" | "rating" | "eco" | "special"
  rarity: "common" | "rare" | "epic" | "legendary"
}

export const badges: Badge[] = [
  // Delivery Badges
  {
    id: "first_delivery",
    name: "First Mile",
    description: "Complete your first delivery",
    icon: "🚚",
    requirement: 1,
    category: "delivery",
    rarity: "common",
  },
  {
    id: "delivery_10",
    name: "Getting Started",
    description: "Complete 10 deliveries",
    icon: "📦",
    requirement: 10,
    category: "delivery",
    rarity: "common",
  },
  {
    id: "delivery_50",
    name: "Reliable Driver",
    description: "Complete 50 deliveries",
    icon: "⭐",
    requirement: 50,
    category: "delivery",
    rarity: "rare",
  },
  {
    id: "delivery_100",
    name: "Century Club",
    description: "Complete 100 deliveries",
    icon: "💯",
    requirement: 100,
    category: "delivery",
    rarity: "epic",
  },
  {
    id: "delivery_500",
    name: "Road Warrior",
    description: "Complete 500 deliveries",
    icon: "🏆",
    requirement: 500,
    category: "delivery",
    rarity: "legendary",
  },

  // Rating Badges
  {
    id: "rating_45",
    name: "Good Service",
    description: "Maintain 4.5+ rating",
    icon: "⭐",
    requirement: 4.5,
    category: "rating",
    rarity: "common",
  },
  {
    id: "rating_48",
    name: "Excellent Service",
    description: "Maintain 4.8+ rating",
    icon: "🌟",
    requirement: 4.8,
    category: "rating",
    rarity: "rare",
  },
  {
    id: "rating_49",
    name: "Outstanding Service",
    description: "Maintain 4.9+ rating",
    icon: "✨",
    requirement: 4.9,
    category: "rating",
    rarity: "epic",
  },

  // Eco Badges
  {
    id: "eco_warrior",
    name: "Eco Warrior",
    description: "Use eco-routes 10 times",
    icon: "🌱",
    requirement: 10,
    category: "eco",
    rarity: "rare",
  },
  {
    id: "fuel_saver",
    name: "Fuel Saver",
    description: "Save 100L+ fuel through eco-routing",
    icon: "⛽",
    requirement: 100,
    category: "eco",
    rarity: "epic",
  },

  // Special Badges
  {
    id: "clean_load",
    name: "Clean Load",
    description: "No damage reports in 25 deliveries",
    icon: "✅",
    requirement: 25,
    category: "special",
    rarity: "rare",
  },
  {
    id: "speed_demon",
    name: "Speed Demon",
    description: "Complete 10 urgent deliveries",
    icon: "⚡",
    requirement: 10,
    category: "special",
    rarity: "rare",
  },
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Complete 20 night deliveries",
    icon: "🦉",
    requirement: 20,
    category: "special",
    rarity: "rare",
  },
  {
    id: "return_master",
    name: "Return Master",
    description: "Complete 15 return trips",
    icon: "🔄",
    requirement: 15,
    category: "special",
    rarity: "epic",
  },
]

export function checkBadgeEligibility(driverStats: any): Badge[] {
  const earnedBadges: Badge[] = []

  badges.forEach((badge) => {
    switch (badge.category) {
      case "delivery":
        if (driverStats.totalDeliveries >= badge.requirement) {
          earnedBadges.push(badge)
        }
        break
      case "rating":
        if (driverStats.averageRating >= badge.requirement) {
          earnedBadges.push(badge)
        }
        break
      case "eco":
        if (badge.id === "eco_warrior" && driverStats.ecoRoutesUsed >= badge.requirement) {
          earnedBadges.push(badge)
        }
        if (badge.id === "fuel_saver" && driverStats.fuelSaved >= badge.requirement) {
          earnedBadges.push(badge)
        }
        break
      case "special":
        if (badge.id === "clean_load" && driverStats.cleanDeliveries >= badge.requirement) {
          earnedBadges.push(badge)
        }
        if (badge.id === "speed_demon" && driverStats.urgentDeliveries >= badge.requirement) {
          earnedBadges.push(badge)
        }
        if (badge.id === "night_owl" && driverStats.nightDeliveries >= badge.requirement) {
          earnedBadges.push(badge)
        }
        if (badge.id === "return_master" && driverStats.returnTrips >= badge.requirement) {
          earnedBadges.push(badge)
        }
        break
    }
  })

  return earnedBadges
}

export function getBadgeRarityColor(rarity: string) {
  switch (rarity) {
    case "common":
      return "bg-gray-100 text-gray-800 border-gray-300"
    case "rare":
      return "bg-blue-100 text-blue-800 border-blue-300"
    case "epic":
      return "bg-purple-100 text-purple-800 border-purple-300"
    case "legendary":
      return "bg-yellow-100 text-yellow-800 border-yellow-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-300"
  }
}
