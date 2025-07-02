"use client"

import { useEditorStore } from "@/shared/stores/editor-store"
import { useThemeStore } from "@/shared/stores/theme-store"
import { useUIStore } from "@/shared/stores/ui-store"

// 전역 상태 관리 hooks
export function useEditorState() {
  return useEditorStore()
}

export function useThemeState() {
  return useThemeStore()
}

export function useUIState() {
  return useUIStore()
}

