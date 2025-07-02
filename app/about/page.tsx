import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Heart, Users, MapPin, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Hubballi-Dharwad Explore</h1>
          <p className="text-xl text-muted-foreground">
            Connecting you with the rich heritage and vibrant culture of Hubballi-Dharwad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative">
            <GlowingEffect spread={30} glow={true} disabled={false} proximity={80} inactiveZone={0.1} borderWidth={2} />
            <Card className="relative h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To preserve and promote the cultural heritage of Hubballi-Dharwad by providing a comprehensive
                  platform for discovering ancient temples, traditional eateries, and local events that define our
                  community.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <GlowingEffect spread={30} glow={true} disabled={false} proximity={80} inactiveZone={0.1} borderWidth={2} />
            <Card className="relative h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Community Driven
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built by locals, for locals. Our platform celebrates the stories, traditions, and experiences that
                  make Hubballi-Dharwad unique, fostering connections within our community.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <GlowingEffect spread={30} glow={true} disabled={false} proximity={80} inactiveZone={0.1} borderWidth={2} />
            <Card className="relative h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  Local Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From the ancient temples of Unkal to the bustling markets of Dharwad, we showcase the hidden gems and
                  well-known landmarks that tell the story of our twin cities.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <GlowingEffect spread={30} glow={true} disabled={false} proximity={80} inactiveZone={0.1} borderWidth={2} />
            <Card className="relative h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  Preserving Heritage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We document and share the rich history of our region, ensuring that future generations can learn about
                  and appreciate the cultural legacy of Hubballi-Dharwad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="relative">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={100} inactiveZone={0.05} borderWidth={3} />
          <div className="bg-muted rounded-lg p-8 text-center relative">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-6">
              Help us grow this platform by sharing your favorite places, events, and stories. Together, we can create
              the most comprehensive guide to Hubballi-Dharwad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/signup"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Get Started
              </a>
              <a
                href="/explore"
                className="border border-input bg-background px-6 py-3 rounded-md hover:bg-accent transition-colors"
              >
                Explore Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
