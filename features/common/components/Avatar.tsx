"use client"

import { Avatar as UIAvatar, AvatarFallback } from "@/components/ui/avatar"

interface AvatarProps {
  fallback: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
}

export function Avatar({ fallback, size = "md", className }: AvatarProps) {
  return (
    <UIAvatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarFallback className="text-xs bg-gradient-to-br from-purple-500 to-blue-500 text-white">
        {fallback}
      </AvatarFallback>
    </UIAvatar>
  )
}
