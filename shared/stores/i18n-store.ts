"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// 직접 locales 정의
const ko = {
  common: {
    save: "저장",
    cancel: "취소",
    delete: "삭제",
    edit: "편집",
    preview: "미리보기",
    search: "검색",
    settings: "설정",
    close: "닫기",
    back: "뒤로",
    create: "생성",
  },
  sidebar: {
    workspace: "워크스페이스",
    pages: "페이지",
    searchPages: "페이지 검색...",
    lightMode: "라이트 모드",
    darkMode: "다크 모드",
    untitled: "제목 없음",
  },
  editor: {
    untitled: "제목 없음",
    startWriting: "작성을 시작하세요...",
    createdAt: "생성일",
    updatedAt: "수정일",
    lastEdited: "마지막 편집",
  },
  settings: {
    title: "설정",
    general: "일반",
    language: "언어",
    theme: "테마",
    appearance: "외관",
    about: "정보",
    version: "버전",
    selectLanguage: "언어 선택",
    selectTheme: "테마 선택",
    light: "라이트",
    dark: "다크",
    system: "시스템",
    korean: "한국어",
    english: "English",
    description: "이 워크스페이스의 설정을 관리합니다.",
    languageDescription: "인터페이스 언어를 선택하세요.",
    themeDescription: "앱의 외관을 선택하세요.",
  },
  welcome: {
    title: "워크스페이스에 오신 것을 환영합니다",
    content: `# 워크스페이스에 오신 것을 환영합니다

노트와 문서를 생성, 정리, 관리할 수 있는 개인 워크스페이스입니다.

## 시작하기

- + 버튼을 클릭하여 새 페이지를 만드세요
- 사이드바를 사용하여 페이지 간 이동하세요
- 이 페이지를 편집하려면 입력을 시작하세요

## 기능

- **깔끔한 인터페이스**: 집중할 수 있는 글쓰기 환경
- **빠른 검색**: 콘텐츠를 즉시 찾을 수 있습니다
- **반응형 디자인**: 모든 기기에서 작동합니다
- **다크 모드**: 눈에 편안합니다
- **다국어 지원**: 한국어와 영어를 지원합니다

첫 번째 페이지를 만들고 생각을 정리해보세요!`,
  },
}

const en = {
  common: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    preview: "Preview",
    search: "Search",
    settings: "Settings",
    close: "Close",
    back: "Back",
    create: "Create",
  },
  sidebar: {
    workspace: "Workspace",
    pages: "Pages",
    searchPages: "Search pages...",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    untitled: "Untitled",
  },
  editor: {
    untitled: "Untitled",
    startWriting: "Start writing...",
    createdAt: "Created",
    updatedAt: "Updated",
    lastEdited: "Last edited",
  },
  settings: {
    title: "Settings",
    general: "General",
    language: "Language",
    theme: "Theme",
    appearance: "Appearance",
    about: "About",
    version: "Version",
    selectLanguage: "Select Language",
    selectTheme: "Select Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    korean: "한국어",
    english: "English",
    description: "Manage your workspace settings.",
    languageDescription: "Choose your interface language.",
    themeDescription: "Choose your app appearance.",
  },
  welcome: {
    title: "Welcome to Your Workspace",
    content: `# Welcome to Your Workspace

This is your personal workspace where you can create, organize, and manage your notes and documents.

## Getting Started

- Click the + button to create a new page
- Use the sidebar to navigate between pages
- Start typing to edit this page

## Features

- **Clean Interface**: Distraction-free writing environment
- **Quick Search**: Find your content instantly
- **Responsive Design**: Works on all devices
- **Dark Mode**: Easy on the eyes
- **Multi-language**: Supports Korean and English

Start creating your first page and organize your thoughts!`,
  },
}

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
