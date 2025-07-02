"use client"

import { ImageAutoSlider } from "@/components/ui/image-auto-slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ImageAutoSliderDemo() {
  // Tourism-focused images for Hubballi-Dharwad
  const tourismImages = [
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Indian temple
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Heritage architecture
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Indian palace
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Traditional architecture
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Indian monument
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Cultural site
  ]

  const hotelImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Luxury hotel
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Hotel room
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Hotel exterior
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Hotel lobby
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Image Auto-Slider Demo</h1>
          <p className="text-muted-foreground">
            Infinite scrolling image galleries with smooth animations for showcasing tourism content
          </p>
        </div>

        <div className="grid gap-8">
          {/* Default Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Default Tourism Gallery</CardTitle>
              <CardDescription>Showcasing temples and heritage sites of Hubballi-Dharwad</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-hidden rounded-lg">
                <ImageAutoSlider images={tourismImages} className="min-h-96" />
              </div>
            </CardContent>
          </Card>

          {/* Fast Speed Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Hotels & Accommodation</CardTitle>
              <CardDescription>Fast-scrolling gallery of hotels and stays (10s animation)</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-hidden rounded-lg">
                <ImageAutoSlider images={hotelImages} speed={10} className="min-h-96" />
              </div>
            </CardContent>
          </Card>

          {/* Slow Speed Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Slow Motion Gallery</CardTitle>
              <CardDescription>Slow-scrolling gallery for detailed viewing (30s animation)</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-hidden rounded-lg">
                <ImageAutoSlider speed={30} className="min-h-96" />
              </div>
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
                {`import { ImageAutoSlider } from "@/components/ui/image-auto-slider"

<ImageAutoSlider />`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">With Custom Images and Speed:</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                {`const images = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  // ... more images
];

<ImageAutoSlider 
  images={images}
  speed={15}
  className="custom-class"
/>`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
