import { notFound } from "next/navigation"
import { DetailPage } from "@/components/detail-page"

const mockEvents = {
  "3": {
    id: "3",
    name: { en: "Dharwad Utsav", kn: "ಧಾರವಾಡ ಉತ್ಸವ" },
    category: "event",
    description:
      "Dharwad Utsav is an annual cultural festival that celebrates the rich heritage and arts of the region. The festival features classical music, dance performances, and local crafts.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    location: "Various venues across Dharwad",
    coordinates: { lat: 15.4589, lng: 75.0078 },
    timings: "February 15-20, 2024 | Various timings",
    highlights: ["Classical music concerts", "Dance performances", "Local craft exhibitions"],
    history:
      "Started in 1980, Dharwad Utsav has grown to become one of the most important cultural events in Karnataka, attracting artists and visitors from across India.",
    culturalSignificance:
      "The festival showcases the rich musical and cultural traditions of North Karnataka and provides a platform for both established and emerging artists.",
  },
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = mockEvents[params.id as keyof typeof mockEvents]

  if (!event) {
    notFound()
  }

  return <DetailPage place={event} />
}
