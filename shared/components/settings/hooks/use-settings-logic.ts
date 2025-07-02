"use client"

import { useThemeState } from "@/shared/hooks/use-global-state"
import { useI18nState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import type { Locale } from "@/shared/stores/i18n-store"
import type { ThemeMode } from "@/shared/types/common"

export function useSettingsLogic() {
  const { theme, isDarkMode, setTheme } = useThemeState()
  const { locale, t, changeLanguage } = useI18nState()
  const { setViewMode } = useUIState()

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as ThemeMode)
  }

  const handleLanguageChange = (newLocale: string) => {
    changeLanguage(newLocale as Locale)
  }

  const handleBack = () => {
    setViewMode("editor")
  }

  return {
    theme,
    isDarkMode,
    locale,
    t,
    handleThemeChange,
    handleLanguageChange,
    handleBack,
  }
}
