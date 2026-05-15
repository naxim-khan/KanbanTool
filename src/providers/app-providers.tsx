"use client"

import { GlobalPublicThemeToggle } from "@/views/layout/global-public-theme-toggle"
import { Toaster } from "@/components/ui/sonner"
import { StoreProvider } from "@/store/providers/StoreProvider"

import { AuthHydrate } from "./auth-hydrate"
import { ProfileBootstrap } from "./profile-bootstrap"
import { QueryProvider } from "./query-provider"
import { ThemeFavicon } from "./theme-favicon"
import { ThemeProvider } from "./theme-provider"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>
        <QueryProvider>
          <AuthHydrate>
            <ProfileBootstrap />
            {children}
            <GlobalPublicThemeToggle />
            <ThemeFavicon />
            <Toaster
              richColors
              closeButton
              position="top-center"
              gap={16}
              offset={{ top: "max(1.25rem, env(safe-area-inset-top))" }}
            />
          </AuthHydrate>
        </QueryProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}
