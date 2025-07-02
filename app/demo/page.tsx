import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const demos = [
  {
    title: "Expandable Tabs",
    description: "Interactive tabs with smooth animations and state management",
    href: "/demo/expandable-tabs",
  },
  {
    title: "Image Auto Slider",
    description: "Automatic image carousel with smooth transitions",
    href: "/demo/image-slider",
  },
  {
    title: "Tourism Footer",
    description: "Comprehensive footer component for tourism websites",
    href: "/demo/footer",
  },
  {
    title: "Shape Landing Hero",
    description: "Modern hero section with geometric shapes and animations",
    href: "/demo/hero",
  },
  {
    title: "Glowing Effect",
    description: "Interactive glowing effects and animations",
    href: "/demo/glowing-effect",
  },
  {
    title: "Rainbow Button",
    description: "Animated rainbow gradient buttons with smooth transitions",
    href: "/demo/rainbow-button",
  },
  {
    title: "Background Circles",
    description: "Animated background with rotating circles and multiple variants",
    href: "/demo/background-circles",
  },
]

export default function DemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Component Demos</h1>
          <p className="text-xl text-muted-foreground">
            Explore all the integrated components in the Hubballi-Dharwad tourism platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <Card key={demo.href} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{demo.title}</CardTitle>
                <CardDescription>{demo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={demo.href}>
                  <Button className="w-full">View Demo</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
