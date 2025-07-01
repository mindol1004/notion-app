"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Editor } from "@/types"

interface EditorState {
  editors: Editor[]
  currentEditorId: string
  currentEditor: Editor | undefined
  isInitialized: boolean
  createNewEditor: () => Editor
  updateEditor: (id: string, updates: Partial<Editor>) => void
  deleteEditor: (id: string) => void
  setCurrentEditorId: (id: string) => void
  initializeEditors: (welcomeTitle: string, welcomeContent: string) => void
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      editors: [],
      currentEditorId: "",
      currentEditor: undefined,
      isInitialized: false,

      createNewEditor: () => {
        const { editors } = get()
        const newEditor: Editor = {
          id: `editor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: "",
          content: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set({
          editors: [...editors, newEditor],
          currentEditorId: newEditor.id,
          currentEditor: newEditor,
        })

        return newEditor
      },

      updateEditor: (id: string, updates: Partial<Editor>) => {
        const { editors, currentEditorId } = get()
        const updatedEditors = editors.map((editor) =>
          editor.id === id ? { ...editor, ...updates, updatedAt: new Date() } : editor,
        )
        const updatedCurrentEditor =
          currentEditorId === id ? updatedEditors.find((editor) => editor.id === id) : get().currentEditor

        set({
          editors: updatedEditors,
          currentEditor: updatedCurrentEditor,
        })
      },

      deleteEditor: (id: string) => {
        const { editors, currentEditorId } = get()
        const newEditors = editors.filter((editor) => editor.id !== id)

        if (newEditors.length === 0) {
          set({
            editors: [],
            currentEditorId: "",
            currentEditor: undefined,
          })
        } else {
          const newCurrentEditorId = currentEditorId === id ? newEditors[0].id : currentEditorId
          const newCurrentEditor = newEditors.find((editor) => editor.id === newCurrentEditorId)
          set({
            editors: newEditors,
            currentEditorId: newCurrentEditorId,
            currentEditor: newCurrentEditor,
          })
        }
      },

      setCurrentEditorId: (id: string) => {
        const { editors } = get()
        const editor = editors.find((e) => e.id === id)
        if (editor) {
          set({
            currentEditorId: id,
            currentEditor: editor,
          })
        }
      },

      initializeEditors: (welcomeTitle: string, welcomeContent: string) => {
        const { editors, isInitialized } = get()

        if (isInitialized) return

        if (editors.length === 0) {
          const welcomeEditor: Editor = {
            id: "welcome-editor",
            title: welcomeTitle,
            content: welcomeContent,
            createdAt: new Date(),
            updatedAt: new Date(),
          }

          set({
            editors: [welcomeEditor],
            currentEditorId: welcomeEditor.id,
            currentEditor: welcomeEditor,
            isInitialized: true,
          })
        } else {
          let { currentEditorId } = get()

          if (!currentEditorId || !editors.find((e) => e.id === currentEditorId)) {
            currentEditorId = editors[0].id
          }

          const currentEditor = editors.find((e) => e.id === currentEditorId)

          set({
            currentEditorId,
            currentEditor,
            isInitialized: true,
          })
        }
      },
    }),
    {
      name: "editor-storage",
      partialize: (state) => ({
        editors: state.editors.map((editor) => ({
          ...editor,
          createdAt: editor.createdAt.toISOString(),
          updatedAt: editor.updatedAt.toISOString(),
        })),
        currentEditorId: state.currentEditorId,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.editors = state.editors.map((editor) => ({
            ...editor,
            createdAt: new Date(editor.createdAt),
            updatedAt: new Date(editor.updatedAt),
          }))

          if (state.currentEditorId) {
            state.currentEditor = state.editors.find((e) => e.id === state.currentEditorId)
          }
        }
      },
    },
  ),
)
