"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Place {
  id: string
  name: { en: string; kn: string }
  category: "temple" | "hotel" | "event"
  description: string
  location: string
  images: string[]
  coordinates?: { lat: number; lng: number }
  timings?: string
  highlights: string[]
  history?: string
  culturalSignificance?: string
  status: "published" | "draft"
  createdAt: string
  updatedAt: string
  createdBy: string
  // Event specific fields
  date?: string
  endDate?: string
  // Hotel specific fields
  cuisine?: string
  priceRange?: string
  // Temple specific fields
  deity?: string
  architecture?: string
}

// Initial mock data
const initialPlaces: Place[] = [
  {
    id: "1",
    name: { en: "Chandramouleshwara Temple", kn: "ಚಂದ್ರಮೌಳೇಶ್ವರ ದೇವಸ್ಥಾನ" },
    category: "temple",
    description: "Ancient Shiva temple with beautiful architecture",
    location: "Unkal, Hubballi",
    images: ["/placeholder.svg?height=400&width=600"],
    coordinates: { lat: 15.3647, lng: 75.124 },
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    highlights: ["Ancient architecture", "Stone carvings", "Peaceful atmosphere"],
    history: "Built in the 12th century during the Chalukyan period",
    culturalSignificance: "Important pilgrimage site for devotees",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    createdBy: "admin",
    deity: "Lord Shiva",
    architecture: "Chalukyan",
  },
  {
    id: "2",
    name: { en: "Kamat Hotel", kn: "ಕಾಮತ್ ಹೋಟೆಲ್" },
    category: "hotel",
    description: "Traditional South Indian cuisine since 1950",
    location: "Station Road, Hubballi",
    images: ["/placeholder.svg?height=400&width=600"],
    timings: "7:00 AM - 10:30 PM",
    highlights: ["Traditional recipes", "Family-run since 1950", "Authentic cuisine"],
    history: "Started by the Kamat family in 1950",
    culturalSignificance: "Represents culinary heritage of the region",
    status: "published",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
    createdBy: "admin",
    cuisine: "South Indian",
    priceRange: "₹100-300",
  },
  {
    id: "3",
    name: { en: "Dharwad Utsav", kn: "ಧಾರವಾಡ ಉತ್ಸವ" },
    category: "event",
    description: "Annual cultural festival celebrating local arts",
    location: "Various venues across Dharwad",
    images: ["/placeholder.svg?height=400&width=600"],
    highlights: ["Classical music concerts", "Dance performances", "Local craft exhibitions"],
    history: "Started in 1980, grown to become major cultural event",
    culturalSignificance: "Showcases rich musical traditions of North Karnataka",
    status: "published",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
    createdBy: "admin",
    date: "2024-02-15",
    endDate: "2024-02-20",
  },
]

interface DataContextType {
  places: Place[]
  addPlace: (place: Omit<Place, "id" | "createdAt" | "updatedAt">) => Place
  updatePlace: (id: string, updates: Partial<Place>) => Place | null
  deletePlace: (id: string) => boolean
  getPlaceById: (id: string) => Place | null
  getPlacesByCategory: (category: string) => Place[]
  getPublishedPlaces: () => Place[]
  getStats: () => {
    total: number
    temples: number
    hotels: number
    events: number
    published: number
    draft: number
  }
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([])

  // Load initial data on mount
  useEffect(() => {
    setPlaces(initialPlaces)
  }, [])

  const addPlace = (placeData: Omit<Place, "id" | "createdAt" | "updatedAt">): Place => {
    const newPlace: Place = {
      ...placeData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setPlaces((prev) => [...prev, newPlace])
    return newPlace
  }

  const updatePlace = (id: string, updates: Partial<Place>): Place | null => {
    let updatedPlace: Place | null = null

    setPlaces((prev) =>
      prev.map((place) => {
        if (place.id === id) {
          updatedPlace = {
            ...place,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
          return updatedPlace
        }
        return place
      }),
    )

    return updatedPlace
  }

  const deletePlace = (id: string): boolean => {
    let deleted = false

    setPlaces((prev) => {
      const newPlaces = prev.filter((place) => {
        if (place.id === id) {
          deleted = true
          return false
        }
        return true
      })
      return newPlaces
    })

    return deleted
  }

  const getPlaceById = (id: string): Place | null => {
    return places.find((place) => place.id === id) || null
  }

  const getPlacesByCategory = (category: string): Place[] => {
    return places.filter((place) => place.category === category)
  }

  const getPublishedPlaces = (): Place[] => {
    return places.filter((place) => place.status === "published")
  }

  const getStats = () => {
    return {
      total: places.length,
      temples: places.filter((p) => p.category === "temple").length,
      hotels: places.filter((p) => p.category === "hotel").length,
      events: places.filter((p) => p.category === "event").length,
      published: places.filter((p) => p.status === "published").length,
      draft: places.filter((p) => p.status === "draft").length,
    }
  }

  return (
    <DataContext.Provider
      value={{
        places,
        addPlace,
        updatePlace,
        deletePlace,
        getPlaceById,
        getPlacesByCategory,
        getPublishedPlaces,
        getStats,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
