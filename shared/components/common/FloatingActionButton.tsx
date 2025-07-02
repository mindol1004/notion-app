"use client"

import { Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Icon } from "./Icon"
import { useFloatingActionLogic } from "./hooks/use-floating-action-logic"

export function FloatingActionButton() {
  const { isMobile, isVisible, isPressed, buttonColors, iconColor, t, handleClick } = useFloatingActionLogic()

  if (!isMobile) return null

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
