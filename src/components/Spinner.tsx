import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

export type SpinnerProps = {
  className?: string
  "aria-label"?: string
}

export function Spinner({
  className,
  "aria-label": ariaLabel = "Loading",
}: SpinnerProps) {
  return (
    <Loader2
      role="status"
      aria-label={ariaLabel}
      className={cn(
        "size-4 shrink-0 animate-spin text-muted-foreground",
        className
      )}
    />
  )
}
