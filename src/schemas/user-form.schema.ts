import { z } from "zod"

/** Admin `PUT /users/:id` body (subset of `AdminUpdateUserDto`). */
export const adminUserEditFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email required"),
    role: z.enum(["USER", "ADMIN"]),
    password: z.string().optional(),
  })
  .refine(
    (d) => !d.password?.trim() || d.password.trim().length >= 8,
    {
      message: "Password must be at least 8 characters or left blank",
      path: ["password"],
    }
  )

export type AdminUserEditFormValues = z.input<typeof adminUserEditFormSchema>
