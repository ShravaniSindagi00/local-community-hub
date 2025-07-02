// app/admin/layout.tsx
import type { ReactNode } from "react"
import { AdminNavbar } from "@/components/admin/admin-navbar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  // NOTE: No <html> or <body> tags here—those are already provided by the root layout.
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminNavbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
