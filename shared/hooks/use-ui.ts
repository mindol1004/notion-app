"use client"

import { useUIStore } from "@/shared/stores/ui-store"

export function useUI() {
  return useUIStore()
}
