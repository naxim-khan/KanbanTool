"use client"

import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/constants/query-keys"
import { getTask } from "@/services/tasks/getTask"

export function useTask(id: string | null, enabled: boolean) {
  return useQuery({
    queryKey: id ? queryKeys.tasks.task(id) : ["task", "none"],
    queryFn: () => getTask(id as string),
    enabled: Boolean(id) && enabled,
  })
}
