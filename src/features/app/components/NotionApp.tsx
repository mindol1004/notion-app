"use client"

import { Editor } from "@/features/editor/components/Editor"
import { SettingsPage } from "@/features/settings/components/SettingsPage"
import { AppLayout } from "@/features/app/components/AppLayout"
import { useAppLogic } from "@/features/app/hooks/use-app-logic"
import { useThemeEffect } from "@/shared/stores/theme-store"

function NotionAppContent() {
  const { isDarkMode, viewMode } = useAppLogic()

  // 테마 효과 적용
  useThemeEffect()

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
