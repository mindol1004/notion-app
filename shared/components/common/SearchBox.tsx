"use client"

import { Search, X } from "lucide-react"
import { SidebarInput } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Icon } from "./Icon"
import { useUI } from "@/shared/hooks/use-ui"

interface SearchBoxProps {
  placeholder: string
}

export function SearchBox({ placeholder }: SearchBoxProps) {
  const { searchQuery, setSearchQuery } = useUI()

  const handleClear = () => {
    setSearchQuery("")
  }

  return (
    <div className="relative">
      <Icon icon={Search} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <SidebarInput
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8 pr-8"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-accent"
        >
          <Icon icon={X} size="sm" />
        </Button>
      )}
    </div>
  )
}
