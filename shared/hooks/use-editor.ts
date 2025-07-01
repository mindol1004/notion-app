"use client"

import { useEditorStore } from "@/shared/stores/editor-store"

export function useEditor() {
  return useEditorStore()
}
