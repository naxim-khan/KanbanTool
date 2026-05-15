"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { queryKeys } from "@/constants/query-keys"
import {
  updateTaskStatus,
  type UpdateTaskStatusPayload,
} from "@/services/tasks/updateTaskStatus"

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpdateTaskStatusPayload
    }) => updateTaskStatus(id, payload),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.listPrefix,
      })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.task(variables.id),
      })
    },
    onError: (e: Error) => {
      toast.error(e.message ?? "Could not update status")
    },
  })
}
