"use server";

import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";

import { CommentSchema, CommentInput } from "@/app/validations/commentSchema";

export async function createComment(input: CommentInput) {
  const data = CommentSchema.parse(input);

  const [newComment] = await db.insert(comments).values(data).returning();

  return {
    ...newComment,
    createdAt: newComment.createdAt?.toISOString() ?? "",
  };
}

export async function getCommentsByPost(postId: number) {
  try {
    const rows = await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId));

    return rows.map((c) => ({
      ...c,
      createdAt: c.createdAt?.toISOString() ?? "",
    }));
  } catch (err) {
    console.error("Error fetching comments:", err);
    return []; // important fallback
  }
}



export async function getAllComments() {
  try {
    return await db.select().from(comments);
  } catch (error) {
    console.error("Error fetching all comments:", error);
    return [];
  }
}