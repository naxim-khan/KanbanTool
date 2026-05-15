"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { queryKeys } from "@/constants/query-keys"
import { deleteTask } from "@/services/tasks/deleteTask"

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: (_data, id) => {
      toast.success("Task deleted")
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.listPrefix,
      })
      void queryClient.removeQueries({ queryKey: queryKeys.tasks.task(id) })
    },
    onError: (e: Error) => {
      toast.error(e.message ?? "Could not delete task")
    },
  })
}
