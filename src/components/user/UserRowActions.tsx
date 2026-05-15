"use client"

import { EyeIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type UserRowActionsProps = {
  rowLabel: string
  /** When false, Delete is hidden (e.g. current session user). */
  canDelete?: boolean
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

export function UserRowActions({
  rowLabel,
  canDelete = true,
  onView,
  onEdit,
  onDelete,
}: UserRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground data-open:bg-muted"
          aria-label={`Actions for ${rowLabel}`}
        >
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onSelect={() => {
            onView()
          }}
        >
          <EyeIcon className="size-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onSelect={() => {
            onEdit()
          }}
        >
          <PencilIcon className="size-4" />
          Edit
        </DropdownMenuItem>
        {canDelete ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer gap-2"
              onSelect={() => {
                onDelete()
              }}
            >
              <Trash2Icon className="size-4" />
              Delete
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
