import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import {
  TASK_PRIORITY_VALUES,
  TASK_STATUS_VALUES,
} from "@/constants/tasks"

export type TaskStatusFilter = (typeof TASK_STATUS_VALUES)[number] | "ALL"
export type TaskPriorityFilter = (typeof TASK_PRIORITY_VALUES)[number] | "ALL"

export type TaskFilterState = {
  status: TaskStatusFilter
  priority: TaskPriorityFilter
  assigneeId: string
  creatorId: string
}

const initialState: TaskFilterState = {
  status: "ALL",
  priority: "ALL",
  assigneeId: "",
  creatorId: "",
}

export const taskFilterSlice = createSlice({
  name: "taskFilters",
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<TaskStatusFilter>) {
      state.status = action.payload
    },
    setPriorityFilter(state, action: PayloadAction<TaskPriorityFilter>) {
      state.priority = action.payload
    },
    setAssigneeFilter(state, action: PayloadAction<string>) {
      state.assigneeId = action.payload
    },
    setCreatorFilter(state, action: PayloadAction<string>) {
      state.creatorId = action.payload
    },
    resetTaskFilters() {
      return initialState
    },
  },
})

export const {
  setStatusFilter,
  setPriorityFilter,
  setAssigneeFilter,
  setCreatorFilter,
  resetTaskFilters,
} = taskFilterSlice.actions

export const taskFilterReducer = taskFilterSlice.reducer
