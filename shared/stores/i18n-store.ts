"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Locale } from "@/i18n/locales"
import { locales } from "@/i18n/locales"

interface I18nState {
  locale: Locale
  t: typeof locales.ko
  changeLanguage: (newLocale: Locale) => void
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      locale: "ko",
      t: locales.ko,
      changeLanguage: (newLocale: Locale) => {
        set({
          locale: newLocale,
          t: locales[newLocale],
        })
      },
    }),
    {
      name: "i18n-storage",
      partialize: (state) => ({
        locale: state.locale,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.t = locales[state.locale]
        }
      },
    },
  ),
)
