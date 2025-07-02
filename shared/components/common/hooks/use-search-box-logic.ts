"use client"

import { useUIState } from "@/shared/hooks/use-global-state"

export function useSearchBoxLogic() {
  const { searchQuery, setSearchQuery } = useUIState()

  const handleClear = () => {
    setSearchQuery("")
  }

  return {
    searchQuery,
    setSearchQuery,
    handleClear,
  }
}
