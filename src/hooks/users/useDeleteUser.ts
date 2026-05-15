"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { queryKeys } from "@/constants/query-keys"
import { deleteUser } from "@/services/users/deleteUser"

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (_data, id) => {
      toast.success("User deleted")
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.root })
      void queryClient.removeQueries({ queryKey: queryKeys.users.detail(id) })
    },
    onError: (e: Error) => {
      toast.error(e.message ?? "Could not delete user")
    },
  })
}
