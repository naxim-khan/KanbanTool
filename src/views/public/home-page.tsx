"use client"

import { useLayoutEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/Button"
import { PageLoader } from "@/components/PageLoader"
import { useAppSelector } from "@/store/hooks"

export function HomePage() {
  const router = useRouter()
  const hydrated = useAppSelector((s) => s.auth.hydrated)
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)

  useLayoutEffect(() => {
    if (!hydrated || !isAuthenticated) return
    router.replace("/dashboard")
  }, [hydrated, isAuthenticated, router])

  if (!hydrated) {
    return (
      <PageLoader className="min-h-[40vh]" message="Starting session…" />
    )
  }

  if (isAuthenticated) {
    return <PageLoader className="min-h-[40vh]" message="Redirecting…" />
  }

  return (
    <main className="bg-background flex flex-1 flex-col items-center justify-center gap-8 p-6 text-center md:p-12">
      <div className="max-w-md space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          PM Kanban
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Sign in to open your dashboard, or create an account to get started.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </main>
  )
}
