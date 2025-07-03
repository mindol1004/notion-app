"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import ko from "@/i18n/locales/ko.json"
import en from "@/i18n/locales/en.json"

const locales = { ko, en } as const

export type Locale = keyof typeof locales
export type LocaleKeys = typeof ko

interface I18nState {
  locale: Locale
  t: typeof ko
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
