"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { queryKeys } from "@/constants/query-keys"
import { postLogin } from "@/services/auth/login"
import { setSession } from "@/store/slices/authSlice"
import { useAppDispatch } from "@/store/hooks"
import { writeStoredAuth } from "@/lib/helpers/auth-storage"
import { sanitizeReturnPath } from "@/lib/helpers/safe-return-url"
import type { LoginPayload } from "@/types/auth.types"

export function useLogin(returnTo: string | null = null) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) => postLogin(payload),
    onSuccess: (data) => {
      writeStoredAuth(data)
      dispatch(setSession(data))
      queryClient.setQueryData(queryKeys.profile, data.user)
      const next = sanitizeReturnPath(returnTo) ?? "/dashboard"
      router.push(next)
    },
  })
}
