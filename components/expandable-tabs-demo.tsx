"use client"

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
} from "lucide-react"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"

function DefaultDemo() {
  const tabs = [
    { title: "Dashboard", icon: Home },
    { title: "Notifications", icon: Bell },
    { type: "separator" as const },
    { title: "Settings", icon: Settings },
    { title: "Support", icon: HelpCircle },
    { title: "Security", icon: Shield },
  ]

  return (
    <div className="flex flex-col gap-4">
      <ExpandableTabs tabs={tabs} />
    </div>
  )
}

function CustomColorDemo() {
  const tabs = [
    { title: "Profile", icon: User },
    { title: "Messages", icon: Mail },
    { type: "separator" as const },
    { title: "Documents", icon: FileText },
    { title: "Privacy", icon: Lock },
  ]

  return (
    <div className="flex flex-col gap-4">
      <ExpandableTabs tabs={tabs} activeColor="text-blue-500" className="border-blue-200 dark:border-blue-800" />
    </div>
  )
}

function HubballiDharwadDemo() {
  const tabs = [
    { title: "Explore", icon: MapPin },
    { title: "Saved Places", icon: Heart },
    { type: "separator" as const },
    { title: "Events", icon: Calendar },
    { title: "Profile", icon: User },
  ]

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      const tabTitles = ["Explore", "Saved Places", "", "Events", "Profile"]
      console.log(`Selected tab: ${tabTitles[index]}`)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <ExpandableTabs
        tabs={tabs}
        activeColor="text-primary"
        onChange={handleTabChange}
        className="bg-white/80 backdrop-blur-sm border-white/20"
      />
    </div>
  )
}

export { DefaultDemo, CustomColorDemo, HubballiDharwadDemo }
