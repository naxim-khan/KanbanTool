/**
 * Prevent open redirects: only same-origin relative paths are allowed.
 * Used after sign-in when `?from=` is set by middleware.
 */
export function sanitizeReturnPath(
  raw: string | null | undefined
): string | null {
  if (!raw) return null
  const trimmed = raw.trim()
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return null
  if (trimmed.includes(":") || trimmed.includes("\\")) return null
  if (trimmed.startsWith("/sign-in") || trimmed.startsWith("/sign-up")) {
    return null
  }
  if (trimmed.length > 256) return null
  return trimmed
}
