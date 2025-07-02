import { notFound } from "next/navigation"
import { DetailPage } from "@/components/detail-page"

const mockHotels = {
  "2": {
    id: "2",
    name: { en: "Kamat Hotel", kn: "ಕಾಮತ್ ಹೋಟೆಲ್" },
    category: "hotel",
    description:
      "Kamat Hotel has been serving authentic South Indian cuisine since 1950. Known for its traditional recipes and warm hospitality, this family-run restaurant is a local institution.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    location: "Station Road, Hubballi",
    coordinates: { lat: 15.3647, lng: 75.124 },
    timings: "Open: 7:00 AM - 10:30 PM",
    highlights: ["Traditional recipes", "Family-run since 1950", "Authentic South Indian cuisine"],
    history:
      "Started by the Kamat family in 1950, this restaurant has been serving the community for over 70 years. The recipes have been passed down through generations.",
    culturalSignificance:
      "This restaurant represents the culinary heritage of the region and has been a meeting place for locals and visitors alike.",
  },
}

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const hotel = mockHotels[params.id as keyof typeof mockHotels]

  if (!hotel) {
    notFound()
  }

  return <DetailPage place={hotel} />
}
