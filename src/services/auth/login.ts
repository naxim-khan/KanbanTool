import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"
import type { AuthSessionPayload, LoginPayload } from "@/types/auth.types"

export async function postLogin(
  payload: LoginPayload
): Promise<AuthSessionPayload> {
  const { data } = await api.post<unknown>("/auth/login", payload)
  return unwrapSuccessData<AuthSessionPayload>(data)
}
