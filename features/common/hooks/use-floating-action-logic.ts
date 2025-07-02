"use client"

import { useState, useEffect } from "react"
import { useEditorState } from "@/shared/hooks/use-global-state"
import { useThemeState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import { useMobile } from "@/shared/hooks/use-mobile"
import { useTranslation } from "react-i18next"

export function useFloatingActionLogic() {
  const { createNewEditor } = useEditorState()
  const { t } = useTranslation()
  const { isDarkMode } = useThemeState()
  const { setIsEditing, setViewMode } = useUIState()
  const isMobile = useMobile()

  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(!(currentScrollY > lastScrollY && currentScrollY > 100))
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile, lastScrollY])

  const handleClick = () => {
    setIsPressed(true)
    createNewEditor() // 빈 제목으로 생성
    setIsEditing(true)
    setViewMode("editor")
    setTimeout(() => setIsPressed(false), 150)
  }

  const buttonColors = isDarkMode
    ? "bg-gradient-to-r from-slate-100 to-white hover:from-white hover:to-slate-50 border border-slate-200"
    : "bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-slate-700"

  const iconColor = isDarkMode ? "text-slate-700" : "text-white"

  return {
    isMobile,
    isVisible,
    isPressed,
    buttonColors,
    iconColor,
    t,
    handleClick,
  }
}
