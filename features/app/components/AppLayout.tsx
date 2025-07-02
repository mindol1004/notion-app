"use client"

import type React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/features/workspace/components/AppSidebar"
import { FloatingActionButton } from "@/features/common/components/FloatingActionButton"
import { useUIState } from "@/shared/hooks/use-global-state"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { viewMode } = useUIState()

  return (
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
  )
}
