"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { enqueueTaskStatusMove } from "@/lib/helpers/task-status-move-queue"
import {
  findAssignableUser,
  findTaskInAllLists,
  patchTaskEditInAllLists,
  restoreTaskLists,
  setTaskDetailCache,
  snapshotTaskLists,
  type TaskListCacheSnapshot,
} from "@/lib/helpers/task-list-cache"
import type { TaskStatus, TaskWithRelations } from "@/schemas/task-api.schema"
import {
  updateTask,
  type UpdateTaskPayload,
} from "@/services/tasks/updateTask"

export type UpdateTaskEditVariables = {
  id: string
  previousStatus: TaskStatus
  nextStatus: TaskStatus
  payload: UpdateTaskPayload
}

type Ctx = { previous: TaskListCacheSnapshot }

/**
 * Edit dialog: one optimistic cache write, then status queue (if needed) + PATCH body.
 * Avoids racing separate status/update mutations with conflicting rollbacks.
 */
export function useUpdateTaskEdit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      previousStatus,
      nextStatus,
      payload,
    }: UpdateTaskEditVariables) => {
      if (nextStatus !== previousStatus) {
        await enqueueTaskStatusMove(queryClient, id, nextStatus)
      }
      return updateTask(id, payload)
    },
    onMutate: ({ id, nextStatus, payload }) => {
      const previous = snapshotTaskLists(queryClient)
      patchTaskEditInAllLists(queryClient, id, {
        status: nextStatus,
        patch: (task) => {
          const next = { ...task, updatedAt: new Date().toISOString() }
          if (payload.title !== undefined) next.title = payload.title
          if (payload.description !== undefined) {
            next.description = payload.description
          }
          if (payload.priority !== undefined) next.priority = payload.priority
          if (payload.dueDate !== undefined) next.dueDate = payload.dueDate
          if (payload.assigneeId !== undefined) {
            next.assigneeId = payload.assigneeId
            if (payload.assigneeId === null) {
              next.assignee = null
            } else {
              const user = findAssignableUser(queryClient, payload.assigneeId)
              next.assignee = user ?? {
                id: payload.assigneeId,
                name: "…",
                email: "",
              }
            }
          }
          return next
        },
      })
      return { previous } satisfies Ctx
    },
    onError: (e: Error, _vars, context) => {
      if (context?.previous) {
        restoreTaskLists(queryClient, context.previous)
      }
      toast.error(e.message ?? "Could not update task")
    },
    onSuccess: (serverTask: TaskWithRelations) => {
      const cached = findTaskInAllLists(queryClient, serverTask.id)
      const merged: TaskWithRelations = cached
        ? { ...cached, ...serverTask, status: cached.status }
        : serverTask
      patchTaskEditInAllLists(queryClient, serverTask.id, {
        patch: () => merged,
      })
      setTaskDetailCache(queryClient, merged)
      toast.success("Task updated")
    },
  })
}
