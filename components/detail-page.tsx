"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star, ChevronLeft, ChevronRight, Share2 } from "lucide-react"
import { useLanguage } from "./language-provider"
import { BookmarkButton } from "./bookmark-button"

interface Place {
  id: string
  name: { en: string; kn: string }
  category: string
  description: string
  images: string[]
  location: string
  coordinates: { lat: number; lng: number }
  timings: string
  highlights: string[]
  history: string
  culturalSignificance: string
}

interface DetailPageProps {
  place: Place
}

export function DetailPage({ place }: DetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { language } = useLanguage()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % place.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + place.images.length) % place.images.length)
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">{getCategoryLabel(place.category)}</Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">4.5</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">{place.name[language]}</h1>
          {language === "en" && place.name.kn && <p className="text-xl text-muted-foreground mb-4">{place.name.kn}</p>}

          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{place.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{place.timings}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative">
            <Image
              src={place.images[currentImageIndex] || "/placeholder.svg"}
              alt={place.name[language]}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />

            {place.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {place.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              {currentImageIndex + 1} of {place.images.length}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <BookmarkButton placeId={place.id} placeName={place.name[language]} variant="outline" size="sm" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{place.description}</p>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {place.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* History */}
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{place.history}</p>
              </CardContent>
            </Card>

            {/* Cultural Significance */}
            <Card>
              <CardHeader>
                <CardTitle>Cultural Significance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{place.culturalSignificance}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <BookmarkButton
                  placeId={place.id}
                  placeName={place.name[language]}
                  variant="outline"
                  className="w-full bg-transparent"
                />
                <Button variant="outline" className="w-full bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive map would be here</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{place.location}</p>
                <Button variant="outline" className="w-full mt-3 bg-transparent">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            {/* Timings */}
            <Card>
              <CardHeader>
                <CardTitle>Timings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{place.timings}</p>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  For more information, please contact local authorities or visit in person.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
