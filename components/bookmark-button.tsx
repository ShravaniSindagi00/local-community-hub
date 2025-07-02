"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useAuth } from "./auth-provider"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface BookmarkButtonProps {
  placeId: string
  placeName: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showText?: boolean
}

export function BookmarkButton({
  placeId,
  placeName,
  variant = "outline",
  size = "default",
  className,
  showText = true,
}: BookmarkButtonProps) {
  const { user, addBookmark, removeBookmark, isBookmarked } = useAuth()
  const [isAnimating, setIsAnimating] = useState(false)

  const bookmarked = isBookmarked(placeId)

  const handleBookmark = () => {
    setIsAnimating(true)

    if (bookmarked) {
      removeBookmark(placeId)
      toast.success("Removed from favorites", {
        description: `${placeName} has been removed from your saved places.`,
      })
    } else {
      addBookmark(placeId)
      if (user) {
        toast.success("Added to favorites!", {
          description: `${placeName} has been saved to your favorites.`,
        })
      } else {
        toast.success("Added to favorites!", {
          description: "Login to sync your saved places across devices.",
          action: {
            label: "Login",
            onClick: () => (window.location.href = "/auth/signin"),
          },
        })
      }
    }

    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <Button
      variant={bookmarked ? "default" : variant}
      size={size}
      onClick={handleBookmark}
      className={cn(
        "transition-all duration-200",
        bookmarked && "bg-red-500 hover:bg-red-600 text-white",
        isAnimating && "scale-110",
        className,
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all duration-200",
          bookmarked && "fill-current",
          isAnimating && "scale-125",
          showText && "mr-2",
        )}
      />
      {showText && (bookmarked ? "Saved" : "Save")}
    </Button>
  )
}
