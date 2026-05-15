"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/constants/query-keys"
import { getTasks } from "@/services/tasks/getTasks"
import type { TasksQuery } from "@/schemas/tasks-query.schema"

export function useTasks(query: TasksQuery) {
  return useQuery({
    queryKey: queryKeys.tasks.list(query),
    queryFn: () => getTasks(query),
    placeholderData: keepPreviousData,
  })
}
