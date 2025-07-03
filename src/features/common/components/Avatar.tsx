"use client"

import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarProps {
  fallback: string
  src?: string
  alt?: string // Add optional alt prop
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-6 w-6",  
  lg: "h-8 w-8",
}

export function Avatar({ fallback, src, alt, size = "md", className }: AvatarProps) {
  return (
    <UIAvatar className={`${sizeClasses[size]} ${className}`}>
      {src ? (
        <AvatarImage src={src} alt={alt || fallback} /> // Pass alt prop to AvatarImage
      ) : (
        <AvatarFallback className="text-xs bg-gradient-to-br from-purple-500 to-blue-500 text-white">
          {fallback}
        </AvatarFallback>
      )}
    </UIAvatar>
  )
}
