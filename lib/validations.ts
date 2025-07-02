import { z } from "zod"

export const placeSchema = z.object({
  name: z.object({
    en: z.string().min(1, "English name is required"),
    kn: z.string().min(1, "Kannada name is required"),
  }),
  category: z.enum(["temple", "hotel", "event"], {
    required_error: "Category is required",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  timings: z.string().optional(),
  highlights: z.array(z.string()).min(1, "At least one highlight is required"),
  history: z.string().optional(),
  culturalSignificance: z.string().optional(),
  status: z.enum(["published", "draft"]),
  // Event specific fields
  date: z.string().optional(),
  endDate: z.string().optional(),
  // Hotel specific fields
  cuisine: z.string().optional(),
  priceRange: z.string().optional(),
  // Temple specific fields
  deity: z.string().optional(),
  architecture: z.string().optional(),
})

export type PlaceFormData = z.infer<typeof placeSchema>
