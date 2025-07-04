"use client"

import { useEditorState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import { useTranslation } from "react-i18next"
import { useCallback, useEffect } from "react"
import { useDebounce } from "@/shared/hooks/use-debounce"

export function useEditorLogic() {
  const { currentEditor, updateEditor } = useEditorState()
  const { isEditing, setIsEditing } = useUIState()
  const { i18n } = useTranslation()

  // Debounce values for saving to database
  const debouncedTitle = useDebounce(currentEditor?.title, 1000) // 1 second debounce
  const debouncedContent = useDebounce(currentEditor?.content, 1000) // 1 second debounce

  const saveEditorToDatabase = useCallback(async (editorId: string, data: { title?: string; content?: string }) => {
    try {
      const response = await fetch('/api/editor/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ editorId, data }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      console.log("Editor saved via API:", editorId, data)
    } catch (error) {
      console.error("Failed to save editor via API:", error)
    }
  }, [])

  // Effect to save debounced title to database
  useEffect(() => {
    if (currentEditor && debouncedTitle !== undefined && debouncedTitle !== currentEditor.title) {
      saveEditorToDatabase(currentEditor.id, { title: debouncedTitle })
    }
  }, [debouncedTitle, currentEditor, saveEditorToDatabase])

  // Effect to save debounced content to database
  useEffect(() => {
    if (currentEditor && debouncedContent !== undefined && debouncedContent !== currentEditor.content) {
      saveEditorToDatabase(currentEditor.id, { content: debouncedContent })
    }
  }, [debouncedContent, currentEditor, saveEditorToDatabase])

  const handleTitleChange = (title: string) => {
    if (currentEditor) {
      updateEditor(currentEditor.id, { title })
    }
  }

  const handleContentChange = (content: string) => {
    if (currentEditor) {
      updateEditor(currentEditor.id, { content })
    }
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  // 새로 생성된 에디터인지 확인 (생성된 지 5초 이내)
  const isNewEditor = currentEditor ? Date.now() - currentEditor.createdAt.getTime() < 5000 : false

  return {
    currentEditor,
    locale: i18n.language,
    isEditing,
    isNewEditor,
    handleTitleChange,
    handleContentChange,
    toggleEditMode,
  }
}
