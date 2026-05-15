import { z } from "zod"

import {
  TASK_PRIORITY_VALUES,
  TASK_SORT_BY_FIELDS,
  TASK_STATUS_VALUES,
  TASKS_DEFAULT_LIMIT,
  TASKS_DEFAULT_PAGE,
  TASKS_MAX_LIMIT,
} from "@/constants/tasks"

export const tasksQuerySchema = z.object({
  page: z.number().int().min(1).default(TASKS_DEFAULT_PAGE),
  limit: z
    .number()
    .int()
    .min(1)
    .max(TASKS_MAX_LIMIT)
    .default(TASKS_DEFAULT_LIMIT),
  status: z.enum(TASK_STATUS_VALUES).optional(),
  priority: z.enum(TASK_PRIORITY_VALUES).optional(),
  creatorId: z.string().uuid().optional(),
  assigneeId: z.string().uuid().optional(),
  sortBy: z.enum(TASK_SORT_BY_FIELDS).default("updatedAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
})

export type TasksQuery = z.infer<typeof tasksQuerySchema>

export const defaultTasksQuery: TasksQuery = tasksQuerySchema.parse({})
