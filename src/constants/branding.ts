/** Original mark (`public/kanban-logo.png`) — light UI / default favicon. */
export const BRAND_LOGO_PATH = "/kanban-logo.png" as const

/**
 * Pre-inverted mark (`public/kanban-logo-inverted.png`) — dark UI, favicon, and apple-touch
 * when the app theme is dark (no CSS filters on `<img>`).
 */
export const BRAND_LOGO_INVERTED_PATH = "/kanban-logo-inverted.png" as const

export const BRAND_NAME = "PM Kanban" as const

export const BRAND_LOGO_ALT = `${BRAND_NAME} logo` as const
