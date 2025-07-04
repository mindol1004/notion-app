"use client"

import { create } from "zustand"
import type { Editor } from "@/features/editor/types/editor"

interface EditorState {
  editors: Editor[]
  currentEditorId: string
  currentEditor: Editor | undefined
  isLoading: boolean
  error: string | null
  setEditors: (editors: Editor[]) => void
  setCurrentEditorId: (id: string) => void
  updateEditor: (id: string, updates: Partial<Editor>) => void
  fetchEditors: () => Promise<void>
  createNewEditor: (initialTitle?: string) => Promise<Editor | undefined>
  deleteEditor: (id: string) => Promise<void>
}

export const useEditorStore = create<EditorState>()(
  (set, get) => ({
    editors: [],
    currentEditorId: "",
    currentEditor: undefined,
    isLoading: false,
    error: null,

    setEditors: (editors: Editor[]) => {
      let currentEditorId = get().currentEditorId
      let currentEditor = get().currentEditor

      if (!currentEditorId || !editors.some(e => e.id === currentEditorId)) {
        if (editors.length > 0) {
          currentEditorId = editors[0].id
          currentEditor = editors[0]
        } else {
          currentEditorId = ""
          currentEditor = undefined
        }
      }

      set({
        editors: editors,
        currentEditorId: currentEditorId,
        currentEditor: currentEditor,
      })
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

    fetchEditors: async () => {
      set({ isLoading: true, error: null })
      try {
        const response = await fetch('/api/editor/list')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Editor[] = await response.json()
        const editorsWithDates = data.map(editor => ({
          ...editor,
          createdAt: new Date(editor.createdAt),
          updatedAt: new Date(editor.updatedAt),
        }))
        get().setEditors(editorsWithDates)
        set({ isLoading: false })
      } catch (error: any) {
        console.error("Failed to fetch editors:", error)
        set({ isLoading: false, error: error.message })
      }
    },

    createNewEditor: async (initialTitle = "") => {
      set({ isLoading: true, error: null })
      try {
        const response = await fetch('/api/editor/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: initialTitle }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const newEditor: Editor = await response.json()
        const editorWithDates = {
          ...newEditor,
          createdAt: new Date(newEditor.createdAt),
          updatedAt: new Date(newEditor.updatedAt),
        }
        set(state => ({
          editors: [...state.editors, editorWithDates],
          currentEditorId: editorWithDates.id,
          currentEditor: editorWithDates,
          isLoading: false,
        }))
        return editorWithDates
      } catch (error: any) {
        console.error("Failed to create editor:", error)
        set({ isLoading: false, error: error.message })
        return undefined
      }
    },

    deleteEditor: async (id: string) => {
      set({ isLoading: true, error: null })
      try {
        const response = await fetch('/api/editor/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ editorId: id }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        set(state => {
          const newEditors = state.editors.filter(editor => editor.id !== id)
          let newCurrentEditorId = state.currentEditorId
          let newCurrentEditor = state.currentEditor

          if (newCurrentEditorId === id) {
            newCurrentEditorId = newEditors.length > 0 ? newEditors[0].id : ""
            newCurrentEditor = newEditors.length > 0 ? newEditors[0] : undefined
          }

          return {
            editors: newEditors,
            currentEditorId: newCurrentEditorId,
            currentEditor: newCurrentEditor,
            isLoading: false,
          }
        })
      } catch (error: any) {
        console.error("Failed to delete editor:", error)
        set({ isLoading: false, error: error.message })
      }
    },
  }),
)
