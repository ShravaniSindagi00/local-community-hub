"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapView } from "@/components/map-view"
import { PlaceCard } from "@/components/place-card"
import { useLanguage } from "@/components/language-provider"
import { useData } from "@/lib/shared-data"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Building, Utensils, Calendar, Grid3X3 } from "lucide-react"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const { language, translations } = useLanguage()
  const { getPublishedPlaces } = useData()

  // Only show published places to users
  const publishedPlaces = getPublishedPlaces()

  const filteredPlaces = publishedPlaces.filter((place) => {
    const matchesSearch =
      place.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.name.kn.includes(searchQuery) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "all" || place.category === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{translations.explore.title}</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={translations.explore.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <ExpandableTabs
            tabs={[
              { title: `All (${publishedPlaces.length})`, icon: Grid3X3 },
              { title: `Temples (${publishedPlaces.filter((p) => p.category === "temple").length})`, icon: Building },
              { title: `Hotels (${publishedPlaces.filter((p) => p.category === "hotel").length})`, icon: Utensils },
              { title: `Events (${publishedPlaces.filter((p) => p.category === "event").length})`, icon: Calendar },
            ]}
            onChange={(index) => {
              if (index !== null) {
                const filterValues = ["all", "temple", "hotel", "event"]
                setActiveFilter(filterValues[index])
              }
            }}
            className="bg-white/80 backdrop-blur-sm border-white/20"
          />
        </div>

        {/* View Toggle */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "map")}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            {filteredPlaces.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">
                  {searchQuery || activeFilter !== "all" ? "No places found" : "No places available"}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery || activeFilter !== "all"
                    ? "Try adjusting your search or filters."
                    : "New places will appear here once they are added by administrators."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <MapView places={filteredPlaces} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
