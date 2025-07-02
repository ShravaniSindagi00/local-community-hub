"use client"

import { DefaultDemo, CustomColorDemo, HubballiDharwadDemo } from "@/components/expandable-tabs-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExpandableTabsDemo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Expandable Tabs Component</h1>
          <p className="text-muted-foreground">
            Interactive tabs that expand to show labels when selected, with smooth animations
          </p>
        </div>

        <div className="grid gap-8">
          {/* Default Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Default Style</CardTitle>
              <CardDescription>Basic expandable tabs with default styling and primary color</CardDescription>
            </CardHeader>
            <CardContent>
              <DefaultDemo />
            </CardContent>
          </Card>

          {/* Custom Color Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Color</CardTitle>
              <CardDescription>Expandable tabs with custom blue accent color and border styling</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomColorDemo />
            </CardContent>
          </Card>

          {/* Hubballi-Dharwad Themed Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Hubballi-Dharwad Theme</CardTitle>
              <CardDescription>Tourism-focused tabs with glassmorphism styling for the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <HubballiDharwadDemo />
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
              <h4 className="font-semibold mb-2">Basic Implementation:</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                {`import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Home, Settings } from 'lucide-react'

const tabs = [
  { title: "Home", icon: Home },
  { title: "Settings", icon: Settings },
]

<ExpandableTabs tabs={tabs} />`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">With Custom Styling:</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                {`<ExpandableTabs 
  tabs={tabs}
  activeColor="text-blue-500"
  className="border-blue-200"
  onChange={(index) => console.log('Selected:', index)}
/>`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
