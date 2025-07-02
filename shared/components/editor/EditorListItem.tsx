"use client"

import type React from "react"

import { FileText, MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Icon } from "../common/Icon"
import { useEditorListLogic } from "./hooks/use-editor-list-logic"
import type { Editor } from "./types/editor"

interface EditorListItemProps {
  editor: Editor
}

export function EditorListItem({ editor }: EditorListItemProps) {
  const { isActive, createdDate, updatedDate, isUpdated, t, handleClick, handleDelete } = useEditorListLogic(editor)

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleDelete()
  }

  return (
    <TooltipProvider>
      <SidebarMenuItem className="group/item">
        <div className="flex items-center justify-between w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton asChild isActive={isActive} className="flex-1 mr-2">
                <div className="flex items-center gap-2 min-w-0 cursor-pointer" onClick={handleClick}>
                  <Icon icon={FileText} className="text-muted-foreground" />
                  <span className="truncate text-sm">{editor.title || t.sidebar.untitled}</span>
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

          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center justify-center h-6 w-6 rounded flex-shrink-0 opacity-0 group-hover/item:opacity-100 hover:bg-accent transition-opacity duration-200 ease-in-out focus:outline-none focus-visible:outline-none focus-visible:ring-0"
              onClick={handleTriggerClick}
            >
              <MoreHorizontal className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="right"
              className="w-32"
              sideOffset={8}
              alignOffset={0}
              style={{ zIndex: 99999 }}
              container={typeof document !== "undefined" ? document.body : undefined}
            >
              <DropdownMenuItem onClick={handleDeleteClick} className="text-destructive focus:text-destructive">
                <Icon icon={Trash2} className="mr-2" />
                {t.common.delete}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarMenuItem>
    </TooltipProvider>
  )
}
