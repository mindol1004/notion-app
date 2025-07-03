"use client"

import { useEffect, useRef } from "react"
import { FileText, Edit3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { EditorContent } from "./EditorContent"
import { DateInfo } from "@/features/common/components/DateInfo"
import { Icon } from "@/features/common/components/Icon"
import { useEditorLogic } from "@/features/editor/hooks/use-editor-logic"
import { useTranslation } from "react-i18next"

export function Editor() {
  const { t } = useTranslation()
  const { currentEditor, locale, isEditing, handleTitleChange, handleContentChange, toggleEditMode } =
    useEditorLogic()

  const contentTextareaRef = useRef<HTMLTextAreaElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const focusSetRef = useRef<string>("")
  const editModeToggleRef = useRef(false)

  // 새 에디터가 생성되었을 때만 초기 포커스 설정
  useEffect(() => {
    if (currentEditor && isEditing && currentEditor.id !== focusSetRef.current) {
      // 새로운 에디터이고 아직 포커스가 설정되지 않은 경우
      focusSetRef.current = currentEditor.id

      const shouldFocusTitle = !currentEditor.title.trim()

      setTimeout(() => {
        if (shouldFocusTitle) {
          titleInputRef.current?.focus()
        } else {
          contentTextareaRef.current?.focus()
          if (contentTextareaRef.current) {
            const textarea = contentTextareaRef.current
            textarea.setSelectionRange(textarea.value.length, textarea.value.length)
          }
        }
      }, 100)
    }
  }, [currentEditor, isEditing]) // Updated dependency array

  // 편집 모드 토글 시에만 포커스 재설정
  useEffect(() => {
    if (currentEditor && isEditing && editModeToggleRef.current) {
      editModeToggleRef.current = false

      setTimeout(() => {
        if (!currentEditor.title.trim()) {
          titleInputRef.current?.focus()
        } else {
          contentTextareaRef.current?.focus()
          if (contentTextareaRef.current) {
            const textarea = contentTextareaRef.current
            textarea.setSelectionRange(textarea.value.length, textarea.value.length)
          }
        }
      }, 100)
    }
  }, [isEditing])

  // 편집 모드 토글 추적
  const handleToggleEditMode = () => {
    if (!isEditing) {
      editModeToggleRef.current = true
    }
    toggleEditMode()
  }

  if (!currentEditor) return null

  return (
    <div className="flex flex-col h-full">
      <header className="flex flex-col gap-2 border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 flex-1">
            <Icon icon={FileText} className="text-muted-foreground" />
            <Input
              ref={titleInputRef}
              value={currentEditor.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="border-none shadow-none text-sm font-medium bg-transparent px-0 focus-visible:ring-0"
              placeholder={t('editor.untitled')}
              onKeyDown={(e) => {
                // Enter 키를 누르면 내용으로 포커스 이동
                if (e.key === "Enter") {
                  e.preventDefault()
                  contentTextareaRef.current?.focus()
                }
              }}
            />
          </div>
          <Button variant="ghost" size="sm" onClick={handleToggleEditMode} className="gap-2">
            <Icon icon={Edit3} />
            {isEditing ? t('common.preview') : t('common.edit')}
          </Button>
        </div>

        <DateInfo
          createdAt={currentEditor.createdAt}
          updatedAt={currentEditor.updatedAt}
          locale={locale}
          labels={{
            createdAt: t('editor.createdAt'),
            lastEdited: t('editor.lastEdited'),
          }}
        />
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="space-y-4">
            {isEditing ? (
              <Textarea
                ref={contentTextareaRef}
                value={currentEditor.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder={t('editor.startWriting')}
                className="min-h-[600px] border-none shadow-none resize-none text-sm leading-relaxed bg-transparent focus-visible:ring-0"
              />
            ) : (
              <EditorContent content={currentEditor.content} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}