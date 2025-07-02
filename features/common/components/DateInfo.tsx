"use client"

import { Clock } from "lucide-react"
import { Icon } from "@/features/common/components/Icon"
import { formatDate } from "@/shared/utils/date"

interface DateInfoProps {
  createdAt: Date
  updatedAt: Date
  locale: string
  labels: {
    createdAt: string
    lastEdited: string
  }
}

export function DateInfo({ createdAt, updatedAt, locale, labels }: DateInfoProps) {
  const created = new Date(createdAt)
  const updated = new Date(updatedAt)
  const isUpdated = updated.getTime() !== created.getTime()

  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <Icon icon={Clock} size="sm" />
        <span>
          {labels.createdAt}: {formatDate(created, locale)}
        </span>
      </div>
      {isUpdated && (
        <div className="flex items-center gap-1">
          <span>•</span>
          <span>
            {labels.lastEdited}: {formatDate(updated, locale)}
          </span>
        </div>
      )}
    </div>
  )
}
