import { z } from "zod"

import { TASK_PRIORITY_VALUES, TASK_STATUS_VALUES } from "@/constants/tasks"

const optionalUuid = z
  .union([z.string().uuid(), z.literal("")])
  .optional()
  .transform((v) => (v === "" || v === undefined ? undefined : v))

const optionalDue = z
  .union([z.string().min(1), z.literal("")])
  .optional()
  .transform((v) => (v === "" || v === undefined ? undefined : v))

/** Matches `CreateTaskDto` (POST /tasks). */
export const taskCreateFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(TASK_STATUS_VALUES),
  priority: z.enum(TASK_PRIORITY_VALUES),
  assigneeId: optionalUuid,
  dueDate: optionalDue,
})

/** RHF uses schema *input* shape (before transforms). */
export type TaskCreateFormValues = z.input<typeof taskCreateFormSchema>

/**
 * Form for PATCH /tasks/:id (no `status` in body — use PATCH /tasks/:id/status).
 * `status` is collected in the UI and applied via `updateTaskStatus` when it changes.
 */
export const taskEditFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(TASK_STATUS_VALUES),
  priority: z.enum(TASK_PRIORITY_VALUES),
  /** Empty string clears assignee (`null` on PATCH); omit when never assigned. */
  assigneeId: z.union([z.literal(""), z.string().uuid()]).optional(),
  dueDate: optionalDue,
})

export type TaskEditFormValues = z.input<typeof taskEditFormSchema>
