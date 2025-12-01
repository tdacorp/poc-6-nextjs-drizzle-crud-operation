"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { CategorySchema, CategoryInput } from "@/app/validations/categorySchema";
import { ZodError } from "zod";

// ✅ Only export async functions
export async function createCategory(input: CategoryInput) {
  try {
    const data = CategorySchema.parse(input); // Zod validation

    const [newCategory] = await db
      .insert(categories)
      .values(data)
      .returning();

    return newCategory;
  } catch (err) {
    if (err instanceof ZodError) throw err; // handle in client
    throw err;
  }
}

export async function getCategories() {
  return db.select().from(categories);
}
