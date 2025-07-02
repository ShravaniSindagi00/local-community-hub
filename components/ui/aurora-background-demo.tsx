"use client"

import { motion } from "framer-motion"
import type React from "react"
import { AuroraBackground } from "./aurora-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Calendar, TrendingUp } from "lucide-react"

interface AuroraBackgroundDemoProps {
  children?: React.ReactNode
  title?: string
  subtitle?: string
  showDefaultContent?: boolean
}

export function AuroraBackgroundDemo({
  children,
  title = "Welcome to Your Dashboard",
  subtitle = "Discover and manage your favorite places in Hubballi-Dharwad",
  showDefaultContent = true,
}: AuroraBackgroundDemoProps) {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 w-full max-w-7xl mx-auto"
      >
        {children ? (
          children
        ) : showDefaultContent ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="text-3xl md:text-7xl font-bold dark:text-white text-center mb-4">{title}</div>
              <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 max-w-3xl mx-auto">
                {subtitle}
              </div>
            </div>

            {/* Dashboard Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
              <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saved Places</CardTitle>
                  <Heart className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Places Visited</CardTitle>
                  <MapPin className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">+1 this month</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">2 upcoming</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="w-full max-w-4xl bg-white/80 dark:bg-black/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest interactions with places and events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div>
                    <p className="font-medium">Saved Chandramouleshwara Temple</p>
                    <p className="text-sm text-muted-foreground">Ancient temple in Unkal, Hubballi</p>
                  </div>
                  <Badge variant="secondary">2 hours ago</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div>
                    <p className="font-medium">Visited Kamat Hotel</p>
                    <p className="text-sm text-muted-foreground">Traditional South Indian cuisine</p>
                  </div>
                  <Badge variant="secondary">1 day ago</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div>
                    <p className="font-medium">Registered for Dharwad Utsav</p>
                    <p className="text-sm text-muted-foreground">Cultural festival in February</p>
                  </div>
                  <Badge variant="secondary">3 days ago</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="bg-black dark:bg-white dark:text-black text-white px-8 py-3">
                Explore New Places
              </Button>
              <Button variant="outline" className="px-8 py-3 bg-white/20 backdrop-blur-sm border-white/30">
                View My Saved Places
              </Button>
            </div>
          </>
        ) : null}
      </motion.div>
    </AuroraBackground>
  )
}
