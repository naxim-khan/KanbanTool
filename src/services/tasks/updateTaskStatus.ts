import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"
import {
  taskWithRelationsSchema,
  type TaskWithRelations,
} from "@/schemas/task-api.schema"

export type UpdateTaskStatusPayload = {
  status: TaskWithRelations["status"]
}

export async function updateTaskStatus(
  id: string,
  payload: UpdateTaskStatusPayload
): Promise<TaskWithRelations> {
  const { data } = await api.patch<unknown>(`/tasks/${id}/status`, payload)
  const raw = unwrapSuccessData<unknown>(data)
  return taskWithRelationsSchema.parse(raw)
}
