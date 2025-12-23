import { z } from 'zod'

export const searchUsersSchema = z.object({
  username: z.string().min(1).max(20),
})

export const sendFriendRequestSchema = z.object({
  receiverId: z.string(),
})

export const respondFriendRequestSchema = z.object({
  requestId: z.string(),
  action: z.enum(['accept', 'reject']),
})

export type SearchUsersInput = z.infer<typeof searchUsersSchema>
export type SendFriendRequestInput = z.infer<typeof sendFriendRequestSchema>
export type RespondFriendRequestInput = z.infer<typeof respondFriendRequestSchema>

