"use client"

import { useEffect } from "react"
import { useThemeState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"

export function useAppLogic() {
  const { isDarkMode } = useThemeState()
  const { viewMode } = useUIState()

  // No longer need to initialize editors here, as it's handled by useSidebarLogic's fetchEditors on auth status

  return {
    isDarkMode,
    viewMode,
  }
}
