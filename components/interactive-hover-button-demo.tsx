import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

function InteractiveHoverButtonDemo() {
  return (
    <div className="flex flex-col gap-8 items-center p-8">
      <h2 className="text-2xl font-bold mb-4">Interactive Hover Button Demo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold">Default</h3>
          <InteractiveHoverButton />
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold">Explore</h3>
          <InteractiveHoverButton text="Explore" className="w-36" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold">Book Now</h3>
          <InteractiveHoverButton text="Book Now" className="w-40" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold">Learn More</h3>
          <InteractiveHoverButton text="Learn More" className="w-44" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold">View Details</h3>
          <InteractiveHoverButton text="View Details" className="w-48" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold">Get Started</h3>
          <InteractiveHoverButton text="Get Started" className="w-48" />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-semibold">Different Sizes</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <InteractiveHoverButton text="Small" className="w-28 p-1 text-sm" />
          <InteractiveHoverButton text="Medium" className="w-36 p-2" />
          <InteractiveHoverButton text="Large" className="w-44 p-3 text-lg" />
          <InteractiveHoverButton text="Extra Large" className="w-52 p-4 text-xl" />
        </div>
      </div>
    </div>
  )
}

export { InteractiveHoverButtonDemo }
