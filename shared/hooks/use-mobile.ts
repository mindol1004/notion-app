"use client"

import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Pure React hook that returns `true` when the viewport width is below the
 * `MOBILE_BREAKPOINT` threshold. No global state, no side-effects → no loops.
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    handleResize() // initial run
    window.addEventListener("resize", handleResize, { passive: true })
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}
