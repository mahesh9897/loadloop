import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { LoadsProvider } from "@/contexts/loads-context"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LoadLoop - Connect. Transport. Deliver.",
  description: "Logistics platform connecting goods senders with drivers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            <LoadsProvider>{children}</LoadsProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
