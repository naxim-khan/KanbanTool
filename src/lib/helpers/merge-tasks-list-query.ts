import type { TasksQuery } from "@/schemas/tasks-query.schema"
import { defaultTasksQuery, tasksQuerySchema } from "@/schemas/tasks-query.schema"
import type { TaskFilterState } from "@/store/slices/taskFilterSlice"

/**
 * Merges Redux task filter client state with list overrides (pagination, sort)
 * into a single `TasksQuery` for TanStack `queryKey` + GET `/tasks`.
 */
export function mergeTasksListQuery(
  filters: TaskFilterState,
  overrides: Partial<TasksQuery> = {}
): TasksQuery {
  return tasksQuerySchema.parse({
    ...defaultTasksQuery,
    status: filters.status === "ALL" ? undefined : filters.status,
    priority: filters.priority === "ALL" ? undefined : filters.priority,
    assigneeId: filters.assigneeId.trim() || undefined,
    creatorId: filters.creatorId.trim() || undefined,
    ...overrides,
  })
}
