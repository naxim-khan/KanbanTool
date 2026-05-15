"use client"

import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/constants/query-keys"
import { getUserById } from "@/services/users/getUserById"

export function useUser(id: string | null, enabled: boolean) {
  return useQuery({
    queryKey: id ? queryKeys.users.detail(id) : ["users", "detail", "none"],
    queryFn: () => getUserById(id as string),
    enabled: Boolean(id) && enabled,
  })
}
