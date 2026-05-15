"use client"

import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/constants/query-keys"
import { getUsers } from "@/services/users/getUsers"

export function useUsers(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: () => getUsers(),
    enabled,
    staleTime: 5 * 60_000,
    gcTime: 15 * 60_000,
  })
}
