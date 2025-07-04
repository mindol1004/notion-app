"use client"

import { useEditorState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import { useMobile } from "@/shared/hooks/use-mobile"
import { formatFullDate } from "@/shared/utils/date"
import type { Editor } from "../types/editor"
import { useTranslation } from "react-i18next"

export function useEditorListLogic(editor: Editor) {
  const { currentEditorId, setCurrentEditorId, deleteEditor } = useEditorState()
  const { setViewMode } = useUIState()
  const isMobile = useMobile()
  const { i18n } = useTranslation()

  const isActive = currentEditorId === editor.id
  const createdAt = new Date(editor.createdAt)
  const updatedAt = new Date(editor.updatedAt)
  const createdDate = formatFullDate(createdAt, i18n.language)
  const updatedDate = formatFullDate(updatedAt, i18n.language)
  const isUpdated = updatedAt.getTime() !== createdAt.getTime()

  const handleClick = () => {
    setCurrentEditorId(editor.id)
    setViewMode("editor")
    if (isMobile) {
      const sidebarTrigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement
      sidebarTrigger?.click()
    }
  }

  const handleDelete = async () => {
    await deleteEditor(editor.id)
  }

  return {
    isActive,
    createdDate,
    updatedDate,
    isUpdated,
    handleClick,
    handleDelete,
  }
}
