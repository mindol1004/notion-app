"use client"

import { MoreHorizontal, Sun, Moon, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from "../common/Avatar"
import { Icon } from "../common/Icon"
import { useWorkspaceHeaderLogic } from "./hooks/use-workspace-header-logic"

export function WorkspaceHeader() {
  const { isDarkMode, t, toggleTheme, handleSettingsClick } = useWorkspaceHeaderLogic()

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Avatar fallback="W" size="md" />
        <span className="font-semibold text-sm">{t.sidebar.workspace}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center h-6 w-6 rounded hover:bg-accent transition-colors focus:outline-none focus-visible:outline-none focus-visible:ring-0">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
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
