import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"
import type { AuthSessionPayload, RegisterPayload } from "@/types/auth.types"

export async function postRegister(
  payload: RegisterPayload
): Promise<AuthSessionPayload> {
  const { data } = await api.post<unknown>("/auth/register", payload)
  return unwrapSuccessData<AuthSessionPayload>(data)
}
