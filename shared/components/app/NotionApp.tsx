"use client"

import { useEffect, useState } from "react"
import { AppLayout } from "./AppLayout"
import { Editor } from "../editor/Editor"
import { SettingsPage } from "../settings/SettingsPage"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useEditor } from "@/shared/hooks/use-editor"
import { useUI } from "@/shared/hooks/use-ui"

function NotionAppContent() {
  const { t } = useI18n()
  const { isInitialized, initializeEditors } = useEditor()
  const { viewMode } = useUI()
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    if (!isInitialized && !appReady) {
      initializeEditors(t.welcome.title, t.welcome.content)
      setAppReady(true)
    }
  }, [isInitialized, appReady, initializeEditors, t.welcome.title, t.welcome.content])

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
