import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  content: z.string().min(10),
  status: z.enum(["draft", "published"]),
  categoryIds: z.array(z.number()).optional(), 
});

export type PostInput = z.infer<typeof PostSchema>;
