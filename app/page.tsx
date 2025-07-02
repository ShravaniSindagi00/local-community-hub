import { TourismHero } from "@/components/tourism-hero"
import { Categories } from "@/components/categories"
import { FeaturedPlace } from "@/components/featured-place"
import { Mission } from "@/components/mission"

export default function HomePage() {
  return (
    <div className="space-y-0">
      <TourismHero />
      <div className="space-y-16 py-16">
        <Categories />
        <FeaturedPlace />
        <Mission />
      </div>
    </div>
  )
}
