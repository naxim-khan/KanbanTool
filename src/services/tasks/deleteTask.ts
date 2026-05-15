import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"
import {
  taskWithRelationsSchema,
  type TaskWithRelations,
} from "@/schemas/task-api.schema"

export async function deleteTask(id: string): Promise<TaskWithRelations> {
  const { data } = await api.delete<unknown>(`/tasks/${id}`)
  const raw = unwrapSuccessData<unknown>(data)
  return taskWithRelationsSchema.parse(raw)
}
