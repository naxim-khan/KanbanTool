import type { AdminUserRow } from "@/schemas/user-api.schema"

function normalize(s: string): string {
  return s.trim().toLowerCase()
}

/**
 * Client-side filter for assignee search. Backend currently returns the full
 * admin user list; this keeps the combobox responsive without refetching per keystroke.
 */
export function filterUsersBySearch(
  users: AdminUserRow[],
  search: string
): AdminUserRow[] {
  const q = normalize(search)
  if (!q) return users
  return users.filter(
    (u) =>
      normalize(u.name).includes(q) || normalize(u.email).includes(q)
  )
}
