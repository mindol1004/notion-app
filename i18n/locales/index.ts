import { ko } from "@/i18n/locales/ko"
import { en } from "@/i18n/locales/en"

export const locales = {
  ko,
  en,
} as const

export type Locale = keyof typeof locales
export type LocaleKeys = typeof ko
