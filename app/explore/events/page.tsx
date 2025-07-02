import { CategoryExplorePage } from "@/components/category-explore-page"

export default function EventsPage() {
  return <CategoryExplorePage category="event" />
}

export function generateMetadata() {
  return {
    title: "Explore Events in Hubballi-Dharwad | HD Explore",
    description:
      "Discover cultural events, festivals, and local gatherings in Hubballi-Dharwad. Join the vibrant community celebrations.",
  }
}
