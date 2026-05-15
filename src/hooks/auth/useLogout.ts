"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { queryKeys } from "@/constants/query-keys"
import { postLogout } from "@/services/auth/logout"
import { clearSession } from "@/store/slices/authSlice"
import { useAppDispatch } from "@/store/hooks"
import { clearStoredAuth } from "@/lib/helpers/auth-storage"

export function useLogout() {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: () => postLogout(),
    onSettled: () => {
      clearStoredAuth()
      dispatch(clearSession())
      queryClient.removeQueries({ queryKey: queryKeys.profile })
      router.push("/sign-in")
    },
  })
}
