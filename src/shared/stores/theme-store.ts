"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useEffect } from "react"
import type { ThemeMode } from "@/shared/types/common"

interface ThemeState {
  theme: ThemeMode
  isDarkMode: boolean
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
  updateDarkMode: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      isDarkMode: false,

      setTheme: (theme) => {
        set({ theme })
        get().updateDarkMode()
      },

      toggleTheme: () => {
        const { theme } = get()
        const newTheme = theme === "dark" ? "light" : "dark"
        set({ theme: newTheme })
        get().updateDarkMode()
      },

      updateDarkMode: () => {
        const { theme } = get()
        let isDark = false

        if (theme === "dark") {
          isDark = true
        } else if (theme === "light") {
          isDark = false
        } else {
          // system
          isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        }

        set({ isDarkMode: isDark })

        // HTML 요소에 dark 클래스 적용/제거
        if (isDark) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          // 초기화 시 다크모드 상태 업데이트
          setTimeout(() => {
            state.updateDarkMode()
          }, 0)
        }
      },
    },
  ),
)

// 시스템 테마 변경 감지를 위한 훅
export function useThemeEffect() {
  const updateDarkMode = useThemeStore((state) => state.updateDarkMode)
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    // 초기 다크모드 상태 설정
    updateDarkMode()

    // 시스템 테마가 변경될 때만 감지 (theme이 "system"일 때)
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => {
        if (useThemeStore.getState().theme === "system") {
          updateDarkMode()
        }
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, updateDarkMode])
}
