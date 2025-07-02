"use client"

import { useEffect, useState } from "react"
import { useEditorState } from "@/shared/hooks/use-global-state"
import { useThemeState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import { useTranslation } from "react-i18next"

export function useAppLogic() {
  const { isInitialized, initializeEditors } = useEditorState()
  const { isDarkMode } = useThemeState()
  const { viewMode } = useUIState()
  const { t } = useTranslation()
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    if (!isInitialized && !appReady) {
      initializeEditors(t('welcome.title'), t('welcome.content'))
      setAppReady(true)
    }
  }, [isInitialized, appReady, initializeEditors, t])

  return {
    appReady,
    isInitialized,
    isDarkMode,
    viewMode,
  }
}
