import { Spinner } from "@/components/Spinner"
import { cn } from "@/lib/utils"

export type PageLoaderProps = {
  message?: string
  className?: string
}

export function PageLoader({ message, className }: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex min-h-[12rem] flex-col items-center justify-center gap-3 p-8",
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner className="size-8" aria-label={message ?? "Loading page"} />
      {message ? (
        <p className="text-center text-sm text-muted-foreground">{message}</p>
      ) : null}
    </div>
  )
}
