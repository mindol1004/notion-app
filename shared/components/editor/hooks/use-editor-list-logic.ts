"use client"

import { useEditorState } from "@/shared/hooks/use-global-state"
import { useI18nState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import { useMobile } from "@/shared/hooks/use-mobile"
import { formatFullDate } from "@/shared/utils/date"
import type { Editor } from "../types/editor"

export function useEditorListLogic(editor: Editor) {
  const { currentEditorId, setCurrentEditorId, deleteEditor } = useEditorState()
  const { locale, t } = useI18nState()
  const { setViewMode } = useUIState()
  const isMobile = useMobile()

  const isActive = currentEditorId === editor.id
  const createdAt = new Date(editor.createdAt)
  const updatedAt = new Date(editor.updatedAt)
  const createdDate = formatFullDate(createdAt, locale)
  const updatedDate = formatFullDate(updatedAt, locale)
  const isUpdated = updatedAt.getTime() !== createdAt.getTime()

  const handleClick = () => {
    console.log("Editor clicked:", editor.id)
    setCurrentEditorId(editor.id)
    setViewMode("editor")
    if (isMobile) {
      const sidebarTrigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement
      sidebarTrigger?.click()
    }
  }

  const handleDelete = () => {
    console.log("Delete clicked for editor:", editor.id)
    try {
      deleteEditor(editor.id)
      console.log("Editor deleted successfully")
    } catch (error) {
      console.error("Error deleting editor:", error)
    }
  }

  return {
    isActive,
    createdDate,
    updatedDate,
    isUpdated,
    t,
    handleClick,
    handleDelete,
  }
}
