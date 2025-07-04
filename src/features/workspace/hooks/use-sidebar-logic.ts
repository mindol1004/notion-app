"use client"

import { useEffect, useMemo } from "react"
import { useEditorState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import { useSession } from "next-auth/react"

export function useSidebarLogic() {
  const { editors, setCurrentEditorId, fetchEditors, createNewEditor } = useEditorState()
  const { searchQuery, setViewMode, setIsEditing, setSearchQuery } = useUIState()
  const { status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      fetchEditors()
    }
  }, [status, fetchEditors])

  const filteredEditors = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      return editors
    }

    return editors.filter((editor) => editor.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [editors, searchQuery])

  const showCreateOption = searchQuery && searchQuery.trim() !== "" && filteredEditors.length === 0

  const handleCreateEditor = async () => {
    const newEditor = await createNewEditor()
    if (newEditor) {
      setCurrentEditorId(newEditor.id)
      setIsEditing(true)
      setViewMode("editor")
    }
  }

  const handleCreateSearchEditor = async () => {
    const trimmedQuery = searchQuery.trim()
    const newEditor = await createNewEditor(trimmedQuery)
    if (newEditor) {
      setCurrentEditorId(newEditor.id)
      setIsEditing(true)
      setViewMode("editor")
      setSearchQuery("")
    }
  }

  return {
    filteredEditors,
    showCreateOption,
    searchQuery,
    handleCreateEditor,
    handleCreateSearchEditor,
  }
}
