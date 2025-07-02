// Mock database service - Replace with Firebase/Supabase implementation
import { v4 as uuidv4 } from "uuid"

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

// Mock data storage (replace with actual database)
const mockDatabase: Place[] = [
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

// Database operations
export const db = {
  // Create
  async create(data: Omit<Place, "id" | "createdAt" | "updatedAt">): Promise<Place> {
    const newPlace: Place = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockDatabase.push(newPlace)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return newPlace
  },

  // Read all
  async getAll(category?: string): Promise<Place[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (category) {
      return mockDatabase.filter((place) => place.category === category)
    }

    return [...mockDatabase]
  },

  // Read one
  async getById(id: string): Promise<Place | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    return mockDatabase.find((place) => place.id === id) || null
  },

  // Update
  async update(id: string, data: Partial<Omit<Place, "id" | "createdAt">>): Promise<Place | null> {
    const index = mockDatabase.findIndex((place) => place.id === id)

    if (index === -1) {
      return null
    }

    mockDatabase[index] = {
      ...mockDatabase[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return mockDatabase[index]
  },

  // Delete
  async delete(id: string): Promise<boolean> {
    const index = mockDatabase.findIndex((place) => place.id === id)

    if (index === -1) {
      return false
    }

    mockDatabase.splice(index, 1)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return true
  },

  // Get statistics
  async getStats(): Promise<{
    total: number
    temples: number
    hotels: number
    events: number
    published: number
    draft: number
  }> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const stats = {
      total: mockDatabase.length,
      temples: mockDatabase.filter((p) => p.category === "temple").length,
      hotels: mockDatabase.filter((p) => p.category === "hotel").length,
      events: mockDatabase.filter((p) => p.category === "event").length,
      published: mockDatabase.filter((p) => p.status === "published").length,
      draft: mockDatabase.filter((p) => p.status === "draft").length,
    }

    return stats
  },
}
