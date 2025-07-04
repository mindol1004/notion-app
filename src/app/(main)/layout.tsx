import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Minimal - Notion",
  description: "Your personal workspace for notes and documents",
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <main> {/* Add padding-top to account for fixed header */}
        {children}
      </main>
  )
}
