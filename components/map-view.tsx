import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface Place {
  id: string
  name: { en: string; kn: string }
  category: string
  location: string
}

interface MapViewProps {
  places: Place[]
}

export function MapView({ places }: MapViewProps) {
  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Interactive Map
        </CardTitle>
        <CardDescription>Map integration would be implemented here with Google Maps or Mapbox</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Interactive map showing {places.length} locations</p>
            <p className="text-sm text-muted-foreground mt-1">
              Google Maps/Mapbox integration would be implemented here
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
