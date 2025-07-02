"use client"

import { useState } from "react"
import { Search, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlaceCard } from "@/components/place-card"
import { useLanguage } from "@/components/language-provider"
import { useData } from "@/lib/shared-data"
import Link from "next/link"

interface CategoryExplorePageProps {
  category: "temple" | "hotel" | "event"
}

export function CategoryExplorePage({ category }: CategoryExplorePageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { language } = useLanguage()
  const { getPublishedPlaces } = useData()

  // Get only published places for the specific category
  const allPlaces = getPublishedPlaces()
  const categoryPlaces = allPlaces.filter((place) => place.category === category)

  // Filter by search query
  const filteredPlaces = categoryPlaces.filter((place) => {
    const matchesSearch =
      place.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.name.kn.includes(searchQuery) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  // Category display information
  const categoryInfo = {
    temple: {
      title: "Explore Temples",
      subtitle: "Discover ancient temples and sacred places in Hubballi-Dharwad",
      description:
        "Explore centuries-old temples with rich history, beautiful architecture, and spiritual significance.",
      icon: "🏛️",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    hotel: {
      title: "Explore Hotels & Restaurants",
      subtitle: "Find the best traditional dining experiences in Hubballi-Dharwad",
      description: "Discover authentic local cuisine, family-run restaurants, and traditional hospitality.",
      icon: "🍽️",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    event: {
      title: "Explore Events",
      subtitle: "Join cultural festivals and local gatherings in Hubballi-Dharwad",
      description: "Experience vibrant cultural events, festivals, and community celebrations.",
      icon: "🎭",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  }

  const info = categoryInfo[category]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/explore">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Categories
          </Button>
        </Link>
      </div>

      {/* Header Section */}
      <div className={`${info.bgColor} rounded-lg p-8 mb-8`}>
        <div className="text-center">
          <div className="text-6xl mb-4">{info.icon}</div>
          <h1 className={`text-3xl md:text-4xl font-bold ${info.color} mb-4`}>{info.title}</h1>
          <p className="text-lg text-muted-foreground mb-2 max-w-2xl mx-auto">{info.subtitle}</p>
          <p className="text-muted-foreground max-w-3xl mx-auto">{info.description}</p>
          <div className="mt-6">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {filteredPlaces.length} {filteredPlaces.length === 1 ? "place" : "places"} found
            </Badge>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={`Search ${category === "temple" ? "temples" : category === "hotel" ? "hotels & restaurants" : "events"}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-8">
        {filteredPlaces.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-4">
              {searchQuery
                ? `No ${category === "temple" ? "temples" : category === "hotel" ? "hotels" : "events"} found`
                : `No ${category === "temple" ? "temples" : category === "hotel" ? "hotels" : "events"} available yet`}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery
                ? `Try adjusting your search terms or browse all categories.`
                : `New ${category === "temple" ? "temples" : category === "hotel" ? "hotels" : "events"} will appear here once they are added by administrators.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {searchQuery && (
                <Button variant="outline" onClick={() => setSearchQuery("")} className="bg-transparent">
                  Clear Search
                </Button>
              )}
              <Link href="/explore">
                <Button>Browse All Categories</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{searchQuery ? `Search Results` : `All ${info.title}`}</h2>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? `${filteredPlaces.length} results for "${searchQuery}"`
                    : `Showing ${filteredPlaces.length} ${category === "temple" ? "temples" : category === "hotel" ? "hotels & restaurants" : "events"}`}
                </p>
              </div>
              {searchQuery && (
                <Button variant="outline" onClick={() => setSearchQuery("")} size="sm" className="bg-transparent">
                  Clear Search
                </Button>
              )}
            </div>

            {/* Places Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Additional Information */}
      {filteredPlaces.length > 0 && (
        <div className={`${info.bgColor} rounded-lg p-6 mt-12`}>
          <div className="text-center">
            <h3 className={`text-xl font-semibold ${info.color} mb-2`}>Discover More</h3>
            <p className="text-muted-foreground mb-4">
              Explore other categories to get the complete Hubballi-Dharwad experience
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {category !== "temple" && (
                <Link href="/explore/temples">
                  <Button variant="outline" className="bg-white/50">
                    🏛️ Temples
                  </Button>
                </Link>
              )}
              {category !== "hotel" && (
                <Link href="/explore/hotels">
                  <Button variant="outline" className="bg-white/50">
                    🍽️ Hotels & Restaurants
                  </Button>
                </Link>
              )}
              {category !== "event" && (
                <Link href="/explore/events">
                  <Button variant="outline" className="bg-white/50">
                    🎭 Events
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
