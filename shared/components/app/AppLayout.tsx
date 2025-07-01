"use client"

import type React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "../workspace/AppSidebar"
import { FloatingActionButton } from "../common/FloatingActionButton"
import { useTheme } from "@/shared/hooks/use-theme"
import { useUI } from "@/shared/hooks/use-ui"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isDarkMode } = useTheme()
  const { viewMode } = useUI()

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col relative">
          {viewMode === "editor" && (
            <div className="flex h-14 shrink-0 items-center gap-2 border-b px-6">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          )}
          {children}
          <FloatingActionButton />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
