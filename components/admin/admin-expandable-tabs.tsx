"use client"

import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { BarChart3, Building, Calendar, Settings, Users, Utensils } from "lucide-react"

interface AdminExpandableTabsProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function AdminExpandableTabs({ activeTab, onTabChange }: AdminExpandableTabsProps) {
  const adminTabs = [
    { title: "Overview", icon: BarChart3 },
    { title: "Temples", icon: Building },
    { title: "Hotels", icon: Utensils },
    { type: "separator" as const },
    { title: "Events", icon: Calendar },
    { title: "Users", icon: Users },
    { title: "Settings", icon: Settings },
  ]

  const handleTabChange = (index: number | null) => {
    if (index !== null && adminTabs[index].title) {
      const tabNames = ["overview", "temples", "hotels", "", "events", "users", "settings"]
      onTabChange?.(tabNames[index])
    }
  }

  return (
    <div className="mb-6">
      <ExpandableTabs
        tabs={adminTabs}
        activeColor="text-primary"
        onChange={handleTabChange}
        className="bg-white shadow-sm border-gray-200"
      />
    </div>
  )
}
