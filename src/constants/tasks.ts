/** Mirrors `Backend/src/tasks/tasks.constants.ts` */
export const TASKS_DEFAULT_PAGE = 1
export const TASKS_DEFAULT_LIMIT = 20
export const TASKS_MAX_LIMIT = 100

/** Board fetches up to backend max in one page (grouped client-side). */
export const TASK_KANBAN_LIST_LIMIT = TASKS_MAX_LIMIT

export const TASK_SORT_BY_FIELDS = [
  "updatedAt",
  "createdAt",
  "dueDate",
  "priority",
  "status",
] as const

export type TaskSortByField = (typeof TASK_SORT_BY_FIELDS)[number]

export const TASK_STATUS_VALUES = ["TODO", "IN_PROGRESS", "DONE"] as const

export const TASK_PRIORITY_VALUES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
] as const

export const TASK_STATUS_LABELS: Record<
  (typeof TASK_STATUS_VALUES)[number],
  string
> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "Done",
}

export const TASK_STATUS_DOT_CLASS: Record<
  (typeof TASK_STATUS_VALUES)[number],
  string
> = {
  TODO: "bg-sky-500",
  IN_PROGRESS: "bg-amber-500",
  DONE: "bg-emerald-600",
}

export const TASK_PRIORITY_LABELS: Record<
  (typeof TASK_PRIORITY_VALUES)[number],
  string
> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
}
