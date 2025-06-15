"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Truck, Phone, MapPin, Camera, Paperclip } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Message {
  id: number
  sender: "user" | "driver"
  message: string
  timestamp: string
  type: "text" | "image" | "location"
  imageUrl?: string
  location?: { lat: number; lng: number; address: string }
}

export default function ChatPage() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "driver",
      message: "Hello! I have picked up your goods from Mumbai. Starting the journey to Delhi now.",
      timestamp: "2:30 PM",
      type: "text",
    },
    {
      id: 2,
      sender: "user",
      message: "Great! Please handle the electronics carefully as they are fragile.",
      timestamp: "2:32 PM",
      type: "text",
    },
    {
      id: 3,
      sender: "driver",
      message: "I will take extra care. Currently stopped for fuel near Nashik.",
      timestamp: "4:15 PM",
      type: "text",
    },
    {
      id: 4,
      sender: "driver",
      message: "",
      timestamp: "4:16 PM",
      type: "location",
      location: { lat: 19.9975, lng: 73.7898, address: "Nashik, Maharashtra" },
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "user",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }
      setMessages([...messages, message])
      setNewMessage("")

      // Simulate driver response after 2 seconds
      setTimeout(() => {
        const driverResponse: Message = {
          id: messages.length + 2,
          sender: "driver",
          message: "Thanks for the message! I will keep you updated.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "text",
        }
        setMessages((prev) => [...prev, driverResponse])
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  const renderMessage = (message: Message) => {
    const isUser = message.sender === "user"

    return (
      <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          {message.type === "text" && <p className="text-sm">{message.message}</p>}

          {message.type === "location" && message.location && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Current Location</span>
              </div>
              <p className="text-xs">{message.location.address}</p>
              <Button size="sm" variant={isUser ? "secondary" : "default"} className="text-xs">
                View on Map
              </Button>
            </div>
          )}

          {message.type === "image" && message.imageUrl && (
            <div className="space-y-2">
              <img
                src={message.imageUrl || "/placeholder.svg"}
                alt="Shared image"
                className="rounded max-w-full h-auto"
              />
              {message.message && <p className="text-sm">{message.message}</p>}
            </div>
          )}

          <p className={`text-xs mt-1 ${isUser ? "text-blue-100" : "text-gray-500"}`}>{message.timestamp}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/sender/track-shipment" className="flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tracking
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h1 className="font-semibold">Rajesh Kumar</h1>
                  <p className="text-sm text-gray-600">MH 01 AB 1234</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{t("chatWithDriver")}</CardTitle>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map(renderMessage)}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4" />
                </Button>
                <Input
                  placeholder={t("typeMessage")}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
