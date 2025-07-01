"use client"

import { useI18nStore } from "@/shared/stores/i18n-store"

export function useI18n() {
  return useI18nStore()
}
