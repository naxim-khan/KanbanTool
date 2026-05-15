import type { TasksQuery } from "@/schemas/tasks-query.schema"

/** Serialize `TasksQuery` for GET `/tasks` (Nest `QueryTasksDto`). */
export function tasksQueryToSearchParams(
  query: TasksQuery
): Record<string, string | number> {
  const params: Record<string, string | number> = {
    page: query.page,
    limit: query.limit,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  }
  if (query.status) params.status = query.status
  if (query.priority) params.priority = query.priority
  if (query.creatorId) params.creatorId = query.creatorId
  if (query.assigneeId) params.assigneeId = query.assigneeId
  return params
}
