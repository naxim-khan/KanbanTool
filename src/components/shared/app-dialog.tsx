"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export type AppDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: React.ReactNode
  /** Primary actions (Save, etc.). Omit for read-only dialogs. */
  footer?: React.ReactNode
  contentClassName?: string
  showCloseButton?: boolean
}

/**
 * Reusable shadcn `Dialog` shell: header + body + optional footer.
 * Use for view/edit flows; pair with `ConfirmDialog` for destructive confirms.
 */
export function AppDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  contentClassName,
  showCloseButton = true,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "gap-0 p-0 sm:max-w-md",
          footer ? "pb-0" : undefined,
          contentClassName
        )}
        showCloseButton={showCloseButton}
      >
        <DialogHeader className="border-border space-y-1.5 border-b p-4 text-left">
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        {children ? (
          <div className="max-h-[min(70vh,520px)] overflow-y-auto p-4">
            {children}
          </div>
        ) : null}
        {footer ? (
          <div className="border-border flex flex-col-reverse gap-2 border-t bg-muted/50 p-4 sm:flex-row sm:justify-end">
            {footer}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
