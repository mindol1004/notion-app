"use client"

import { useEditorStore } from "@/shared/stores/editor-store"
import { useI18nStore } from "@/shared/stores/i18n-store"
import { useThemeStore } from "@/shared/stores/theme-store"
import { useUIStore } from "@/shared/stores/ui-store"

// 전역 상태 관리 hooks
export function useEditorState() {
  return useEditorStore()
}

export function useI18nState() {
  return useI18nStore()
}

export function useThemeState() {
  return useThemeStore()
}

export function useUIState() {
  return useUIStore()
}
