import { TASK_STATUS_VALUES } from "@/constants/tasks"
import type {
  TaskStatus,
  TaskWithRelations,
} from "@/schemas/task-api.schema"

export type TasksByStatus = Record<TaskStatus, TaskWithRelations[]>

export function groupTasksByStatus(tasks: TaskWithRelations[]): TasksByStatus {
  const initial: TasksByStatus = {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  }
  for (const t of tasks) {
    if (TASK_STATUS_VALUES.includes(t.status)) {
      initial[t.status].push(t)
    }
  }
  return initial
}

/** Re-buckets one task into a new status — used for instant DnD UX before TanStack catches up. */
export function applyStatusOverrideToGrouped(
  grouped: TasksByStatus,
  override: { taskId: string; status: TaskStatus } | null
): TasksByStatus {
  if (!override) return grouped
  const flat = [...grouped.TODO, ...grouped.IN_PROGRESS, ...grouped.DONE]
  const current = flat.find((t) => t.id === override.taskId)
  if (!current || current.status === override.status) return grouped
  return groupTasksByStatus(
    flat.map((t) =>
      t.id === override.taskId ? { ...t, status: override.status } : t
    )
  )
}
