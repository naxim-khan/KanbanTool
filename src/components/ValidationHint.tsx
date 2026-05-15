import { AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

export type ValidationHintProps = {
  /** Associates the hint with the control (`aria-describedby`). */
  id?: string
  message?: string | null
  className?: string
}

/**
 * Reserved height so validation messages don’t shift layout when they appear.
 */
const HINT_SLOT =
  "box-border flex min-h-7 h-7 w-full shrink-0 flex-col justify-center overflow-hidden"

export function ValidationHint({
  id,
  message,
  className,
}: ValidationHintProps) {
  const text = message?.trim()

  return (
    <div
      className={cn(HINT_SLOT, className)}
      aria-live="polite"
      aria-atomic="true"
    >
      {text ? (
        <p
          id={id}
          role="alert"
          className="border-destructive/20 bg-destructive/[0.07] text-destructive flex max-h-full w-full items-center gap-1.5 overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium leading-snug ring-1 ring-destructive/10 ring-inset sm:text-[0.8125rem] dark:border-destructive/30 dark:bg-destructive/10 dark:ring-destructive/15"
        >
          <AlertCircle
            className="text-destructive/90 size-3.5 shrink-0 sm:size-4"
            strokeWidth={2}
            aria-hidden
          />
          <span className="line-clamp-1 min-w-0 flex-1" title={text}>
            {text}
          </span>
        </p>
      ) : null}
    </div>
  )
}
