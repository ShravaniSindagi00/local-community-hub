import { TourismHero } from "@/components/tourism-hero"
import { Categories } from "@/components/categories"
import { FeaturedPlace } from "@/components/featured-place"
import { Mission } from "@/components/mission"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <TourismHero />
      <Categories />
      <FeaturedPlace />
      <Mission />
    </div>
  )
}
