import type React from "react"
import type { Metadata } from "next"
import { AuthRedirectProvider } from "@/providers/AuthRedirectProvider"

export const metadata: Metadata = {
  title: "Minimal - Notion",
  description: "Sign in to your workspace",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <AuthRedirectProvider>
          {children}
        </AuthRedirectProvider>
      </div>
    </div>
  )
}
