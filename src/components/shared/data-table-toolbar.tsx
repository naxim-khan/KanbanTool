"use client"

import { cn } from "@/lib/utils"

type DataTableToolbarProps = {
  children: React.ReactNode
  className?: string
}

/** Optional top row for filters, search, and actions above any `DataTable`. */
export function DataTableToolbar({ children, className }: DataTableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between",
        className
      )}
    >
      {children}
    </div>
  )
}
