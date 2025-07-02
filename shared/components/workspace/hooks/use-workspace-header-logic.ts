"use client"

import { useThemeState } from "@/shared/hooks/use-global-state"
import { useI18nState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import { useMobile } from "@/shared/hooks/use-mobile"

export function useWorkspaceHeaderLogic() {
  const { isDarkMode, toggleTheme } = useThemeState()
  const { t } = useI18nState()
  const { setViewMode } = useUIState()
  const isMobile = useMobile()

  const handleSettingsClick = () => {
    setViewMode("settings")
    if (isMobile) {
      const sidebarTrigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement
      sidebarTrigger?.click()
    }
  }

  return {
    isDarkMode,
    t,
    toggleTheme,
    handleSettingsClick,
  }
}
