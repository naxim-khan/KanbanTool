import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"
import {
  taskWithRelationsSchema,
  type TaskWithRelations,
} from "@/schemas/task-api.schema"

export type UpdateTaskPayload = {
  title?: string
  description?: string | null
  priority?: TaskWithRelations["priority"]
  assigneeId?: string | null
  dueDate?: string | null
}

export async function updateTask(
  id: string,
  payload: UpdateTaskPayload
): Promise<TaskWithRelations> {
  const { data } = await api.patch<unknown>(`/tasks/${id}`, payload)
  const raw = unwrapSuccessData<unknown>(data)
  return taskWithRelationsSchema.parse(raw)
}
