"use client"

import { useThemeState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import { useMobile } from "@/shared/hooks/use-mobile"
import { useTranslation } from "react-i18next"
import { signOut } from "next-auth/react"

export function useWorkspaceHeaderLogic() {
  const { isDarkMode, toggleTheme } = useThemeState()
  const { setViewMode } = useUIState()
  const isMobile = useMobile()
  const { t } = useTranslation()

  const handleSettingsClick = () => {
    setViewMode("settings")
    if (isMobile) {
      const sidebarTrigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement
      sidebarTrigger?.click()
    }
  }

  const handleLogout = async () => {
    await signOut()
  }

  return {
    isDarkMode,
    toggleTheme,
    handleSettingsClick,
    handleLogout,
    t,
  }
}
