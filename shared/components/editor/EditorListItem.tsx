"use client"

import { FileText, MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Icon } from "../common/Icon"
import { formatFullDate } from "@/shared/utils/date"
import { useEditor } from "@/shared/hooks/use-editor"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useUI } from "@/shared/hooks/use-ui"
import { useMobile } from "@/shared/hooks/use-mobile"
import type { Editor } from "@/types"

interface EditorListItemProps {
  editor: Editor
}

export function EditorListItem({ editor }: EditorListItemProps) {
  const { currentEditorId, setCurrentEditorId, deleteEditor } = useEditor()
  const { locale, t } = useI18n()
  const { setViewMode } = useUI()
  const isMobile = useMobile()

  const isActive = currentEditorId === editor.id
  const createdAt = new Date(editor.createdAt)
  const updatedAt = new Date(editor.updatedAt)
  const createdDate = formatFullDate(createdAt, locale)
  const updatedDate = formatFullDate(updatedAt, locale)
  const isUpdated = updatedAt.getTime() !== createdAt.getTime()

  const handleClick = () => {
    setCurrentEditorId(editor.id)
    setViewMode("editor")
    if (isMobile) {
      const sidebarTrigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement
      sidebarTrigger?.click()
    }
  }

  const handleDelete = () => {
    deleteEditor(editor.id)
  }

  return (
    <SidebarMenuItem>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild isActive={isActive} className="group">
              <div className="flex items-center justify-between cursor-pointer" onClick={handleClick}>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Icon icon={FileText} className="text-muted-foreground" />
                  <span className="truncate text-sm">{editor.title || t.sidebar.untitled}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon icon={MoreHorizontal} size="sm" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete()
                      }}
                      className="text-destructive"
                    >
                      <Icon icon={Trash2} className="mr-2" />
                      {t.common.delete}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs max-w-xs">
            <div className="space-y-1">
              <div>
                <strong>{t.editor.createdAt}:</strong> {createdDate}
              </div>
              {isUpdated && (
                <div>
                  <strong>{t.editor.updatedAt}:</strong> {updatedDate}
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SidebarMenuItem>
  )
}
