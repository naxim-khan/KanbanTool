"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { queryKeys } from "@/constants/query-keys"
import { updateTask, type UpdateTaskPayload } from "@/services/tasks/updateTask"

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      updateTask(id, payload),
    onSuccess: (_data, variables) => {
      toast.success("Task updated")
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.listPrefix,
      })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.task(variables.id),
      })
    },
    onError: (e: Error) => {
      toast.error(e.message ?? "Could not update task")
    },
  })
}
