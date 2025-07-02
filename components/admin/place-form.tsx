"use client"

import type React from "react"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, X, Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { placeSchema, type PlaceFormData } from "@/lib/validations"
import { db, type Place } from "@/lib/database"

interface PlaceFormProps {
  place?: Place
  onSuccess: () => void
  onCancel: () => void
}

export function PlaceForm({ place, onSuccess, onCancel }: PlaceFormProps) {
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)

  const isEditing = !!place

  const form = useForm<PlaceFormData>({
    resolver: zodResolver(placeSchema),
    defaultValues: place
      ? {
          name: place.name,
          category: place.category,
          description: place.description,
          location: place.location,
          images: place.images,
          coordinates: place.coordinates,
          timings: place.timings || "",
          highlights: place.highlights,
          history: place.history || "",
          culturalSignificance: place.culturalSignificance || "",
          status: place.status,
          date: place.date || "",
          endDate: place.endDate || "",
          cuisine: place.cuisine || "",
          priceRange: place.priceRange || "",
          deity: place.deity || "",
          architecture: place.architecture || "",
        }
      : {
          name: { en: "", kn: "" },
          category: "temple",
          description: "",
          location: "",
          images: [],
          highlights: [""],
          status: "draft",
        },
  })

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control: form.control,
    name: "highlights",
  })

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "images",
  })

  const category = form.watch("category")

  const onSubmit = async (data: PlaceFormData) => {
    setLoading(true)

    try {
      if (isEditing && place) {
        await db.update(place.id, {
          ...data,
          createdBy: place.createdBy,
        })
        toast.success("Place updated successfully!")
      } else {
        await db.create({
          ...data,
          createdBy: "admin", // In real app, get from auth context
        })
        toast.success("Place created successfully!")
      }

      onSuccess()
    } catch (error) {
      toast.error(isEditing ? "Failed to update place" : "Failed to create place")
      console.error("Form submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImageUploading(true)

    try {
      // Simulate image upload - replace with actual upload logic
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In real implementation, upload to Firebase Storage or Cloudinary
      const imageUrl = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(file.name)}`

      appendImage(imageUrl)
      toast.success("Image uploaded successfully!")
    } catch (error) {
      toast.error("Failed to upload image")
    } finally {
      setImageUploading(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Place" : "Add New Place"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update the details of this place" : "Fill in the details to add a new place"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name.en">Name (English) *</Label>
                <Input id="name.en" {...form.register("name.en")} placeholder="Enter English name" />
                {form.formState.errors.name?.en && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.en.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name.kn">Name (Kannada) *</Label>
                <Input id="name.kn" {...form.register("name.kn")} placeholder="Enter Kannada name" />
                {form.formState.errors.name?.kn && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.kn.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={form.watch("category")}
                  onValueChange={(value: "temple" | "hotel" | "event") => form.setValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temple">Temple</SelectItem>
                    <SelectItem value="hotel">Hotel/Restaurant</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Status *</Label>
                <Select
                  value={form.watch("status")}
                  onValueChange={(value: "published" | "draft") => form.setValue("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input id="location" {...form.register("location")} placeholder="Enter location" />
              {form.formState.errors.location && (
                <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" {...form.register("description")} placeholder="Enter description" rows={4} />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Images</h3>
              <div className="flex items-center gap-2">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  disabled={imageUploading}
                >
                  {imageUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Upload Image
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {imageFields.map((field, index) => (
                <div key={field.id} className="relative">
                  <img
                    src={field.value || "/placeholder.svg"}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {form.formState.errors.images && (
              <p className="text-sm text-red-500">{form.formState.errors.images.message}</p>
            )}
          </div>

          <Separator />

          {/* Highlights */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Highlights</h3>
              <Button type="button" variant="outline" size="sm" onClick={() => appendHighlight("")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Highlight
              </Button>
            </div>

            <div className="space-y-2">
              {highlightFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input {...form.register(`highlights.${index}`)} placeholder="Enter highlight" />
                  {highlightFields.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeHighlight(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Category-specific fields */}
          {category === "event" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Start Date</Label>
                  <Input id="date" type="date" {...form.register("date")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" {...form.register("endDate")} />
                </div>
              </div>
            </div>
          )}

          {category === "hotel" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Restaurant Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cuisine">Cuisine Type</Label>
                  <Input id="cuisine" {...form.register("cuisine")} placeholder="e.g., South Indian, North Indian" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceRange">Price Range</Label>
                  <Input id="priceRange" {...form.register("priceRange")} placeholder="e.g., ₹100-300" />
                </div>
              </div>
            </div>
          )}

          {category === "temple" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Temple Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deity">Main Deity</Label>
                  <Input id="deity" {...form.register("deity")} placeholder="e.g., Lord Shiva, Lord Vishnu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="architecture">Architecture Style</Label>
                  <Input id="architecture" {...form.register("architecture")} placeholder="e.g., Chalukyan, Hoysala" />
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>

            <div className="space-y-2">
              <Label htmlFor="timings">Timings</Label>
              <Input id="timings" {...form.register("timings")} placeholder="e.g., 6:00 AM - 8:00 PM" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="history">History</Label>
              <Textarea
                id="history"
                {...form.register("history")}
                placeholder="Enter historical information"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="culturalSignificance">Cultural Significance</Label>
              <Textarea
                id="culturalSignificance"
                {...form.register("culturalSignificance")}
                placeholder="Enter cultural significance"
                rows={3}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : isEditing ? (
                "Update Place"
              ) : (
                "Create Place"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
