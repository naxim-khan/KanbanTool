import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"
import { tasksQueryToSearchParams } from "@/lib/helpers/tasks-query-params"
import {
  paginatedTasksResponseSchema,
  type PaginatedTasksResponse,
} from "@/schemas/task-api.schema"
import type { TasksQuery } from "@/schemas/tasks-query.schema"

export async function getTasks(
  query: TasksQuery
): Promise<PaginatedTasksResponse> {
  const { data } = await api.get<unknown>("/tasks", {
    params: tasksQueryToSearchParams(query),
  })
  const raw = unwrapSuccessData<unknown>(data)
  return paginatedTasksResponseSchema.parse(raw)
}
