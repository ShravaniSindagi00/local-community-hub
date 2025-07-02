"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Utensils, Calendar, Eye, TrendingUp } from "lucide-react"
import { useData } from "@/lib/shared-data"

export function AdminStats() {
  const { getStats } = useData()
  const stats = getStats()

  const statCards = [
    {
      title: "Total Places",
      value: stats.total.toString(),
      change: `${stats.published} published`,
      icon: Building,
      color: "text-blue-600",
    },
    {
      title: "Temples",
      value: stats.temples.toString(),
      change: "Sacred places",
      icon: Building,
      color: "text-purple-600",
    },
    {
      title: "Hotels & Restaurants",
      value: stats.hotels.toString(),
      change: "Dining places",
      icon: Utensils,
      color: "text-green-600",
    },
    {
      title: "Events",
      value: stats.events.toString(),
      change: "Cultural events",
      icon: Calendar,
      color: "text-orange-600",
    },
    {
      title: "Published",
      value: stats.published.toString(),
      change: `${stats.draft} drafts`,
      icon: Eye,
      color: "text-red-600",
    },
    {
      title: "Growth Rate",
      value: "23%",
      change: "+5% from last month",
      icon: TrendingUp,
      color: "text-indigo-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
