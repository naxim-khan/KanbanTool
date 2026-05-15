/** localStorage keys for auth persistence */
export const AUTH_ACCESS_TOKEN_KEY = "pmkanban.auth.accessToken"
export const AUTH_USER_KEY = "pmkanban.auth.user"

/**
 * Non-HttpOnly cookie mirrored when a JWT is present. Edge middleware uses this
 * to redirect unauthenticated users before the app shell loads (UX only; API still enforces JWT).
 */
export const AUTH_SESSION_COOKIE_NAME = "pmkanban.session"
