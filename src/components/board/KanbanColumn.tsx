"use client"

import { useDroppable } from "@dnd-kit/core"

import { cn } from "@/lib/utils"
import type { KanbanBoardColumn } from "@/lib/kanban-presentational"

import { TaskCard } from "./TaskCard"

export type KanbanColumnProps = {
  column: KanbanBoardColumn
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const { statusId, label, dotClassName, items } = column
  const { setNodeRef, isOver } = useDroppable({ id: statusId })

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-visible">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="flex min-w-0 items-center gap-2 text-sm font-semibold tracking-tight">
          <span
            className={cn("size-2 shrink-0 rounded-full", dotClassName)}
            aria-hidden
          />
          <span className="truncate">{label}</span>
        </h2>
        <span className="text-muted-foreground bg-background/80 rounded-md border border-border/60 px-2 py-0.5 text-xs tabular-nums shadow-sm">
          {items.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "border-border bg-background/60 flex min-h-[200px] flex-1 flex-col gap-2 overflow-visible rounded-xl border border-dashed p-2 transition-colors md:min-h-[280px]",
          isOver &&
            "border-primary/60 bg-primary/[0.06] ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
        )}
      >
        {items.length === 0 ? (
          <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-1 px-2 py-8 text-center text-xs">
            <span>No tasks</span>
            <span className="text-muted-foreground/80 max-w-[12rem]">
              Drag a card here or create a task to fill this column.
            </span>
          </div>
        ) : (
          items.map((item) => <TaskCard key={item.model.id} item={item} />)
        )}
      </div>
    </div>
  )
}
