"use client"

import { MoreHorizontal, Sun, Moon, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from "../common/Avatar"
import { Icon } from "../common/Icon"
import { useTheme } from "@/shared/hooks/use-theme"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useUI } from "@/shared/hooks/use-ui"
import { useMobile } from "@/shared/hooks/use-mobile"

export function WorkspaceHeader() {
  const { isDarkMode, toggleTheme } = useTheme()
  const { t } = useI18n()
  const { setViewMode } = useUI()
  const isMobile = useMobile()

  const handleSettingsClick = () => {
    setViewMode("settings")
    if (isMobile) {
      const sidebarTrigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement
      sidebarTrigger?.click()
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar fallback="W" size="md" />
        <span className="font-semibold text-sm">{t.sidebar.workspace}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Icon icon={MoreHorizontal} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={toggleTheme}>
            <Icon icon={isDarkMode ? Sun : Moon} className="mr-2" />
            {isDarkMode ? t.sidebar.lightMode : t.sidebar.darkMode}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSettingsClick}>
            <Icon icon={Settings} className="mr-2" />
            {t.common.settings}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
