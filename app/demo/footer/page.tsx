import { TourismFooter } from "@/components/tourism-footer"
import { Footerdemo } from "@/components/ui/footer-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FooterDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Footer Component Demo</h1>
          <p className="text-muted-foreground">
            Interactive footer components with newsletter signup, social links, and dark mode toggle
          </p>
        </div>

        <div className="grid gap-8">
          {/* Tourism Footer */}
          <Card>
            <CardHeader>
              <CardTitle>Tourism Footer (Currently Used)</CardTitle>
              <CardDescription>Customized footer for the Hubballi-Dharwad tourism platform</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TourismFooter />
            </CardContent>
          </Card>

          {/* Original Footer */}
          <Card>
            <CardHeader>
              <CardTitle>Original Footer Component</CardTitle>
              <CardDescription>The base footer component with generic content</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Footerdemo />
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
              <h4 className="font-semibold mb-2">Tourism Footer Implementation:</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                {`import { TourismFooter } from "@/components/tourism-footer"

<TourismFooter />`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Original Footer Implementation:</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                {`import { Footerdemo } from "@/components/ui/footer-section"

<Footerdemo />`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Newsletter subscription with email input</li>
                <li>Social media links with tooltips</li>
                <li>Dark mode toggle functionality</li>
                <li>Responsive grid layout</li>
                <li>Contact information and quick links</li>
                <li>Smooth animations and hover effects</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
