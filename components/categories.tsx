import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Utensils, Calendar, ArrowRight } from "lucide-react"

const categories = [
  {
    title: "Ancient Temples",
    description: "Discover centuries-old temples with rich history and beautiful architecture",
    icon: Building,
    href: "/explore/temples", // Changed from "/explore?filter=temple"
    count: "50+ temples",
    color: "text-blue-600",
  },
  {
    title: "Traditional Hotels",
    description: "Experience authentic local cuisine at family-run restaurants",
    icon: Utensils,
    href: "/explore/hotels", // Changed from "/explore?filter=hotel"
    count: "100+ restaurants",
    color: "text-green-600",
  },
  {
    title: "Local Events",
    description: "Join cultural festivals, concerts, and community gatherings",
    icon: Calendar,
    href: "/explore/events", // Changed from "/explore?filter=event"
    count: "25+ monthly events",
    color: "text-purple-600",
  },
]

export function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the rich cultural heritage of Hubballi-Dharwad through our carefully curated categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card
              key={category.title}
              className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                <CardDescription className="text-base">{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
                <Link href={category.href}>
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
