"use client"

import { Truck, Package } from "lucide-react"

interface UserTypeSelectorProps {
  onSelect: (type: "sender" | "driver") => void
  selectedType: "sender" | "driver" | null
}

export function UserTypeSelector({ onSelect, selectedType }: UserTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Sender Button - Dark Button */}
      <button
        type="button"
        className={`flex items-center justify-center py-3 px-4 rounded-md bg-gray-900 text-white transition-all duration-300
          hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-blue-400/50
          active:shadow-[0_0_20px_rgba(59,130,246,0.7)] active:shadow-blue-500/70
          ${selectedType === "sender" ? "ring-2 ring-blue-500" : ""}`}
        onClick={() => onSelect("sender")}
      >
        <Package className="w-5 h-5 mr-2" />
        <span className="font-medium">I Need to Send Goods</span>
      </button>

      {/* Driver Button - Light Button */}
      <button
        type="button"
        className={`flex items-center justify-center py-3 px-4 rounded-md bg-white border border-gray-200 text-gray-900 transition-all duration-300
          hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-blue-400/50
          active:shadow-[0_0_20px_rgba(59,130,246,0.7)] active:shadow-blue-500/70
          ${selectedType === "driver" ? "ring-2 ring-blue-500" : ""}`}
        onClick={() => onSelect("driver")}
      >
        <Truck className="w-5 h-5 mr-2" />
        <span className="font-medium">I'm a Driver</span>
      </button>
    </div>
  )
}
