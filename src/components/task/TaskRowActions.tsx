"use client"

import { MoreHorizontalIcon, PencilIcon, Trash2Icon, EyeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type TaskRowActionsProps = {
  rowLabel: string
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

export function TaskRowActions({
  rowLabel,
  onView,
  onEdit,
  onDelete,
}: TaskRowActionsProps) {
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
