"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye } from "lucide-react"
import { AdminStats } from "@/components/admin/admin-stats"
import { AdminContentManager } from "@/components/admin/admin-content-manager"
import { useData } from "@/lib/shared-data"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Building, Utensils, CalendarIcon, BarChart3 } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { places } = useData()

  // Get recent activity (last 5 places)
  const recentActivity = places
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  const adminTabs = [
    { title: "Overview", icon: BarChart3 },
    { title: "Temples", icon: Building },
    { title: "Hotels", icon: Utensils },
    { title: "Events", icon: CalendarIcon },
  ]

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      const tabValues = ["overview", "temples", "hotels", "events"]
      setActiveTab(tabValues[index])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage content and monitor platform activity</p>
      </div>

      <div className="mb-6">
        <ExpandableTabs tabs={adminTabs} onChange={handleTabChange} className="bg-white shadow-sm" />
      </div>

      <div className="mt-6">{activeTab === "overview" && <AdminStats />}</div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and submissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No recent activity</p>
              ) : (
                recentActivity.map((place) => (
                  <div key={place.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{place.name.en}</p>
                      <p className="text-sm text-muted-foreground">
                        {place.category} • {place.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={place.status === "published" ? "default" : "secondary"}>{place.status}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(place.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => setActiveTab("temples")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Temple
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => setActiveTab("hotels")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Hotel
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => setActiveTab("events")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Create Event
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <a href="/" target="_blank" rel="noreferrer">
                  <Eye className="mr-2 h-4 w-4" />
                  View Live Site
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "temples" && <AdminContentManager type="temples" />}

      {activeTab === "hotels" && <AdminContentManager type="hotels" />}

      {activeTab === "events" && <AdminContentManager type="events" />}
    </div>
  )
}
