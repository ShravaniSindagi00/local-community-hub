import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { TourismHero } from "@/components/tourism-hero"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeroDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Hero Component Demo</h1>
            <p className="text-muted-foreground">
              Animated hero sections with floating geometric shapes and smooth transitions
            </p>
          </div>

          <div className="grid gap-8">
            {/* Tourism Hero */}
            <Card>
              <CardHeader>
                <CardTitle>Tourism Hero (Currently Used)</CardTitle>
                <CardDescription>
                  Customized hero section for the Hubballi-Dharwad tourism platform with local branding
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-screen overflow-hidden rounded-lg">
                  <TourismHero />
                </div>
              </CardContent>
            </Card>

            {/* Original Hero */}
            <Card>
              <CardHeader>
                <CardTitle>Original Geometric Hero</CardTitle>
                <CardDescription>The base hero component with customizable content</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-screen overflow-hidden rounded-lg">
                  <HeroGeometric badge="Design Collective" title1="Elevate Your" title2="Digital Vision" />
                </div>
              </CardContent>
            </Card>

            {/* Custom Example */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Example</CardTitle>
                <CardDescription>Hero component with different branding and messaging</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-screen overflow-hidden rounded-lg">
                  <HeroGeometric badge="Innovation Hub" title1="Transform Your" title2="Business Vision" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Tourism Hero Implementation:</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  {`import { TourismHero } from "@/components/tourism-hero"

<TourismHero />`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Generic Hero Implementation:</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  {`import { HeroGeometric } from "@/components/ui/shape-landing-hero"

<HeroGeometric 
  badge="Your Brand"
  title1="Your Main"
  title2="Title Here"
/>`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Animated floating geometric shapes with Framer Motion</li>
                  <li>Customizable badge, title, and subtitle text</li>
                  <li>Responsive design with mobile-first approach</li>
                  <li>Dark theme with gradient overlays</li>
                  <li>Smooth fade-up animations for content</li>
                  <li>Interactive call-to-action buttons</li>
                  <li>Statistics cards with glassmorphism effect</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
