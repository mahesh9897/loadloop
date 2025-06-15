"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Load {
  id: string
  title: string
  from: string
  to: string
  date: string
  weight: string
  vehicleType: string
  budget: string
  status: "pending" | "in-transit" | "completed"
  bids: number
  rating?: number
}

interface LoadsContextType {
  activeLoads: Load[]
  completedLoads: Load[]
  addLoad: (load: Omit<Load, "id" | "status" | "bids">) => void
  completeLoad: (id: string, rating: number) => void
}

const LoadsContext = createContext<LoadsContextType | undefined>(undefined)

export function LoadsProvider({ children }: { children: React.ReactNode }) {
  const [activeLoads, setActiveLoads] = useState<Load[]>([])
  const [completedLoads, setCompletedLoads] = useState<Load[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const storedActiveLoads = localStorage.getItem("activeLoads")
    const storedCompletedLoads = localStorage.getItem("completedLoads")

    if (storedActiveLoads) {
      setActiveLoads(JSON.parse(storedActiveLoads))
    }

    if (storedCompletedLoads) {
      setCompletedLoads(JSON.parse(storedCompletedLoads))
    }
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("activeLoads", JSON.stringify(activeLoads))
  }, [activeLoads])

  useEffect(() => {
    localStorage.setItem("completedLoads", JSON.stringify(completedLoads))
  }, [completedLoads])

  const addLoad = (load: Omit<Load, "id" | "status" | "bids">) => {
    const newLoad: Load = {
      ...load,
      id: `load-${Date.now()}`,
      status: "pending",
      bids: 0,
    }

    setActiveLoads((prev) => [newLoad, ...prev])
  }

  const completeLoad = (id: string, rating: number) => {
    const loadToComplete = activeLoads.find((load) => load.id === id)

    if (loadToComplete) {
      // Remove from active loads
      setActiveLoads((prev) => prev.filter((load) => load.id !== id))

      // Add to completed loads with rating
      setCompletedLoads((prev) => [{ ...loadToComplete, status: "completed", rating }, ...prev])
    }
  }

  return (
    <LoadsContext.Provider value={{ activeLoads, completedLoads, addLoad, completeLoad }}>
      {children}
    </LoadsContext.Provider>
  )
}

export function useLoads() {
  const context = useContext(LoadsContext)
  if (context === undefined) {
    throw new Error("useLoads must be used within a LoadsProvider")
  }
  return context
}
