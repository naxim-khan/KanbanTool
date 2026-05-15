"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateStoredUser } from "@/lib/helpers/auth-storage"
import {
  adminRowToAuthUser,
  applyAdminUpdatePayload,
  applyAuthUpdatePayload,
  restoreUserCaches,
  snapshotUserCaches,
  syncUserAcrossCaches,
  type UserCacheSnapshot,
} from "@/lib/helpers/user-list-cache"
import type { AuthUser } from "@/types/auth.types"
import { queryKeys } from "@/constants/query-keys"
import { updateUser, type AdminUpdateUserPayload } from "@/services/users/updateUser"
import { setUser } from "@/store/slices/authSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

type Ctx = {
  previous: UserCacheSnapshot
  previousAuthUser: AuthUser | null
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((s) => s.auth.user)

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: AdminUpdateUserPayload
    }) => updateUser(id, payload),
    onMutate: ({ id, payload }) => {
      const previous = snapshotUserCaches(queryClient)
      const previousAuthUser = authUser ?? null

      syncUserAcrossCaches(queryClient, id, (user) =>
        applyAdminUpdatePayload(user, payload)
      )

      if (authUser?.id === id) {
        const nextAuth = applyAuthUpdatePayload(authUser, payload)
        dispatch(setUser(nextAuth))
        updateStoredUser(nextAuth)
      }

      return { previous, previousAuthUser } satisfies Ctx
    },
    onError: (e: Error, _vars, context) => {
      if (context?.previous) {
        restoreUserCaches(queryClient, context.previous)
      }
      if (context?.previousAuthUser) {
        dispatch(setUser(context.previousAuthUser))
        updateStoredUser(context.previousAuthUser)
      }
      toast.error(e.message ?? "Could not update user")
    },
    onSuccess: (serverUser, { id }) => {
      syncUserAcrossCaches(queryClient, serverUser.id, serverUser)
      const profile = queryClient.getQueryData<AuthUser>(queryKeys.profile)
      if (profile?.id === id) {
        const nextAuth = adminRowToAuthUser(serverUser)
        dispatch(setUser(nextAuth))
        updateStoredUser(nextAuth)
      }
      toast.success("User updated")
    },
  })
}
