"use client"

import { useLayoutEffect } from "react"
import { useRouter } from "next/navigation"

import { PageLoader } from "@/components/PageLoader"
import { ensureSessionMarkerCookie } from "@/lib/helpers/auth-storage"
import { useAppSelector } from "@/store/hooks"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const hydrated = useAppSelector((s) => s.auth.hydrated)
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)

  useLayoutEffect(() => {
    if (!hydrated) return
    if (!isAuthenticated) {
      ensureSessionMarkerCookie(null)
      router.replace("/sign-in")
    }
  }, [hydrated, isAuthenticated, router])

  if (!hydrated) {
    return <PageLoader className="min-h-[40vh]" message="Starting session…" />
  }

  if (!isAuthenticated) {
    return <PageLoader className="min-h-[40vh]" message="Redirecting…" />
  }

  return <>{children}</>
}
