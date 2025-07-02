"use client"

import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bell,
  Home,
  HelpCircle,
  Settings,
  Shield,
  Mail,
  User,
  FileText,
  Lock,
  MapPin,
  Heart,
  Calendar,
  Building,
  Utensils,
} from "lucide-react"

export default function DemoPage() {
  const defaultTabs = [
    { title: "Dashboard", icon: Home },
    { title: "Notifications", icon: Bell },
    { type: "separator" as const },
    { title: "Settings", icon: Settings },
    { title: "Support", icon: HelpCircle },
    { title: "Security", icon: Shield },
  ]

  const customTabs = [
    { title: "Profile", icon: User },
    { title: "Messages", icon: Mail },
    { type: "separator" as const },
    { title: "Documents", icon: FileText },
    { title: "Privacy", icon: Lock },
  ]

  const tourismTabs = [
    { title: "Explore", icon: MapPin },
    { title: "Saved Places", icon: Heart },
    { type: "separator" as const },
    { title: "Temples", icon: Building },
    { title: "Hotels", icon: Utensils },
    { title: "Events", icon: Calendar },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Expandable Tabs Demo</h1>
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
              <ExpandableTabs tabs={defaultTabs} />
            </CardContent>
          </Card>

          {/* Custom Color Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Color</CardTitle>
              <CardDescription>Expandable tabs with custom blue accent color and border styling</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpandableTabs
                tabs={customTabs}
                activeColor="text-blue-500"
                className="border-blue-200 dark:border-blue-800"
              />
            </CardContent>
          </Card>

          {/* Tourism Platform Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Tourism Platform Theme</CardTitle>
              <CardDescription>
                Tourism-focused tabs with glassmorphism styling for the Hubballi-Dharwad platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpandableTabs
                tabs={tourismTabs}
                activeColor="text-primary"
                onChange={(index) => {
                  if (index !== null) {
                    const tabTitles = ["Explore", "Saved Places", "", "Temples", "Hotels", "Events"]
                    console.log(`Selected tab: ${tabTitles[index]}`)
                  }
                }}
                className="bg-white/80 backdrop-blur-sm border-white/20"
              />
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
