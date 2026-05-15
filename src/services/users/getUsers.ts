import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"
import {
  adminUsersListSchema,
  type AdminUserRow,
} from "@/schemas/user-api.schema"

export type GetUsersParams = {
  /** Forward-compatible: sent as `?search=` when backend adds server-side filtering. */
  search?: string
}

export async function getUsers(params?: GetUsersParams): Promise<AdminUserRow[]> {
  const search = params?.search?.trim()
  const { data } = await api.get<unknown>("/users", {
    params: search ? { search } : undefined,
  })
  const raw = unwrapSuccessData<unknown>(data)
  return adminUsersListSchema.parse(raw)
}
