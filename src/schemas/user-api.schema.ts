import { z } from "zod"

export const adminUserRowSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  failedLoginAttempts: z.number().optional(),
  lockUntil: z.string().nullable().optional(),
})

export const adminUsersListSchema = z.array(adminUserRowSchema)

export type AdminUserRow = z.infer<typeof adminUserRowSchema>
