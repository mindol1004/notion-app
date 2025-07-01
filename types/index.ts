export interface Editor {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export type ViewMode = "editor" | "settings"
export type ThemeMode = "light" | "dark" | "system"
