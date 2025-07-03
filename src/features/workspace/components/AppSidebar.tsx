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
import { WorkspaceHeader } from "@/features/workspace/components/WorkspaceHeader"
import { SearchBox } from "@/features/common/components/SearchBox"
import { EditorListItem } from "@/features/editor/components/EditorListItem"
import { Icon } from "@/features/common/components/Icon"
import { useSidebarLogic } from "@/features/workspace/hooks/use-sidebar-logic"
import { useTranslation } from "react-i18next"

export function AppSidebar() {
  const { filteredEditors, showCreateOption, searchQuery, handleCreateEditor, handleCreateSearchEditor } =
    useSidebarLogic()
  const { t } = useTranslation()

  return (
    <TooltipProvider>
      <Sidebar className="border-r"> {/* Reverted pt-16 */}
        <SidebarHeader className="border-b px-4 py-3">
          <WorkspaceHeader />
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarGroup>
            <div className="px-2 py-2">
              <SearchBox placeholder={t('sidebar.searchPages')} />
            </div>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between px-2">
              <span>{t('sidebar.pages')}</span>
              <button
                onClick={handleCreateEditor}
                className="flex items-center justify-center h-5 w-5 rounded hover:bg-accent transition-colors"
              >
                <Plus className="h-3 w-3" />
              </button>
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
                      <Icon icon={Plus} size="sm" className="mr-2" />"{searchQuery}" {t('common.create')}
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
