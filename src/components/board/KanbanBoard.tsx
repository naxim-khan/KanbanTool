"use client"

import type { KanbanBoardColumn } from "@/lib/kanban-presentational"

import { KanbanColumn } from "./KanbanColumn"

export type KanbanBoardProps = {
  columns: KanbanBoardColumn[]
}

/** Three-column layout — wrap with `DndContext` in the feature view. */
export function KanbanBoard({ columns }: KanbanBoardProps) {
  return (
    <div className="overflow-x-auto pb-1 md:overflow-visible md:pb-0">
      <div className="border-border/80 bg-muted/15 grid min-h-0 min-w-[720px] gap-4 rounded-2xl border p-3 ring-1 ring-border/40 md:min-w-0 md:grid-cols-3 md:p-4">
        {columns.map((column) => (
          <KanbanColumn key={column.statusId} column={column} />
        ))}
      </div>
    </div>
  )
}
