"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Filter, Grid3X3, Map, Clock, Building, Utensils, Calendar, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceCard } from "@/components/place-card"
import { MapView } from "@/components/map-view"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { ImageAutoSlider } from "@/components/ui/image-auto-slider"
import { useData } from "@/lib/shared-data"
import { useLanguage } from "@/components/language-provider"

export default function ExplorePage() {
  const { places } = useData()
  // `useLanguage` currently gives us the raw translations object rather than a t() helper.
  const { translations } = useLanguage()

  // Minimal helper: try to look-up the key, otherwise just echo it.
  const t = (key: string): string =>
    // @ts-ignore – translations can be nested; for flat keys this is fine
    // eslint-disable-next-line  @typescript-eslint/consistent-type-assertions
    (translations as Record<string, string>)[key] ?? key

  /* ---------- state ---------- */
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"temple" | "hotel" | "event" | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [showFilters, setShowFilters] = useState(false)

  /* ---------- static data ---------- */
  const heroImages = [
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0",
  ]

  const tabs = [
    { title: "All Places", icon: MapPin },
    { title: "Saved", icon: Heart },
    { type: "separator" as const },
    { title: "Temples", icon: Building },
    { title: "Hotels", icon: Utensils },
    { title: "Events", icon: Calendar },
  ]

  const categoryKeys = ["temple", "hotel", "event"] as const
  const popularTags = ["Heritage", "Cultural", "Religious", "Modern", "Traditional", "Family-Friendly"]

  /* ---------- derived data ---------- */
  const filteredPlaces = places.filter((place) => {
    /* search by both language names + location */
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      place.name.en.toLowerCase().includes(term) ||
      place.name.kn.includes(term) ||
      place.location.toLowerCase().includes(term)

    const matchesCategory = !selectedCategory || place.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  /* ---------- handlers ---------- */
  const handleTabChange = (index: number | null) => {
    if (index === null) return
    const mapping: (typeof selectedCategory)[] = [null, null, null, "temple", "hotel", "event"]
    setSelectedCategory(mapping[index])
  }

  /* ---------- ui ---------- */
  return (
    <div className="min-h-screen bg-background">
      {/* hero */}
      <div className="relative h-96 mb-8">
        <ImageAutoSlider images={heroImages} speed={25} className="min-h-96" />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg">{t("Explore Hubballi-Dharwad")}</h1>
            <p className="text-lg md:text-xl mb-8 text-shadow-md max-w-2xl mx-auto">
              {t("Discover the rich heritage, vibrant culture, and hidden gems of the twin cities")}
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t("Search places, temples, hotels...")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/90 backdrop-blur-sm border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main container */}
      <div className="container mx-auto px-4">
        {/* nav tabs */}
        <div className="mb-8">
          <ExpandableTabs
            tabs={tabs}
            activeColor="text-primary"
            onChange={handleTabChange}
            className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg"
          />
        </div>

        {/* filters / view toggles */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t("Search places...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters((p) => !p)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {t("Filters")}
            </Button>

            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="rounded-none"
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* extra filter panel */}
        {showFilters && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">{t("Categories")}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(null)}
                    >
                      {t("All")}
                    </Badge>
                    {categoryKeys.map((cat) => (
                      <Badge
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "outline"}
                        className="cursor-pointer capitalize"
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {t(cat)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">{t("Popular Tags")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge key={tag} variant="outline" className="cursor-pointer">
                        {t(tag)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold capitalize">
              {selectedCategory ? t(selectedCategory) : t("All Places")}
            </h2>
            <Badge variant="secondary">
              {filteredPlaces.length} {t("places found")}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {t("Updated 2 hours ago")}
          </div>
        </div>

        {/* list / map */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="h-96 rounded-lg overflow-hidden">
            <MapView places={filteredPlaces} />
          </div>
        )}

        {/* empty state */}
        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">{t("No places found")}</h3>
            <p className="text-muted-foreground mb-4">{t("Try adjusting your search terms or filters")}</p>
            <RainbowButton
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory(null)
              }}
            >
              {t("Clear filters")}
            </RainbowButton>
          </div>
        )}

        {/* quick stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={Building}
            label={t("Sacred Temples")}
            count={places.filter((p) => p.category === "temple").length}
          />
          <StatsCard
            icon={Utensils}
            label={t("Comfortable Stays")}
            count={places.filter((p) => p.category === "hotel").length}
          />
          <StatsCard
            icon={Calendar}
            label={t("Cultural Events")}
            count={places.filter((p) => p.category === "event").length}
          />
        </div>
      </div>
    </div>
  )
}

/* ---- helper component ---- */
interface StatsCardProps {
  icon: React.ElementType
  label: string
  count: number
}

function StatsCard({ icon: Icon, label, count }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
        <div className="text-2xl font-bold">{count}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  )
}
