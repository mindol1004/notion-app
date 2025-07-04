"use client"

import { useEditorState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import { useTranslation } from "react-i18next"
import { useCallback, useMemo } from "react"
import { useDebounce } from "@/shared/hooks/use-debounce"

const EDITOR_CONFIG = {
  DEBOUNCE_DELAYS: {
    TITLE: 500,
    CONTENT: 1000,
  },
  NEW_EDITOR_THRESHOLD: 5000, // 5초
} as const

export function useEditorLogic() {
  const { currentEditor, updateEditor } = useEditorState()
  const { isEditing, setIsEditing } = useUIState()
  const { i18n } = useTranslation()

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
    } catch (error) {
      console.error("Failed to save editor via API:", error)
    }
  }, [])

  // 디바운스된 저장 함수들
  const debouncedSaveTitle = useDebounce(
    (editorId: string, title: string) => saveEditorToDatabase(editorId, { title }),
    EDITOR_CONFIG.DEBOUNCE_DELAYS.TITLE
  )

  const debouncedSaveContent = useDebounce(
    (editorId: string, content: string) => saveEditorToDatabase(editorId, { content }),
    EDITOR_CONFIG.DEBOUNCE_DELAYS.CONTENT
  )

  // 제목 변경 핸들러
  const handleTitleChange = useCallback((title: string) => {
    if (!currentEditor) return
    
    // 즉시 UI 업데이트
    updateEditor(currentEditor.id, { title })
    
    // 디바운스된 저장
    debouncedSaveTitle(currentEditor.id, title)
  }, [currentEditor, updateEditor, debouncedSaveTitle])

  // 내용 변경 핸들러
  const handleContentChange = useCallback((content: string) => {
    if (!currentEditor) return
    
    // 즉시 UI 업데이트
    updateEditor(currentEditor.id, { content })
    
    // 디바운스된 저장
    debouncedSaveContent(currentEditor.id, content)
  }, [currentEditor, updateEditor, debouncedSaveContent])

  // 편집 모드 토글
  const toggleEditMode = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing, setIsEditing])

  // 새로 생성된 에디터인지 확인
  const isNewEditor = useMemo(() => {
    if (!currentEditor) return false
    return Date.now() - currentEditor.createdAt.getTime() < EDITOR_CONFIG.NEW_EDITOR_THRESHOLD
  }, [currentEditor])

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
