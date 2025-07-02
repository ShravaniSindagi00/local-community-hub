import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star } from "lucide-react"

export function FeaturedPlace() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Featured This Week
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Chandramouleshwara Temple</h2>
          <p className="text-lg text-muted-foreground">
            Ancient Shiva temple showcasing beautiful Chalukyan architecture
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Chandramouleshwara Temple"
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">Temple</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  Chandramouleshwara Temple
                  <span className="block text-lg text-muted-foreground font-normal mt-1">ಚಂದ್ರಮೌಳೇಶ್ವರ ದೇವಸ್ಥಾನ</span>
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Built in the 12th century, this ancient Shiva temple features intricate stone carvings and represents
                  the finest example of Chalukyan architecture in the region. The temple has been a center of worship
                  for over 800 years.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Unkal, Hubballi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Open: 6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM</span>
                  </div>
                </div>

                <Link href="/temples/1">
                  <Button size="lg" className="w-full md:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
