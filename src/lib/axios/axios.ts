import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios"

import { AUTH_ACCESS_TOKEN_KEY } from "@/constants/auth-storage"
import { clearSession } from "@/store/slices/authSlice"
import { clearStoredAuth } from "@/lib/helpers/auth-storage"
import { getStoreDispatch } from "@/store"

function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim() ?? ""
  if (!raw) {
    return ""
  }
  const noTrailing = raw.replace(/\/+$/, "")
  if (noTrailing.endsWith("/api")) {
    return noTrailing
  }
  return `${noTrailing}/api`
}

export class ApiRequestError extends Error {
  readonly status?: number
  readonly body?: unknown

  constructor(message: string, status?: number, body?: unknown) {
    super(message)
    this.name = "ApiRequestError"
    this.status = status
    this.body = body
  }
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(AUTH_ACCESS_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string | string[]; success?: boolean }>) => {
    const status = error.response?.status
    const url = error.config?.url ?? ""
    const isPublicAuthRoute =
      /\/auth\/login\/?$/.test(url) || /\/auth\/register\/?$/.test(url)

    if (status === 401 && !isPublicAuthRoute) {
      const dispatch = getStoreDispatch()
      dispatch?.(clearSession())
      clearStoredAuth()
    }

    const raw = error.response?.data?.message
    const message =
      typeof raw === "string"
        ? raw
        : Array.isArray(raw)
          ? raw.join(", ")
          : error.message || "Request failed"

    return Promise.reject(
      new ApiRequestError(message, status, error.response?.data)
    )
  }
)
