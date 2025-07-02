"use client"

import { InteractiveHoverButtonDemo } from "@/components/interactive-hover-button-demo"

export default function InteractiveHoverButtonDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Interactive Hover Button Demo</h1>
          <p className="text-muted-foreground">Buttons with sliding text animations and expanding backgrounds</p>
        </div>

        <InteractiveHoverButtonDemo />

        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Usage</h2>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export function MyComponent() {
  return (
    <InteractiveHoverButton 
      text="Click Me" 
      className="w-40"
      onClick={() => console.log("Clicked!")}
    />
  )
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Sliding text animation on hover</li>
              <li>Expanding background effect</li>
              <li>Arrow icon appears on hover</li>
              <li>Customizable text and styling</li>
              <li>Supports all standard button props</li>
              <li>Responsive design</li>
              <li>Smooth transitions and animations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Props</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-2 text-left">Prop</th>
                    <th className="border border-border p-2 text-left">Type</th>
                    <th className="border border-border p-2 text-left">Default</th>
                    <th className="border border-border p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2">text</td>
                    <td className="border border-border p-2">string</td>
                    <td className="border border-border p-2">"Button"</td>
                    <td className="border border-border p-2">The text to display on the button</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">className</td>
                    <td className="border border-border p-2">string</td>
                    <td className="border border-border p-2">-</td>
                    <td className="border border-border p-2">Additional CSS classes</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">...props</td>
                    <td className="border border-border p-2">ButtonHTMLAttributes</td>
                    <td className="border border-border p-2">-</td>
                    <td className="border border-border p-2">All standard button props</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
