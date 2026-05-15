"use client"

import { useSyncExternalStore } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

import {
  BRAND_LOGO_ALT,
  BRAND_LOGO_INVERTED_PATH,
  BRAND_LOGO_PATH,
} from "@/constants/branding"
import { cn } from "@/lib/utils"

export type BrandLogoProps = {
  /** Square box size in px (art uses object-contain inside the box). */
  size?: number
  className?: string
  priority?: boolean
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

/**
 * Sidebar-only official mark: light theme = `BRAND_LOGO_PATH` (no CSS filters).
 * Dark theme = `BRAND_LOGO_INVERTED_PATH` (prebuilt asset; avoids filter bugs / “black blob”).
 */
export function BrandLogo({ size = 36, className, priority }: BrandLogoProps) {
  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()
  const src =
    isClient && resolvedTheme === "dark"
      ? BRAND_LOGO_INVERTED_PATH
      : BRAND_LOGO_PATH

  return (
    <Image
      key={src}
      src={src}
      alt={BRAND_LOGO_ALT}
      width={size}
      height={size}
      priority={priority}
      unoptimized
      className={cn("block shrink-0 object-contain", className)}
    />
  )
}
