"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { WorkspaceHeader } from "./WorkspaceHeader"
import { SearchBox } from "../common/SearchBox"
import { EditorListItem } from "../editor/EditorListItem"
import { Icon } from "../common/Icon"
import { useEditor } from "@/shared/hooks/use-editor"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useUI } from "@/shared/hooks/use-ui"
import { useMemo } from "react"

export function AppSidebar() {
  const { editors, createNewEditor, updateEditor } = useEditor()
  const { t } = useI18n()
  const { searchQuery, setIsEditing, setViewMode, setSearchQuery } = useUI()

  const { filteredEditors, showCreateOption } = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()

    if (!query) {
      return { filteredEditors: editors, showCreateOption: false }
    }

    const filtered = editors.filter(
      (editor) => editor.title.toLowerCase().includes(query) || editor.content.toLowerCase().includes(query),
    )

    const exactMatch = editors.some((editor) => editor.title.toLowerCase() === query)

    return {
      filteredEditors: filtered,
      showCreateOption: query.length > 0 && !exactMatch,
    }
  }, [editors, searchQuery])

  const handleCreateEditor = () => {
    createNewEditor()
    setIsEditing(true)
    setViewMode("editor")
  }

  const handleCreateSearchEditor = () => {
    const newEditor = createNewEditor()
    if (searchQuery.trim()) {
      updateEditor(newEditor.id, { title: searchQuery.trim() })
    }
    setIsEditing(true)
    setViewMode("editor")
    setSearchQuery("")
  }

  return (
    <TooltipProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b px-4 py-3">
          <WorkspaceHeader />
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarGroup>
            <div className="px-2 py-2">
              <SearchBox placeholder={t.sidebar.searchPages} />
            </div>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between px-2">
              <span>{t.sidebar.pages}</span>
              <Button variant="ghost" size="sm" onClick={handleCreateEditor} className="h-5 w-5 p-0 hover:bg-accent">
                <Icon icon={Plus} size="sm" />
              </Button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {showCreateOption && (
                  <div className="px-2 py-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCreateSearchEditor}
                      className="w-full justify-start text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Icon icon={Plus} size="sm" className="mr-2" />"{searchQuery}" {t.common.create}
                    </Button>
                  </div>
                )}

                {filteredEditors.map((editor) => (
                  <EditorListItem key={editor.id} editor={editor} />
                ))}

                {searchQuery && filteredEditors.length === 0 && !showCreateOption && (
                  <div className="px-2 py-4 text-center text-xs text-muted-foreground">검색 결과가 없습니다</div>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  )
}
