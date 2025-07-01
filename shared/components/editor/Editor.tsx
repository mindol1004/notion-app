"use client"

import { FileText, Edit3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { EditorContent } from "./EditorContent"
import { DateInfo } from "../common/DateInfo"
import { Icon } from "../common/Icon"
import { useEditor } from "@/shared/hooks/use-editor"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useUI } from "@/shared/hooks/use-ui"

export function Editor() {
  const { currentEditor, updateEditor } = useEditor()
  const { locale, t } = useI18n()
  const { isEditing, setIsEditing } = useUI()

  if (!currentEditor) return null

  const handleTitleChange = (title: string) => {
    updateEditor(currentEditor.id, { title })
  }

  const handleContentChange = (content: string) => {
    updateEditor(currentEditor.id, { content })
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex flex-col gap-2 border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 flex-1">
            <Icon icon={FileText} className="text-muted-foreground" />
            <Input
              value={currentEditor.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="border-none shadow-none text-sm font-medium bg-transparent px-0 focus-visible:ring-0"
              placeholder={t.editor.untitled}
            />
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)} className="gap-2">
            <Icon icon={Edit3} />
            {isEditing ? t.common.preview : t.common.edit}
          </Button>
        </div>

        <DateInfo
          createdAt={currentEditor.createdAt}
          updatedAt={currentEditor.updatedAt}
          locale={locale}
          labels={{
            createdAt: t.editor.createdAt,
            lastEdited: t.editor.lastEdited,
          }}
        />
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="space-y-4">
            {isEditing ? (
              <Textarea
                value={currentEditor.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder={t.editor.startWriting}
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
