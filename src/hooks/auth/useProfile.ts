"use client"

import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/constants/query-keys"
import { getProfile } from "@/services/auth/getProfile"
import { useAppSelector } from "@/store/hooks"

export function useProfile() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)
  const hasUser = useAppSelector((s) => Boolean(s.auth.user?.id))
  const hydrated = useAppSelector((s) => s.auth.hydrated)
  const sessionUser = useAppSelector((s) => s.auth.user)

  const queryEnabled = hydrated && isAuthenticated && !hasUser

  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: getProfile,
    enabled: queryEnabled,
    initialData: sessionUser ?? undefined,
    retry: false,
  })
}
