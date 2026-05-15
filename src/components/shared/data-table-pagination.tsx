"use client"

import type { Table as TanstackTable } from "@tanstack/react-table"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DATA_TABLE_PAGE_SIZE_OPTIONS } from "@/constants/data-table"
import { cn } from "@/lib/utils"

type DataTablePaginationProps<TData> = {
  table: TanstackTable<TData>
  /** When set, used for “of N” (e.g. server total). Otherwise filtered row count. */
  totalRows?: number
  className?: string
}

export function DataTablePagination<TData>({
  table,
  totalRows,
  className,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const pageCount = table.getPageCount()
  const rowCount =
    totalRows ?? table.getFilteredRowModel().rows.length ?? 0

  const from = rowCount === 0 ? 0 : pageIndex * pageSize + 1
  const to = Math.min(rowCount, (pageIndex + 1) * pageSize)
  const currentPage = pageIndex + 1
  const totalPages = Math.max(pageCount, 1)

  return (
    <div
      className={cn(
        "border-border flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
        className
      )}
    >
      <p
        className="text-muted-foreground order-1 text-center text-sm tabular-nums sm:min-w-0 sm:text-left"
        aria-live="polite"
      >
        {rowCount > 0 ? (
          <>
            <span className="text-foreground font-medium tabular-nums">
              {from}
            </span>
            <span className="text-muted-foreground/80 px-0.5">–</span>
            <span className="text-foreground font-medium tabular-nums">
              {to}
            </span>
            <span className="text-muted-foreground px-1">of</span>
            <span className="text-foreground font-medium tabular-nums">
              {rowCount}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">No results</span>
        )}
      </p>

      <div className="order-2 flex flex-wrap items-center justify-center gap-2 sm:justify-end">
        <div className="flex items-center gap-2">
          <span
            id="data-table-page-size-label"
            className="text-muted-foreground sr-only sm:not-sr-only sm:text-sm"
          >
            Per page
          </span>
          <Select
            value={`${pageSize}`}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger
              size="sm"
              className="h-8 w-[4.25rem] min-w-[4.25rem] shadow-sm"
              aria-labelledby="data-table-page-size-label"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {DATA_TABLE_PAGE_SIZE_OPTIONS.map((n) => (
                <SelectItem key={n} value={`${n}`}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div
          className="bg-border hidden h-6 w-px shrink-0 sm:block"
          aria-hidden
        />

        <div
          className="bg-background divide-border flex items-stretch divide-x overflow-hidden rounded-md border border-input shadow-sm"
          role="navigation"
          aria-label="Pagination"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="hidden h-8 w-8 shrink-0 rounded-none shadow-none md:inline-flex"
            aria-label="First page"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="h-8 w-8 shrink-0 rounded-none shadow-none"
            aria-label="Previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <div className="text-muted-foreground flex min-w-[4.75rem] items-center justify-center px-3 text-sm tabular-nums">
            <span className="text-foreground font-medium">{currentPage}</span>
            <span className="text-muted-foreground/60 px-1">/</span>
            <span>{totalPages}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="h-8 w-8 shrink-0 rounded-none shadow-none"
            aria-label="Next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="hidden h-8 w-8 shrink-0 rounded-none shadow-none md:inline-flex"
            aria-label="Last page"
            onClick={() => table.setPageIndex(Math.max(pageCount - 1, 0))}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
