import { Card, CardContent } from "@/components/ui/card"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Heart, Users, Shield } from "lucide-react"

export function Mission() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            To preserve and promote the rich cultural heritage of Hubballi-Dharwad by connecting locals and visitors
            with authentic experiences, traditional establishments, and community events that define our twin cities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <GlowingEffect
                spread={25}
                glow={true}
                disabled={false}
                proximity={60}
                inactiveZone={0.2}
                borderWidth={2}
              />
              <Card className="border-none shadow-none bg-transparent relative">
                <CardContent className="text-center p-6">
                  <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Heritage Preservation</h3>
                  <p className="text-muted-foreground">
                    Documenting and sharing the stories behind our ancient temples and cultural landmarks
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <GlowingEffect
                spread={25}
                glow={true}
                disabled={false}
                proximity={60}
                inactiveZone={0.2}
                borderWidth={2}
              />
              <Card className="border-none shadow-none bg-transparent relative">
                <CardContent className="text-center p-6">
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Community Connection</h3>
                  <p className="text-muted-foreground">
                    Bringing together locals and visitors through shared experiences and local knowledge
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <GlowingEffect
                spread={25}
                glow={true}
                disabled={false}
                proximity={60}
                inactiveZone={0.2}
                borderWidth={2}
              />
              <Card className="border-none shadow-none bg-transparent relative">
                <CardContent className="text-center p-6">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ad-Free Experience</h3>
                  <p className="text-muted-foreground">
                    Providing clean, accessible information without commercial distractions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
