import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
