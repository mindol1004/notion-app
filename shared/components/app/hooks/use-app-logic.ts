"use client"

import { useEffect, useState } from "react"
import { useEditorState } from "@/shared/hooks/use-global-state"
import { useI18nState } from "@/shared/hooks/use-global-state"
import { useThemeState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"

export function useAppLogic() {
  const { isInitialized, initializeEditors } = useEditorState()
  const { t } = useI18nState()
  const { isDarkMode } = useThemeState()
  const { viewMode } = useUIState()
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    if (!isInitialized && !appReady) {
      initializeEditors(t.welcome.title, t.welcome.content)
      setAppReady(true)
    }
  }, [isInitialized, appReady, initializeEditors, t.welcome.title, t.welcome.content])

  return {
    appReady,
    isInitialized,
    isDarkMode,
    viewMode,
  }
}
