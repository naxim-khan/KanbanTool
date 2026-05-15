"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { queryKeys } from "@/constants/query-keys"
import { createTask, type CreateTaskPayload } from "@/services/tasks/createTask"

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(payload),
    onSuccess: () => {
      toast.success("Task created")
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.listPrefix,
      })
    },
    onError: (e: Error) => {
      toast.error(e.message ?? "Could not create task")
    },
  })
}
