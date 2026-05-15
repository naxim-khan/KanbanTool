import { api } from "@/lib/axios/axios"
import { unwrapSuccessData } from "@/lib/axios/unwrap-success"

export async function postLogout(): Promise<string> {
  const { data } = await api.post<unknown>("/auth/logout")
  return unwrapSuccessData<string>(data)
}
