"use client"

import { useMemo } from "react"

import { useDebouncedValue } from "@/hooks/shared/useDebouncedValue"
import { filterUsersBySearch } from "@/lib/helpers/filter-users-by-search"

import { useUsers } from "./useUsers"

const DEBOUNCE_MS = 400

/**
 * Cached GET /users (TanStack Query) + debounced client-side name/email filter.
 * Query key stays stable (`users.list`); search does not trigger refetches.
 */
export function useAssignableUsers(searchInput: string, enabled: boolean) {
  const debouncedSearch = useDebouncedValue(searchInput, DEBOUNCE_MS)
  const query = useUsers(enabled)

  const options = useMemo(
    () => filterUsersBySearch(query.data ?? [], debouncedSearch),
    [query.data, debouncedSearch]
  )

  return {
    ...query,
    debouncedSearch,
    options,
  }
}
