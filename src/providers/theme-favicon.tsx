"use client"

import { startTransition, useEffect, useState } from "react"
import { useTheme } from "next-themes"

import {
  BRAND_LOGO_INVERTED_PATH,
  BRAND_LOGO_PATH,
} from "@/constants/branding"

/**
 * Keeps `<link rel="icon">` / `apple-touch-icon` in sync with the app theme.
 * Favicons cannot use CSS `invert`, so we swap to a pre-inverted asset in dark mode.
 */
export function ThemeFavicon() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setMounted(true)
    })
  }, [])

  useEffect(() => {
    if (!mounted) return
    const href =
      resolvedTheme === "dark" ? BRAND_LOGO_INVERTED_PATH : BRAND_LOGO_PATH

    document
      .querySelectorAll<HTMLLinkElement>(
        'link[rel="icon"], link[rel="shortcut icon"]'
      )
      .forEach((el) => {
        el.href = href
      })

    const apple = document.querySelectorAll<HTMLLinkElement>(
      'link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]'
    )
    if (apple.length === 0 && !document.getElementById("pm-kanban-apple-touch")) {
      const link = document.createElement("link")
      link.id = "pm-kanban-apple-touch"
      link.rel = "apple-touch-icon"
      link.href = href
      link.setAttribute("sizes", "180x180")
      document.head.appendChild(link)
    } else {
      apple.forEach((el) => {
        el.href = href
      })
    }
  }, [mounted, resolvedTheme])

  return null
}
