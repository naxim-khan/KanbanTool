"use client"

import { useCallback, useMemo, useState } from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { EmptyState } from "@/components/EmptyState"
import { ErrorState } from "@/components/ErrorState"
import { DataTable } from "@/components/shared/data-table"
import { DataTableToolbar } from "@/components/shared/data-table-toolbar"
import { Input } from "@/components/ui/input"
import { useUsers } from "@/hooks/users/useUsers"
import type { AdminUserRow } from "@/schemas/user-api.schema"
import { useAppSelector } from "@/store/hooks"

import { UserTableDialogs } from "./user-table-dialogs"
import { createUsersTableColumns } from "./users-table-columns"

export function UsersClient() {
  const role = useAppSelector((s) => s.auth.user?.role)
  const sessionUserId = useAppSelector((s) => s.auth.user?.id)
  const isAdmin = role === "ADMIN"
  const { data, isPending, isError, error, refetch } = useUsers(isAdmin)
  const [globalFilter, setGlobalFilter] = useState("")
  const [viewUser, setViewUser] = useState<AdminUserRow | null>(null)
  const [editUser, setEditUser] = useState<AdminUserRow | null>(null)
  const [deleteUser, setDeleteUser] = useState<AdminUserRow | null>(null)

  const onViewUser = useCallback((u: AdminUserRow) => setViewUser(u), [])
  const onEditUser = useCallback((u: AdminUserRow) => setEditUser(u), [])
  const onDeleteUser = useCallback((u: AdminUserRow) => setDeleteUser(u), [])

  const columns = useMemo(() => createUsersTableColumns(), [])

  const tableMeta = useMemo(
    () => ({
      userRowActions: {
        sessionUserId,
        onView: onViewUser,
        onEdit: onEditUser,
        onDelete: onDeleteUser,
      },
    }),
    [sessionUserId, onViewUser, onEditUser, onDeleteUser]
  )

  const table = useReactTable({
    data: data ?? [],
    columns,
    meta: tableMeta,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
    globalFilterFn: (row, _columnId, filterValue) => {
      const q = String(filterValue).toLowerCase().trim()
      if (!q) return true
      const name = row.original.name.toLowerCase()
      const email = row.original.email.toLowerCase()
      return name.includes(q) || email.includes(q)
    },
  })

  if (!isAdmin) {
    return (
      <div className="p-4 md:p-6">
        <EmptyState
          title="Admin only"
          description="Listing all users requires an administrator account. The backend route is GET /api/users with Role.ADMIN."
        />
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="text-muted-foreground text-sm">
          Client-side search and pagination on the admin list from{" "}
          <code className="text-xs">GET /api/users</code>. Row actions call GET /
          PUT / DELETE <code className="text-xs">/users/:id</code> (admin).
        </p>
      </div>

      <DataTableToolbar>
        <Input
          className="max-w-sm"
          placeholder="Filter by name or email…"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          aria-label="Filter users"
        />
      </DataTableToolbar>

      {isError ? (
        <ErrorState
          message={error instanceof Error ? error.message : "Request failed"}
          onRetry={() => void refetch()}
        />
      ) : (
        <DataTable
          table={table}
          columns={columns}
          totalRows={table.getFilteredRowModel().rows.length}
          isLoading={isPending}
          emptyMessage="No users loaded."
        />
      )}

      <UserTableDialogs
        viewUser={viewUser}
        onViewDismiss={() => setViewUser(null)}
        editUser={editUser}
        onEditDismiss={() => setEditUser(null)}
        deleteUser={deleteUser}
        onDeleteDismiss={() => setDeleteUser(null)}
      />
    </div>
  )
}
