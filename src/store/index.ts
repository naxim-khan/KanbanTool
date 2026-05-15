import { configureStore } from "@reduxjs/toolkit"

import { authReducer } from "./slices/authSlice"
import { taskFilterReducer } from "./slices/taskFilterSlice"

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      taskFilters: taskFilterReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

let clientDispatch: AppDispatch | undefined

export function registerStoreDispatch(dispatch: AppDispatch): void {
  clientDispatch = dispatch
}

export function getStoreDispatch(): AppDispatch | undefined {
  return clientDispatch
}
