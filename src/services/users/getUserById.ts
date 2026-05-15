import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"
import {
  adminUserRowSchema,
  type AdminUserRow,
} from "@/schemas/user-api.schema"

export async function getUserById(id: string): Promise<AdminUserRow> {
  const { data } = await api.get<unknown>(`/users/${id}`)
  const raw = unwrapSuccessData<unknown>(data)
  return adminUserRowSchema.parse(raw)
}
