"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ThemeMode } from "@/types"

interface ThemeState {
  isDarkMode: boolean
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      toggleTheme: () => {
        const { isDarkMode } = get()
        const newMode = !isDarkMode
        set({ isDarkMode: newMode })

        // Apply theme immediately
        if (typeof window !== "undefined") {
          if (newMode) {
            document.documentElement.classList.add("dark")
          } else {
            document.documentElement.classList.remove("dark")
          }
        }
      },
      setTheme: (theme: ThemeMode) => {
        const { isDarkMode } = get()
        if (theme === "system") {
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
          if (isDarkMode !== prefersDark) {
            get().toggleTheme()
          }
        } else {
          const shouldBeDark = theme === "dark"
          if (isDarkMode !== shouldBeDark) {
            get().toggleTheme()
          }
        }
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== "undefined") {
          if (state.isDarkMode) {
            document.documentElement.classList.add("dark")
          } else {
            document.documentElement.classList.remove("dark")
          }
        }
      },
    },
  ),
)
