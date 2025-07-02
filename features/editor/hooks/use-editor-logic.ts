"use client"

import { useEditorState } from "@/shared/hooks/use-global-state"
import { useUIState } from "@/shared/hooks/use-global-state"
import { useTranslation } from "react-i18next"

export function useEditorLogic() {
  const { currentEditor, updateEditor } = useEditorState()
  const { isEditing, setIsEditing } = useUIState()
  const { i18n } = useTranslation()

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
