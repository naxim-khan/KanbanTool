"use client"

import * as React from "react"
import { SunMoon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/Button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    React.startTransition(() => {
      setMounted(true)
    })
  }, [])

  const isDark = mounted && resolvedTheme === "dark"
  const nextTheme = isDark ? "light" : "dark"
  const label = mounted
    ? `Switch to ${nextTheme} theme`
    : "Switch theme"

  const tooltip = mounted
    ? isDark
      ? "Switch to light theme"
      : "Switch to dark theme"
    : "Switch light / dark theme"

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={label}
            title={label}
            onClick={() => setTheme(nextTheme)}
            className="border-border bg-background/90 text-foreground shadow-sm backdrop-blur-sm shrink-0 hover:bg-muted"
            leftIcon={<SunMoon className="size-4" aria-hidden />}
          />
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end" sideOffset={6}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
