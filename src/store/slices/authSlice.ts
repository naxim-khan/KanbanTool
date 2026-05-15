import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { AuthUser } from "@/types/auth.types"

export type AuthState = {
  accessToken: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  /** False until client has read localStorage (avoids auth-guard redirect flash). */
  hydrated: boolean
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
  hydrated: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(
      state,
      action: PayloadAction<{ accessToken: string; user: AuthUser }>
    ) {
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
      state.isAuthenticated = true
      state.hydrated = true
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
    },
    completeHydration(
      state,
      action: PayloadAction<{
        accessToken: string | null
        user: AuthUser | null
      }>
    ) {
      state.hydrated = true
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
      state.isAuthenticated = Boolean(action.payload.accessToken)
    },
    clearSession() {
      return {
        ...initialState,
        hydrated: true,
      }
    },
  },
})

export const { setSession, setUser, completeHydration, clearSession } =
  authSlice.actions

export const authReducer = authSlice.reducer
