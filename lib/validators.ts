import { z } from "zod";
export const CreateUserSchema = z.object({
  username: z.string().min(2).max(32),
  password: z.string().min(8).max(64)
})

export type CreateUserSchema = z.infer<typeof CreateUserSchema>
