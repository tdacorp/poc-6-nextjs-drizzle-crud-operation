"use server";

import { db } from "@/db";
import { posts, postCategories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { PostSchema, PostInput } from "@/app/validations/postSchema";
import { ZodError } from "zod";

// 1) Get all posts
export async function getPosts() {
  return await db.select().from(posts).orderBy(desc(posts.createdAt));
}

// 2) Create Post
export async function createPost(input: PostInput) {
  try {
    const data = PostSchema.parse(input);

    // Insert post
    const [newPost] = await db
      .insert(posts)
      .values({
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
      })
      .returning();

    // Insert category relations
    if (data.categoryIds?.length) {
      const joinRows = data.categoryIds.map((cid) => ({
        postId: newPost.id,
        categoryId: cid,
      }));
      await db.insert(postCategories).values(joinRows);
    }

    return newPost;
  } catch (err) {
    if (err instanceof ZodError) throw err;
    throw err;
  }
}

// 3) Update Post
export async function updatePost(
  id: number,
  data: PostInput,
  categoryIds?: number[]
) {
  const [updatedPost] = await db
    .update(posts)
    .set(data)
    .where(eq(posts.id, id))
    .returning();

  // Replace category mappings
  if (categoryIds?.length) {
    await db.delete(postCategories).where(eq(postCategories.postId, id));

    const joinRows = categoryIds.map((cid) => ({
      postId: id,
      categoryId: cid,
    }));

    await db.insert(postCategories).values(joinRows);
  }

  return updatedPost;
}

// 4) Delete Post
export async function deletePost(id: number) {
  const [deleted] = await db
    .delete(posts)
    .where(eq(posts.id, id))
    .returning();

  return deleted;
}

// 5) Get single post
export async function getPostById(id: number) {
  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id));

  return rows[0] ?? null;
}
