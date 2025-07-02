"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Calendar, TrendingUp, Plus, Eye } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useData } from "@/lib/shared-data"
import { ExploreCategoriesSection } from "@/components/explore-categories-section"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  const { getPublishedPlaces } = useData()

  const publishedPlaces = getPublishedPlaces()
  const userBookmarks = user?.bookmarks || []
  const savedPlaces = publishedPlaces.filter((place) => userBookmarks.includes(place.id))

  // Mock user activity data
  const userStats = {
    savedPlaces: savedPlaces.length,
    placesVisited: Math.floor(savedPlaces.length * 0.6),
    eventsAttended: publishedPlaces.filter((p) => p.category === "event").length > 0 ? 2 : 0,
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-8 items-center justify-center w-full max-w-7xl mx-auto"
        >
          {/* Welcome Header */}
          <div className="text-center">
            <div className="text-3xl md:text-6xl font-bold dark:text-white text-center mb-4">
              Welcome back, {user?.name?.split(" ")[0] || "Explorer"}!
            </div>
            <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 max-w-3xl mx-auto">
              Continue your journey through the heritage and culture of Hubballi-Dharwad
            </div>
          </div>

          {/* Dashboard Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-white/20 hover:bg-white/90 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Places</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.savedPlaces}</div>
                <p className="text-xs text-muted-foreground">
                  {userStats.savedPlaces > 0 ? "Keep exploring!" : "Start saving places you love"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-white/20 hover:bg-white/90 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Places Visited</CardTitle>
                <MapPin className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.placesVisited}</div>
                <p className="text-xs text-muted-foreground">
                  {userStats.placesVisited > 0 ? "Great exploration!" : "Start your journey"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-white/20 hover:bg-white/90 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.eventsAttended}</div>
                <p className="text-xs text-muted-foreground">
                  {publishedPlaces.filter((p) => p.category === "event").length} upcoming events
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Saved Places */}
          <Card className="w-full max-w-4xl bg-white/80 dark:bg-black/40 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Your Saved Places
              </CardTitle>
              <CardDescription>Places you've bookmarked for future visits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedPlaces.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">You haven't saved any places yet.</p>
                  <Link href="/explore">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Start Exploring
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {savedPlaces.slice(0, 3).map((place) => (
                    <div
                      key={place.id}
                      className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{place.name.en}</p>
                        <p className="text-sm text-muted-foreground">{place.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{place.category}</Badge>
                        <Link
                          href={`/${place.category === "temple" ? "temples" : place.category === "hotel" ? "hotels" : "events"}/${place.id}`}
                        >
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                  {savedPlaces.length > 3 && (
                    <div className="text-center pt-4">
                      <Link href="/history">
                        <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30">
                          View All {savedPlaces.length} Saved Places
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Explore Categories Section with Gradient Cards */}
      <ExploreCategoriesSection />

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
          <Link href="/explore" className="block">
            <Button className="w-full h-16 bg-black dark:bg-white dark:text-black text-white hover:bg-gray-800 dark:hover:bg-gray-200">
              <div className="text-center">
                <MapPin className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">Explore Places</span>
              </div>
            </Button>
          </Link>

          <Link href="/history" className="block">
            <Button
              variant="outline"
              className="w-full h-16 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
            >
              <div className="text-center">
                <Heart className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">My Saved Places</span>
              </div>
            </Button>
          </Link>

          <Link href="/explore/events" className="block">
            <Button
              variant="outline"
              className="w-full h-16 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
            >
              <div className="text-center">
                <Calendar className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">Upcoming Events</span>
              </div>
            </Button>
          </Link>

          <Link href="/about" className="block">
            <Button
              variant="outline"
              className="w-full h-16 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
            >
              <div className="text-center">
                <TrendingUp className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">About Platform</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
