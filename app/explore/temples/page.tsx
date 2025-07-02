import { CategoryExplorePage } from "@/components/category-explore-page"

export default function TemplesPage() {
  return <CategoryExplorePage category="temple" />
}

export function generateMetadata() {
  return {
    title: "Explore Temples in Hubballi-Dharwad | HD Explore",
    description:
      "Discover ancient temples and sacred places in Hubballi-Dharwad. Explore centuries-old architecture and spiritual heritage.",
  }
}
