"use client"

import { useLayoutEffect } from "react"

import { readStoredAuth, ensureSessionMarkerCookie } from "@/lib/helpers/auth-storage"
import { completeHydration } from "@/store/slices/authSlice"
import { useAppDispatch } from "@/store/hooks"

export function AuthHydrate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    const { accessToken, user } = readStoredAuth()
    ensureSessionMarkerCookie(accessToken)
    dispatch(completeHydration({ accessToken, user }))
  }, [dispatch])

  return <>{children}</>
}
