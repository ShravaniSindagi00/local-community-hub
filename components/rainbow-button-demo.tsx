import { RainbowButton } from "@/components/ui/rainbow-button"

export function RainbowButtonDemo() {
  return (
    <div className="flex flex-col gap-4 items-center p-8">
      <h2 className="text-2xl font-bold mb-4">Rainbow Button Demo</h2>
      <RainbowButton>Get Unlimited Access</RainbowButton>
      <RainbowButton>Explore Now</RainbowButton>
      <RainbowButton>Book Your Stay</RainbowButton>
      <RainbowButton disabled>Disabled Button</RainbowButton>
    </div>
  )
}
