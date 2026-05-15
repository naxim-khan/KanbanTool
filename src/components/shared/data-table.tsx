"use client"

import type {
  ColumnDef,
  Table as TanstackTable,
} from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

import { DataTablePagination } from "./data-table-pagination"

type DataTableProps<TData> = {
  /** TanStack Table instance (built in a route/container that owns data fetching). */
  table: TanstackTable<TData>
  columns: ColumnDef<TData, unknown>[]
  /** Total rows in the dataset when using manual pagination (server-side). */
  totalRows?: number
  isLoading?: boolean
  emptyMessage?: string
  /** Hide built-in pagination footer */
  hidePagination?: boolean
  className?: string
}

/**
 * Presentational table shell around shadcn `Table` + TanStack `flexRender`.
 * Keeps JSX reusable across any row shape (tasks, users, billing, etc.).
 */
export function DataTable<TData>({
  table,
  columns,
  totalRows,
  isLoading,
  emptyMessage = "No results.",
  hidePagination,
  className,
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows

  return (
    <div className={cn("flex flex-col gap-0", className)}>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground h-24 text-center"
                >
                  Loading…
                </TableCell>
              </TableRow>
            ) : rows.length ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!hidePagination ? (
        <DataTablePagination table={table} totalRows={totalRows} />
      ) : null}
    </div>
  )
}
