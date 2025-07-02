"use client"

import { useState, useEffect } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Search, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { db, type Place } from "@/lib/database"
import { PlaceForm } from "./admin/place-form"
import { DeleteConfirmation } from "./admin/delete-confirmation"

interface ContentManagerProps {
  type: "temples" | "hotels" | "events"
}

export function ContentManager({ type }: ContentManagerProps) {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingPlace, setEditingPlace] = useState<Place | null>(null)
  const [deletePlace, setDeletePlace] = useState<Place | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const categoryMap = {
    temples: "temple",
    hotels: "hotel",
    events: "event",
  } as const

  const category = categoryMap[type]

  useEffect(() => {
    loadPlaces()
  }, [category])

  const loadPlaces = async () => {
    setLoading(true)
    try {
      const data = await db.getAll(category)
      setPlaces(data)
    } catch (error) {
      toast.error("Failed to load places")
      console.error("Error loading places:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (place: Place) => {
    setEditingPlace(place)
    setShowForm(true)
  }

  const handleDelete = async () => {
    if (!deletePlace) return

    setDeleteLoading(true)
    try {
      await db.delete(deletePlace.id)
      toast.success("Place deleted successfully!")
      setDeletePlace(null)
      loadPlaces()
    } catch (error) {
      toast.error("Failed to delete place")
      console.error("Error deleting place:", error)
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingPlace(null)
    loadPlaces()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingPlace(null)
  }

  const filteredPlaces = places.filter(
    (place) =>
      place.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.name.kn.includes(searchQuery) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const title = type.charAt(0).toUpperCase() + type.slice(1)
  const singular = type.slice(0, -1)

  if (showForm) {
    return <PlaceForm place={editingPlace || undefined} onSuccess={handleFormSuccess} onCancel={handleFormCancel} />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manage {title}</h2>
          <p className="text-muted-foreground">Add, edit, and manage {type} content</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New {singular.charAt(0).toUpperCase() + singular.slice(1)}
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${type}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Badge variant="secondary">
          {filteredPlaces.length} {filteredPlaces.length === 1 ? singular : type}
        </Badge>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading {type}...</span>
        </div>
      ) : filteredPlaces.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">{searchQuery ? `No ${type} found` : `No ${type} yet`}</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? `No ${type} match your search criteria.` : `Get started by adding your first ${singular}.`}
          </p>
          {!searchQuery && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New {singular.charAt(0).toUpperCase() + singular.slice(1)}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredPlaces.map((place) => (
            <Card key={place.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{place.name.en}</CardTitle>
                      <Badge variant={place.status === "published" ? "default" : "secondary"}>{place.status}</Badge>
                    </div>
                    <CardDescription className="space-y-1">
                      <div>{place.name.kn}</div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>{place.location}</span>
                        {place.date && <span>• {new Date(place.date).toLocaleDateString()}</span>}
                        <span>• Updated {new Date(place.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" title="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(place)} title="Edit">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletePlace(place)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <DeleteConfirmation
        open={!!deletePlace}
        onOpenChange={(open) => !open && setDeletePlace(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title={deletePlace?.name.en || ""}
        description={`Are you sure you want to delete "${deletePlace?.name.en}"? This will permanently remove it from the database.`}
      />
    </div>
  )
}
