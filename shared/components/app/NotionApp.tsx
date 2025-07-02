"use client"

import { Editor } from "../editor/Editor"
import { SettingsPage } from "../settings/SettingsPage"
import { AppLayout } from "./AppLayout"
import { useAppLogic } from "./hooks/use-app-logic"
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
