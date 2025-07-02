import { CategoryExplorePage } from "@/components/category-explore-page"

export default function HotelsPage() {
  return <CategoryExplorePage category="hotel" />
}

export function generateMetadata() {
  return {
    title: "Explore Hotels & Restaurants in Hubballi-Dharwad | HD Explore",
    description:
      "Find the best traditional hotels and restaurants in Hubballi-Dharwad. Experience authentic local cuisine and hospitality.",
  }
}
