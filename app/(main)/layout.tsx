import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Workspace - Notion Clone",
  description: "Your personal workspace for notes and documents",
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
