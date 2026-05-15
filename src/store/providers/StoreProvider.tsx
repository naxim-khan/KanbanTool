"use client"

import { useEffect, useState } from "react"
import { Provider } from "react-redux"

import { makeStore, registerStoreDispatch, type AppStore } from "@/store"

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore())

  useEffect(() => {
    registerStoreDispatch(store.dispatch)
  }, [store])

  return <Provider store={store}>{children}</Provider>
}
