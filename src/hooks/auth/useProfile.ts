"use client"

import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/constants/query-keys"
import { getProfile } from "@/services/auth/getProfile"
import { useAppSelector } from "@/store/hooks"

export function useProfile(enabled?: boolean) {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)
  const hasUser = useAppSelector((s) => Boolean(s.auth.user?.id))
  const hydrated = useAppSelector((s) => s.auth.hydrated)

  const defaultEnabled =
    hydrated && isAuthenticated && !hasUser

  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: getProfile,
    enabled: enabled ?? defaultEnabled,
    staleTime: 60_000,
    retry: false,
  })
}
