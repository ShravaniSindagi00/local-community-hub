import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { FeaturedPlace } from "@/components/featured-place"
import { Mission } from "@/components/mission"

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <Categories />
      <FeaturedPlace />
      <Mission />
    </div>
  )
}
