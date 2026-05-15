import { z } from "zod"

import { TASK_PRIORITY_VALUES, TASK_STATUS_VALUES } from "@/constants/tasks"

const taskUserSummarySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
})

export const taskWithRelationsSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.enum(TASK_STATUS_VALUES),
  priority: z.enum(TASK_PRIORITY_VALUES),
  dueDate: z.string().nullable(),
  creatorId: z.string().uuid(),
  assigneeId: z.string().uuid().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  creator: taskUserSummarySchema,
  assignee: taskUserSummarySchema.nullable(),
})

export const paginatedTasksResponseSchema = z.object({
  items: z.array(taskWithRelationsSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  skip: z.number().int().nonnegative(),
  take: z.number().int().nonnegative(),
  sortBy: z.string(),
  sortOrder: z.enum(["asc", "desc"]),
})

export type TaskWithRelations = z.infer<typeof taskWithRelationsSchema>
export type TaskStatus = TaskWithRelations["status"]
export type TaskPriority = TaskWithRelations["priority"]
export type PaginatedTasksResponse = z.infer<typeof paginatedTasksResponseSchema>
