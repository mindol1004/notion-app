"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

interface AuthRedirectProviderProps {
  children: React.ReactNode
}

export function AuthRedirectProvider({ children }: AuthRedirectProviderProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "authenticated") {
      // Check if the current path is one of the auth-related public pages
      if (pathname === "/login" || pathname === "/register" || pathname === "/") {
        router.push("/workspace")
      }
    } else if (status === "loading") {
      // Optionally, show a loading state while session is being loaded
      // return <div className="flex items-center justify-center min-h-screen"><div className="text-muted-foreground">Loading...</div></div>;
    }
  }, [status, pathname, router])

  // Render children normally, the redirect handles navigation away if authenticated
  // For unauthenticated users, they will see the login/register/landing page
  return <>{children}</>
}
