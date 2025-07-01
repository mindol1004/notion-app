"use client"

import { Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Icon } from "./Icon"
import { useEditor } from "@/shared/hooks/use-editor"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useTheme } from "@/shared/hooks/use-theme"
import { useUI } from "@/shared/hooks/use-ui"
import { useMobile } from "@/shared/hooks/use-mobile"

export function FloatingActionButton() {
  const { createNewEditor } = useEditor()
  const { t } = useI18n()
  const { isDarkMode } = useTheme()
  const { setIsEditing, setViewMode } = useUI()
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
    createNewEditor()
    setIsEditing(true)
    setViewMode("editor")
    setTimeout(() => setIsPressed(false), 150)
  }

  if (!isMobile) return null

  const buttonColors = isDarkMode
    ? "bg-gradient-to-r from-slate-100 to-white hover:from-white hover:to-slate-50 border border-slate-200"
    : "bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-slate-700"

  const iconColor = isDarkMode ? "text-slate-700" : "text-white"

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className={`fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-xl transition-all duration-300 z-50 ${buttonColors} group ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      } ${isPressed ? "scale-95" : "hover:scale-110"}`}
      aria-label={`${t.common.create} ${t.sidebar.pages}`}
    >
      <Icon icon={Edit3} className={`${iconColor} transition-transform duration-200 group-hover:rotate-12`} size="lg" />
    </Button>
  )
}
