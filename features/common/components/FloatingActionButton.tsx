"use client"

import { Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/features/common/components/Icon"
import { useFloatingActionLogic } from "@/features/common/hooks/use-floating-action-logic"
import { useTranslation } from "react-i18next"

export function FloatingActionButton() {
  const { isMobile, isVisible, isPressed, buttonColors, iconColor, t, handleClick } = useFloatingActionLogic()
  const { t: i18nT } = useTranslation()

  if (!isMobile) return null

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className={`fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-xl transition-all duration-300 z-50 ${buttonColors} group ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      } ${isPressed ? "scale-95" : "hover:scale-110"}`}
      aria-label={`${i18nT('common.create')} ${i18nT('sidebar.pages')}`}
    >
      <Icon icon={Edit3} className={`${iconColor} transition-transform duration-200 group-hover:rotate-12`} size="lg" />
    </Button>
  )
}
