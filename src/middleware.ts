import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { AUTH_SESSION_COOKIE_NAME } from "@/constants/auth-storage"

/**
 * Routes that never require the session marker cookie (see `auth-storage` + middleware).
 * Everything else is treated as authenticated-only at the Edge.
 */
function isPublicPath(pathname: string): boolean {
  if (pathname === "/") return true
  if (pathname === "/sign-in" || pathname.startsWith("/sign-in/")) return true
  if (pathname === "/sign-up" || pathname.startsWith("/sign-up/")) return true
  return false
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  const hasSession = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value === "1"
  if (!hasSession) {
    const url = request.nextUrl.clone()
    url.pathname = "/sign-in"
    if (pathname && pathname !== "/sign-in") {
      url.searchParams.set("from", pathname)
    }
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all pathnames except Next internals and static asset files.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|svg|jpg|jpeg|gif|webp|woff2?|webmanifest)).*)",
  ],
}
