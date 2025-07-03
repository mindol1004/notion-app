"use client"

import { Editor } from "@/features/editor/components/Editor"
import { SettingsPage } from "@/features/settings/components/SettingsPage"
import { AppLayout } from "@/features/app/components/AppLayout"
import { useAppLogic } from "@/features/app/hooks/use-app-logic"
import { useThemeEffect } from "@/shared/stores/theme-store"

function NotionAppContent() {
  const { appReady, isInitialized, isDarkMode, viewMode } = useAppLogic()

  // 테마 효과 적용
  useThemeEffect()

  if (!appReady || !isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <AppLayout>
      {viewMode === "editor" && <Editor />}
      {viewMode === "settings" && <SettingsPage />}
    </AppLayout>
  )
}

export function NotionApp() {
  return <NotionAppContent />
}
