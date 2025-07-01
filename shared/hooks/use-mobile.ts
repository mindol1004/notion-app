"use client"

import { useEffect, useState } from "react"
import { BREAKPOINTS } from "@/shared/constants"

/**
 * Pure React hook that returns `true` when the viewport width is below the
 * `BREAKPOINTS.MOBILE` threshold. No global state, no side-effects → no loops.
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE)
    }

    handleResize() // initial run
    window.addEventListener("resize", handleResize, { passive: true })
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}
