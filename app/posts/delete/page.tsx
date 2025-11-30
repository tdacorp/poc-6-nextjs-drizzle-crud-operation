import { db } from "@/db";
import { posts } from "@/db/schema/posts";

export async function deletePost(postId: number) {
  const deleted = await db
    .delete(posts)
    .where(posts.id.eq(postId))
    .returning();

  return deleted[0]; // returns the deleted post data
}
