"use client"

import { usePathname } from "next/navigation"

import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { isAppShellPath } from "@/constants/app-shell-routes"

/**
 * Theme control on routes that do not use `AppShellLayout` (home, auth, etc.).
 */
export function GlobalPublicThemeToggle() {
  const pathname = usePathname()
  if (isAppShellPath(pathname)) return null

  return (
    <div className="pointer-events-none fixed right-0 top-0 z-50 p-3 md:p-4">
      <div className="pointer-events-auto flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  )
}
