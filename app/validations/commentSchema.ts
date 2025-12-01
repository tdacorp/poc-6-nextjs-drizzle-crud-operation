import { z } from "zod";

export const CommentSchema = z.object({
  postId: z.number(),
  username: z.string().min(2),
  text: z.string().min(1),
});

export type CommentInput = z.infer<typeof CommentSchema>;
