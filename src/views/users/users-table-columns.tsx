"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { UserRowActions } from "@/components/user/UserRowActions"
import { Badge } from "@/components/ui/badge"
import type { AdminUserRow } from "@/schemas/user-api.schema"

function formatDate(value: string): string {
  try {
    return format(new Date(value), "MMM d, yyyy")
  } catch {
    return "—"
  }
}

export function createUsersTableColumns(): ColumnDef<AdminUserRow>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("name") as string}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-muted-foreground max-w-[200px] truncate text-sm">
          {row.getValue("email") as string}
        </span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string
        return (
          <Badge variant={role === "ADMIN" ? "default" : "secondary"}>
            {role}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm tabular-nums">
          {formatDate(row.getValue("createdAt"))}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row, table }) => {
        const meta = table.options.meta?.userRowActions
        if (!meta) return null
        const canDelete = meta.sessionUserId !== row.original.id
        return (
          <div className="flex justify-end">
            <UserRowActions
              rowLabel={row.original.name}
              canDelete={canDelete}
              onView={() => meta.onView(row.original)}
              onEdit={() => meta.onEdit(row.original)}
              onDelete={() => meta.onDelete(row.original)}
            />
          </div>
        )
      },
      size: 48,
      enableSorting: false,
      enableHiding: false,
    },
  ]
}
