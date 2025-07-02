"use client"

import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlaceCard } from "@/components/place-card"
import { MapView } from "@/components/map-view"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { ImageAutoSlider } from "@/components/ui/image-auto-slider"
import { useData } from "@/lib/shared-data"
import { useLanguage } from "@/components/language-provider"

export default function ExplorePage() {
  const { places } = useData()
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

  // Tourism-focused images for the slider
  const tourismImages = [
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Indian temple
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Heritage architecture
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Indian palace
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Traditional architecture
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Indian monument
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Cultural site
  ]

  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || place.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", label: "All Places", count: places.length },
    { id: "temple", label: "Temples", count: places.filter((p) => p.category === "temple").length },
    { id: "hotel", label: "Hotels", count: places.filter((p) => p.category === "hotel").length },
    { id: "event", label: "Events", count: places.filter((p) => p.category === "event").length },
  ]

  const tabsData = categories.map((category) => ({
    id: category.id,
    label: category.label,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {category.count} {category.label.toLowerCase()} available
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlaces
            .filter((place) => category.id === "all" || place.category === category.id)
            .slice(0, 6)
            .map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
        </div>
      </div>
    ),
  }))

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <div className="relative h-96 overflow-hidden">
        <ImageAutoSlider images={tourismImages} speed={25} className="h-96" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="text-center text-white space-y-4 max-w-2xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold">{t("Explore Hubballi-Dharwad")}</h1>
            <p className="text-lg md:text-xl text-gray-200">
              {t("Discover ancient temples, traditional hotels, and vibrant events")}
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                placeholder={t("Search places...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/90 text-black"
              />
              <Button size="icon" className="bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{t("Discover Places")}</h2>
              <p className="text-muted-foreground">
                {filteredPlaces.length} {t("places found")}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}>
                Grid View
              </Button>
              <Button variant={viewMode === "map" ? "default" : "outline"} onClick={() => setViewMode("map")}>
                <MapPin className="h-4 w-4 mr-2" />
                Map View
              </Button>
            </div>
          </div>
        </div>

        {/* Expandable Tabs Filter */}
        <div className="mb-8">
          <ExpandableTabs tabs={tabsData} defaultTab="all" onTabChange={(tabId) => setSelectedCategory(tabId)} />
        </div>

        {/* Content */}
        {viewMode === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="h-96 rounded-lg overflow-hidden">
            <MapView places={filteredPlaces} />
          </div>
        )}

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t("No places found matching your criteria.")}</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="mt-4"
            >
              {t("Clear Filters")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
