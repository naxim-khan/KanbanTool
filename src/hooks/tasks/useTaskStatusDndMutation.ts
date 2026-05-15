"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { queryKeys } from "@/constants/query-keys"
import type {
  PaginatedTasksResponse,
  TaskStatus,
} from "@/schemas/task-api.schema"
import type { TasksQuery } from "@/schemas/tasks-query.schema"
import { updateTaskStatus } from "@/services/tasks/updateTaskStatus"

type Ctx = { previous: PaginatedTasksResponse | undefined }

export function useTaskStatusDndMutation(listQuery: TasksQuery) {
  const queryClient = useQueryClient()
  const queryKey = queryKeys.tasks.list(listQuery)

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string
      status: TaskStatus
    }) => updateTaskStatus(id, { status }),
    onMutate: async ({ id, status }) => {
      const previous = queryClient.getQueryData<PaginatedTasksResponse>(queryKey)
      queryClient.setQueryData<PaginatedTasksResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          items: old.items.map((t) => (t.id === id ? { ...t, status } : t)),
        }
      })
      // Do not await before setQueryData — dnd-kit clears transform on drop first;
      // a delayed optimistic update causes a visible snap back to the old column.
      void queryClient.cancelQueries({ queryKey })
      return { previous } satisfies Ctx
    },
    onError: (err: Error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous)
      }
      toast.error(err.message ?? "Could not move task")
    },
    onSuccess: (serverTask) => {
      queryClient.setQueryData<PaginatedTasksResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          items: old.items.map((t) =>
            t.id === serverTask.id ? serverTask : t
          ),
        }
      })
    },
    onSettled: (_data, _error, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.task(variables.id),
      })
    },
  })
}
