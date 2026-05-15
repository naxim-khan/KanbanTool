import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_SESSION_COOKIE_NAME,
  AUTH_USER_KEY,
} from "@/constants/auth-storage"
import type { AuthSessionPayload, AuthUser } from "@/types/auth.types"

const SESSION_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 7 // 7 days; JWT expiry is enforced by the API

function setSessionMarkerCookie(): void {
  if (typeof document === "undefined") return
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
  document.cookie = `${AUTH_SESSION_COOKIE_NAME}=1; Path=/; Max-Age=${SESSION_COOKIE_MAX_AGE_SEC}; SameSite=Lax${secure ? "; Secure" : ""}`
}

function clearSessionMarkerCookie(): void {
  if (typeof document === "undefined") return
  document.cookie = `${AUTH_SESSION_COOKIE_NAME}=; Path=/; Max-Age=0`
}

export function readStoredAuth(): {
  accessToken: string | null
  user: AuthUser | null
} {
  if (typeof window === "undefined") {
    return { accessToken: null, user: null }
  }
  const accessToken = localStorage.getItem(AUTH_ACCESS_TOKEN_KEY)
  const rawUser = localStorage.getItem(AUTH_USER_KEY)
  let user: AuthUser | null = null
  if (rawUser) {
    try {
      user = JSON.parse(rawUser) as AuthUser
    } catch {
      user = null
    }
  }
  return { accessToken, user }
}

export function writeStoredAuth(session: AuthSessionPayload): void {
  localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, session.accessToken)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(session.user))
  setSessionMarkerCookie()
}

export function updateStoredUser(user: AuthUser): void {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

export function clearStoredAuth(): void {
  localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
  clearSessionMarkerCookie()
}

/** Call after hydration if token exists but the session cookie was cleared (e.g. user wiped cookies). */
export function ensureSessionMarkerCookie(accessToken: string | null): void {
  if (accessToken) setSessionMarkerCookie()
  else clearSessionMarkerCookie()
}
