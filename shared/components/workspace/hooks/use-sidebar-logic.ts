"use client"

import { useMemo } from "react"
import { useEditorState } from "@/shared/hooks/use-global-state"
import { useI18nState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"

export function useSidebarLogic() {
  const { editors, createNewEditor, setCurrentEditorId } = useEditorState()
  const { t } = useI18nState()
  const { searchQuery, setViewMode, setIsEditing, setSearchQuery } = useUIState()

  const filteredEditors = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      return editors
    }

    return editors.filter((editor) => editor.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [editors, searchQuery])

  const showCreateOption = searchQuery && searchQuery.trim() !== "" && filteredEditors.length === 0

  const handleCreateEditor = () => {
    const newEditor = createNewEditor()
    setCurrentEditorId(newEditor.id)
    setIsEditing(true)
    setViewMode("editor")
  }

  const handleCreateSearchEditor = () => {
    const trimmedQuery = searchQuery.trim()
    const newEditor = createNewEditor(trimmedQuery)
    setCurrentEditorId(newEditor.id)
    setIsEditing(true)
    setViewMode("editor")
    // 검색어 초기화
    setSearchQuery("")
  }

  return {
    filteredEditors,
    showCreateOption,
    searchQuery,
    t,
    handleCreateEditor,
    handleCreateSearchEditor,
  }
}
