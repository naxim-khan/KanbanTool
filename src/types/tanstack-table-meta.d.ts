import type { TaskWithRelations } from "@/schemas/task-api.schema"
import type { AdminUserRow } from "@/schemas/user-api.schema"

declare module "@tanstack/react-table" {
  interface TableMeta {
    taskRowActions?: {
      onView: (task: TaskWithRelations) => void
      onEdit: (task: TaskWithRelations) => void
      onDelete: (task: TaskWithRelations) => void
    }
    userRowActions?: {
      sessionUserId: string | undefined
      onView: (user: AdminUserRow) => void
      onEdit: (user: AdminUserRow) => void
      onDelete: (user: AdminUserRow) => void
    }
  }
}
