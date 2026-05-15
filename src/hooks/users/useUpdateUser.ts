"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { queryKeys } from "@/constants/query-keys"
import { updateUser, type AdminUpdateUserPayload } from "@/services/users/updateUser"

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: AdminUpdateUserPayload
    }) => updateUser(id, payload),
    onSuccess: (_data, variables) => {
      toast.success("User updated")
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.root })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.users.detail(variables.id),
      })
    },
    onError: (e: Error) => {
      toast.error(e.message ?? "Could not update user")
    },
  })
}
