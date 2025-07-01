"use client"

import { create } from "zustand"
import type { ViewMode } from "@/types"

interface UIState {
  isEditing: boolean
  setIsEditing: (editing: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

export const useUIStore = create<UIState>((set) => ({
  isEditing: false,
  setIsEditing: (editing: boolean) => set({ isEditing: editing }),
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  viewMode: "editor",
  setViewMode: (mode: ViewMode) => set({ viewMode: mode }),
}))
