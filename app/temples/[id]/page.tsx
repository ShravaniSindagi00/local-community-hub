import { notFound } from "next/navigation"
import { DetailPage } from "@/components/detail-page"

const mockTemples = {
  "1": {
    id: "1",
    name: { en: "Chandramouleshwara Temple", kn: "ಚಂದ್ರಮೌಳೇಶ್ವರ ದೇವಸ್ಥಾನ" },
    category: "temple",
    description:
      "The Chandramouleshwara Temple is an ancient Shiva temple located in Unkal, Hubballi. Built in the 12th century, this temple showcases beautiful Chalukyan architecture with intricate stone carvings.",
    images: [
      "/temples/Chandar Temple.webp",
      "/temples/Chandar Temple.webp",
      "/temples/Chandar Temple.webp",
    ],
    location: "Unkal, Hubballi",
    coordinates: { lat: 15.3647, lng: 75.124 },
    timings: "Open: 6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    highlights: ["Ancient architecture", "Stone carvings", "Peaceful atmosphere"],
    history:
      "This temple was built during the Chalukyan period and has been a center of worship for over 800 years. The temple is dedicated to Lord Shiva and features beautiful sculptures depicting various Hindu deities.",
    culturalSignificance:
      "The temple plays an important role in local festivals, especially during Maha Shivaratri when thousands of devotees visit to offer prayers.",
  },
}

export default function TempleDetailPage({ params }: { params: { id: string } }) {
  const temple = mockTemples[params.id as keyof typeof mockTemples]

  if (!temple) {
    notFound()
  }

  return <DetailPage place={temple} />
}
