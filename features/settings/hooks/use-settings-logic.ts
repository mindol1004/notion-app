"use client"

import { useThemeState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import type { Locale } from "@/shared/stores/i18n-store"
import type { ThemeMode } from "@/shared/types/common"
import { useTranslation } from "react-i18next"

export function useSettingsLogic() {
  const { theme, isDarkMode, setTheme } = useThemeState()
  const { setViewMode } = useUIState()
  const { i18n } = useTranslation()

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as ThemeMode)
  }

  const handleLanguageChange = (newLocale: string) => {
    i18n.changeLanguage(newLocale as Locale)
  }

  const handleBack = () => {
    setViewMode("editor")
  }

  return {
    theme,
    isDarkMode,
    locale: i18n.language,
    handleThemeChange,
    handleLanguageChange,
    handleBack,
  }
}
