"use client"

import { useEffect } from "react"

import { useProfile } from "@/hooks/auth/useProfile"
import { updateStoredUser } from "@/lib/helpers/auth-storage"
import { setUser } from "@/store/slices/authSlice"
import { useAppDispatch } from "@/store/hooks"

/**
 * When a token exists without a cached user, `useProfile` runs; this syncs the result into Redux + localStorage.
 */
export function ProfileBootstrap() {
  const dispatch = useAppDispatch()
  const { data, isSuccess } = useProfile()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data))
      updateStoredUser(data)
    }
  }, [data, dispatch, isSuccess])

  return null
}
