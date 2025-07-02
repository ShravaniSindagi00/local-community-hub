"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Calendar } from "lucide-react"
import { useLanguage } from "./language-provider"
import { BookmarkButton } from "./bookmark-button"

interface Place {
  id: string
  name: { en: string; kn: string }
  category: string
  description: string
  image: string
  location: string
  rating?: number
  date?: string
}

interface PlaceCardProps {
  place: Place
}

export function PlaceCard({ place }: PlaceCardProps) {
  const { language } = useLanguage()

  const getCategoryPath = (category: string) => {
    switch (category) {
      case "temple":
        return "temples"
      case "hotel":
        return "hotels"
      case "event":
        return "events"
      default:
        return "explore"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "temple":
        return "Temple"
      case "hotel":
        return "Restaurant"
      case "event":
        return "Event"
      default:
        return category
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={place.image || "/placeholder.svg"}
          alt={place.name[language]}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 left-2" variant="secondary">
          {getCategoryLabel(place.category)}
        </Badge>
        {place.rating && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{place.rating}</span>
          </div>
        )}
        <div className="absolute bottom-2 right-2">
          <BookmarkButton
            placeId={place.id}
            placeName={place.name[language]}
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
            showText={false}
          />
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight">
          {place.name[language]}
          {language === "en" && place.name.kn && (
            <span className="block text-sm text-muted-foreground font-normal mt-1">{place.name.kn}</span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription className="mb-4 line-clamp-2">{place.description}</CardDescription>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{place.location}</span>
          </div>
          {place.date && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(place.date).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <Link href={`/${getCategoryPath(place.category)}/${place.id}`} className="flex-1">
            <InteractiveHoverButton text="View Details" className="w-full h-12 text-sm" />
          </Link>
          <BookmarkButton
            placeId={place.id}
            placeName={place.name[language]}
            variant="outline"
            size="icon"
            showText={false}
          />
        </div>
      </CardContent>
    </Card>
  )
}
