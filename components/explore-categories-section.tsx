"use client"

import { CategoryCard } from "@/components/ui/category-card"
import { Building, Utensils, Calendar } from "lucide-react"
import { useData } from "@/lib/shared-data"

export function ExploreCategoriesSection() {
  const { getPublishedPlaces } = useData()
  const publishedPlaces = getPublishedPlaces()

  // Calculate counts for each category
  const templeCounts = publishedPlaces.filter((p) => p.category === "temple").length
  const hotelCounts = publishedPlaces.filter((p) => p.category === "hotel").length
  const eventCounts = publishedPlaces.filter((p) => p.category === "event").length

  const categories = [
    {
      title: "Ancient Temples",
      description:
        "Discover centuries-old spiritual landmarks with rich history and beautiful architecture across Hubballi-Dharwad.",
      href: "/explore/temples",
      icon: <Building className="h-6 w-6 text-purple-300" />,
      count: `${templeCounts}+ temples`,
      gradient: "from-purple-900 via-indigo-900 to-blue-900",
    },
    {
      title: "Traditional Hotels",
      description: "Explore authentic local cuisine and traditional hospitality at family-run restaurants and hotels.",
      href: "/explore/hotels",
      icon: <Utensils className="h-6 w-6 text-green-300" />,
      count: `${hotelCounts}+ restaurants`,
      gradient: "from-green-900 via-emerald-900 to-teal-900",
    },
    {
      title: "Cultural Events",
      description:
        "Find vibrant cultural events, festivals, temple fairs, and community celebrations throughout the year.",
      href: "/explore/events",
      icon: <Calendar className="h-6 w-6 text-orange-300" />,
      count: `${eventCounts}+ events`,
      gradient: "from-orange-900 via-red-900 to-pink-900",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore by Category</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the rich cultural heritage of Hubballi-Dharwad through our carefully curated categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              href={category.href}
              icon={category.icon}
              count={category.count}
              gradient={category.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
