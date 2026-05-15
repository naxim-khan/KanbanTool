import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"
import type { AuthUser } from "@/types/auth.types"

export async function getProfile(): Promise<AuthUser> {
  const { data } = await api.get<unknown>("/auth/profile")
  return unwrapSuccessData<AuthUser>(data)
}
