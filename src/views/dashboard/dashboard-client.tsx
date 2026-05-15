"use client"

import Link from "next/link"

import { Button } from "@/components/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAppSelector } from "@/store/hooks"

export function DashboardClient() {
  const user = useAppSelector((s) => s.auth.user)

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Protected area — auth foundation is active. Use the sidebar menu to
            sign out.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Data comes from Redux after login or hydration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Name:</span>{" "}
            <span className="font-medium">{user?.name ?? "—"}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Email:</span>{" "}
            <span className="font-medium">{user?.email ?? "—"}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Role:</span>{" "}
            <span className="font-medium">{user?.role ?? "—"}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
