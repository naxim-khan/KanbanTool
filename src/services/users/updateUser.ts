import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"
import {
  adminUserRowSchema,
  type AdminUserRow,
} from "@/schemas/user-api.schema"

export type AdminUpdateUserPayload = {
  name?: string
  email?: string
  role?: AdminUserRow["role"]
  password?: string
}

export async function updateUser(
  id: string,
  payload: AdminUpdateUserPayload
): Promise<AdminUserRow> {
  const { data } = await api.put<unknown>(`/users/${id}`, payload)
  const raw = unwrapSuccessData<unknown>(data)
  return adminUserRowSchema.parse(raw)
}
