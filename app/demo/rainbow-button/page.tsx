"use client"

import { RainbowButtonDemo } from "@/components/rainbow-button-demo"

export default function RainbowButtonDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Rainbow Button Demo</h1>
          <p className="text-muted-foreground">Interactive rainbow buttons with smooth gradient animations</p>
        </div>

        <RainbowButtonDemo />

        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Usage</h2>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`import { RainbowButton } from "@/components/ui/rainbow-button"

export function MyComponent() {
  return (
    <RainbowButton onClick={() => console.log("Clicked!")}>
      Get Started
    </RainbowButton>
  )
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Animated rainbow gradient background</li>
              <li>Smooth color transitions</li>
              <li>Supports all standard button props</li>
              <li>Responsive design</li>
              <li>Dark mode compatible</li>
              <li>Customizable with className prop</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
