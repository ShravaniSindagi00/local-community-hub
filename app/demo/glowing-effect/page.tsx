import { GlowingEffectDemo } from "@/components/glowing-effect-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GlowingEffectDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Glowing Effect Component Demo</h1>
            <p className="text-muted-foreground">
              Interactive glowing border effects that follow mouse movement with smooth animations
            </p>
          </div>

          {/* Main Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Tourism Platform Demo</CardTitle>
              <CardDescription>Glowing effect applied to tourism-focused content cards</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <GlowingEffectDemo />
            </CardContent>
          </Card>

          {/* Usage Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Usage & Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Basic Implementation:</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  {`import { GlowingEffect } from "@/components/ui/glowing-effect"

<div className="relative">
  <GlowingEffect
    spread={30}
    glow={true}
    disabled={false}
    proximity={80}
    inactiveZone={0.1}
    borderWidth={2}
  />
  <Card className="relative">
    {/* Your content here */}
  </Card>
</div>`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Props Configuration:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p>
                      <code className="bg-muted px-2 py-1 rounded">spread</code> - Controls the width of the glowing
                      effect (default: 20)
                    </p>
                    <p>
                      <code className="bg-muted px-2 py-1 rounded">proximity</code> - Distance from element to activate
                      effect (default: 0)
                    </p>
                    <p>
                      <code className="bg-muted px-2 py-1 rounded">inactiveZone</code> - Center area where effect is
                      inactive (default: 0.7)
                    </p>
                    <p>
                      <code className="bg-muted px-2 py-1 rounded">borderWidth</code> - Width of the glowing border
                      (default: 1)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <code className="bg-muted px-2 py-1 rounded">glow</code> - Enable/disable the glowing effect
                      (default: false)
                    </p>
                    <p>
                      <code className="bg-muted px-2 py-1 rounded">disabled</code> - Disable mouse tracking (default:
                      true)
                    </p>
                    <p>
                      <code className="bg-muted px-2 py-1 rounded">blur</code> - Apply blur effect (default: 0)
                    </p>
                    <p>
                      <code className="bg-muted px-2 py-1 rounded">variant</code> - Color variant: "default" or "white"
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Integration Notes:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>The component must be placed as a sibling to the content it should affect</li>
                  <li>
                    Parent container should have <code className="bg-muted px-1 rounded">position: relative</code>
                  </li>
                  <li>
                    Content element should have <code className="bg-muted px-1 rounded">position: relative</code> and
                    higher z-index
                  </li>
                  <li>Works best with rounded corners that match the content element</li>
                  <li>Automatically handles scroll and pointer events for smooth tracking</li>
                  <li>Uses requestAnimationFrame for optimal performance</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Current Integration:</h4>
                <p className="text-sm text-muted-foreground">The glowing effect has been integrated into:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                  <li>About page mission cards - Interactive hover effects on heritage information</li>
                  <li>Mission section cards - Enhanced visual appeal for core values</li>
                  <li>Call-to-action sections - Draws attention to important actions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
