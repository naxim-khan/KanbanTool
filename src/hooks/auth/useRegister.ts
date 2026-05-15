"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { queryKeys } from "@/constants/query-keys"
import { postRegister } from "@/services/auth/register"
import { setSession } from "@/store/slices/authSlice"
import { useAppDispatch } from "@/store/hooks"
import { writeStoredAuth } from "@/lib/helpers/auth-storage"
import type { RegisterPayload } from "@/types/auth.types"

export function useRegister() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: RegisterPayload) => postRegister(payload),
    onSuccess: (data) => {
      writeStoredAuth(data)
      dispatch(setSession(data))
      queryClient.setQueryData(queryKeys.profile, data.user)
      router.push("/dashboard")
    },
  })
}
