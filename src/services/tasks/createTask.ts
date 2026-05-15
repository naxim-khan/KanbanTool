import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"
import {
  taskWithRelationsSchema,
  type TaskWithRelations,
} from "@/schemas/task-api.schema"

export type CreateTaskPayload = {
  title: string
  description?: string
  status: TaskWithRelations["status"]
  priority: TaskWithRelations["priority"]
  assigneeId?: string
  dueDate?: string
}

export async function createTask(
  payload: CreateTaskPayload
): Promise<TaskWithRelations> {
  const { data } = await api.post<unknown>("/tasks", payload)
  const raw = unwrapSuccessData<unknown>(data)
  return taskWithRelationsSchema.parse(raw)
}
