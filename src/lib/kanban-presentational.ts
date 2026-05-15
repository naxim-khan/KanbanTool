export type TaskPriorityBadgeVariant =
  | "default"
  | "destructive"
  | "secondary"
  | "outline"

/** Minimal task shape for Kanban UI — built in views from API rows. */
export type KanbanTaskCardModel = {
  id: string
  title: string
  priorityLabel: string
  priorityBadgeVariant: TaskPriorityBadgeVariant
  dueDate?: string | null
  assignee: { name: string; email: string } | null
}

export type KanbanTaskCardItem = {
  model: KanbanTaskCardModel
  viewTask: () => void
  editTask: () => void
  deleteTask: () => void
}

export type KanbanBoardColumn = {
  statusId: string
  label: string
  dotClassName: string
  items: KanbanTaskCardItem[]
}
