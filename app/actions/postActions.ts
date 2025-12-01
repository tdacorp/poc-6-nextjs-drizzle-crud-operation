// app/actions/postActions.ts

"use server";


import { db } from "@/db";
import { posts } from "@/db/schema";
import { postCategories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { PostSchema, PostInput } from "@/app/validations/postSchema";
import { z, ZodError } from "zod";



// Get all posts (descending by createdAt)
export async function getPosts() {
  return await db.select().from(posts).orderBy(desc(posts.createdAt));
}

// Create a new post


export async function createPost(input: PostInput) {
  try {
    const data = PostSchema.parse(input);

    // Insert post
    const [newPost] = await db.insert(posts).values({
      title: data.title,
      slug: data.slug,
      content: data.content,
      status: data.status,
    }).returning();

    // Insert into join table
    if (data.categoryIds && data.categoryIds.length > 0) {
      const joinData = data.categoryIds.map(catId => ({
        postId: newPost.id,
        categoryId: catId,
      }));
      await db.insert(postCategories).values(joinData);
    }

    return newPost;
  } catch (err) {
    if (err instanceof ZodError) throw err;
    throw err;
  }
}

// EDIT POST
export async function updatePost(id: number, data: PostInput, categoryIds?: number[]) {
  // 1️⃣ Update post itself
  const [updatedPost] = await db
    .update(posts)
    .set(data)
  .where(eq(posts.id, id))
    .returning();

  // 2️⃣ Update join table
  if (categoryIds && categoryIds.length > 0) {
    // a) Delete existing relations
    await db
      .delete(postCategories)
    .where(eq(postCategories.postId, id));
    // b) Insert new relations
    const newRelations = categoryIds.map((catId) => ({
      postId: id,
      categoryId: catId,
    }));
    await db.insert(postCategories).values(newRelations);
  }

  return updatedPost;
}



// Delete a post by ID
export async function deletePost(id: number) {
  const deleted = await db.delete(posts).where(eq(posts.id, id)).returning();
  return deleted[0];
}
