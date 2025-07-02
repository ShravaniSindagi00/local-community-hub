import type { ReactNode } from "react"
import { AuroraBackground } from "@/components/ui/aurora-background"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuroraBackground className="min-h-screen">
      <div className="relative z-10 w-full">{children}</div>
    </AuroraBackground>
  )
}
