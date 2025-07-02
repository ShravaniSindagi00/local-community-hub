"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { BookmarkButton } from "@/components/bookmark-button"
import { Heart, MapPin, Calendar, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for places (in a real app, this would come from your database)
const mockPlaces = {
  "1": {
    id: "1",
    name: { en: "Chandramouleshwara Temple", kn: "ಚಂದ್ರಮೌಳೇಶ್ವರ ದೇವಸ್ಥಾನ" },
    category: "temple",
    description: "Ancient Shiva temple with beautiful architecture",
    image: "/placeholder.svg?height=200&width=300",
    location: "Unkal, Hubballi",
    rating: 4.5,
  },
  "2": {
    id: "2",
    name: { en: "Kamat Hotel", kn: "ಕಾಮತ್ ಹೋಟೆಲ್" },
    category: "hotel",
    description: "Traditional South Indian cuisine since 1950",
    image: "/placeholder.svg?height=200&width=300",
    location: "Station Road, Hubballi",
    rating: 4.2,
  },
  "3": {
    id: "3",
    name: { en: "Dharwad Utsav", kn: "ಧಾರವಾಡ ಉತ್ಸವ" },
    category: "event",
    description: "Annual cultural festival celebrating local arts",
    image: "/placeholder.svg?height=200&width=300",
    location: "Dharwad",
    rating: 4.8,
    date: "2024-02-15",
  },
  "4": {
    id: "4",
    name: { en: "Siddheshwar Temple", kn: "ಸಿದ್ಧೇಶ್ವರ ದೇವಸ್ಥಾನ" },
    category: "temple",
    description: "Historic temple dedicated to Lord Shiva",
    image: "/placeholder.svg?height=200&width=300",
    location: "Dharwad",
    rating: 4.6,
  },
  "5": {
    id: "5",
    name: { en: "Naveen Hotel", kn: "ನವೀನ್ ಹೋಟೆಲ್" },
    category: "hotel",
    description: "Famous for authentic North Karnataka cuisine",
    image: "/placeholder.svg?height=200&width=300",
    location: "Dharwad",
    rating: 4.3,
  },
}

export default function HistoryPage() {
  const { user, isBookmarked, removeBookmark } = useAuth()
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Get bookmarked place IDs
    let bookmarkIds: string[] = []

    if (user) {
      bookmarkIds = user.bookmarks
    } else {
      bookmarkIds = JSON.parse(localStorage.getItem("guestBookmarks") || "[]")
    }

    // Get place details for bookmarked IDs
    const places = bookmarkIds
      .map((id) => mockPlaces[id as keyof typeof mockPlaces])
      .filter(Boolean)
      .sort((a, b) => a.name.en.localeCompare(b.name.en))

    setBookmarkedPlaces(places)
  }, [user])

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

  const filterPlacesByCategory = (category: string) => {
    if (category === "all") return bookmarkedPlaces
    return bookmarkedPlaces.filter((place) => place.category === category)
  }

  const temples = filterPlacesByCategory("temple")
  const hotels = filterPlacesByCategory("hotel")
  const events = filterPlacesByCategory("event")

  const PlaceCard = ({ place }: { place: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={place.image || "/placeholder.svg"}
          alt={place.name.en}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 left-2" variant="secondary">
          {getCategoryLabel(place.category)}
        </Badge>
        <div className="absolute top-2 right-2">
          <BookmarkButton
            placeId={place.id}
            placeName={place.name.en}
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
            showText={false}
          />
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight">
          {place.name.en}
          <span className="block text-sm text-muted-foreground font-normal mt-1">{place.name.kn}</span>
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

        <div className="flex gap-2">
          <Link href={`/${getCategoryPath(place.category)}/${place.id}`} className="flex-1">
            <Button className="w-full">View Details</Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={() => removeBookmark(place.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const EmptyState = ({ category }: { category: string }) => (
    <div className="text-center py-12">
      <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">No {category === "all" ? "saved places" : category} yet</h3>
      <p className="text-muted-foreground mb-6">
        {category === "all"
          ? "Start exploring and save your favorite places to see them here."
          : `You haven't saved any ${category} yet. Explore and save your favorites!`}
      </p>
      <Link href="/explore">
        <Button>Start Exploring</Button>
      </Link>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Saved Places</h1>
          <p className="text-muted-foreground">
            {user
              ? "Your favorite temples, hotels, and events saved to your account."
              : "Your temporarily saved places. Login to sync across devices."}
          </p>
          {!user && bookmarkedPlaces.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>💡 Tip:</strong> Login to sync your saved places across all your devices and never lose them!
              </p>
              <Link href="/auth/signin" className="inline-block mt-2">
                <Button size="sm">Login Now</Button>
              </Link>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All ({bookmarkedPlaces.length})</TabsTrigger>
            <TabsTrigger value="temple">Temples ({temples.length})</TabsTrigger>
            <TabsTrigger value="hotel">Hotels ({hotels.length})</TabsTrigger>
            <TabsTrigger value="event">Events ({events.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {bookmarkedPlaces.length === 0 ? (
              <EmptyState category="all" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="temple" className="mt-6">
            {temples.length === 0 ? (
              <EmptyState category="temples" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {temples.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hotel" className="mt-6">
            {hotels.length === 0 ? (
              <EmptyState category="hotels" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="event" className="mt-6">
            {events.length === 0 ? (
              <EmptyState category="events" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {bookmarkedPlaces.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              {bookmarkedPlaces.length} place{bookmarkedPlaces.length !== 1 ? "s" : ""} saved
              {user ? " to your account" : " locally"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
