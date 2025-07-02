import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { TourismFooter } from "@/components/tourism-footer"
import { LanguageProvider } from "@/components/language-provider"
import { AuthProvider } from "@/components/auth-provider"
import { DataProvider } from "@/lib/shared-data"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hubballi-Dharwad Explore | Discover Local Heritage",
  description:
    "Discover ancient temples, traditional hotels, and local events in Hubballi-Dharwad. Your complete guide to local heritage and culture.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          <AuthProvider>
            <LanguageProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <TourismFooter />
              </div>
              <Toaster position="top-right" />
            </LanguageProvider>
          </AuthProvider>
        </DataProvider>
      </body>
    </html>
  )
}
