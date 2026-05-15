import { AppShellLayout } from "@/views/layout/app-shell-layout"
import { AuthGuard } from "@/views/layout/auth-guard"

/**
 * Authenticated “app chrome” lives under this route group.
 * `AuthGuard` blocks unauthenticated access; `AppShellLayout` adds the sidebar shell.
 */
export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <AppShellLayout>{children}</AppShellLayout>
    </AuthGuard>
  )
}
