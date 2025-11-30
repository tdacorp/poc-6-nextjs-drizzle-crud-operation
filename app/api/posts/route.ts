import { db } from "@/db";
import { posts } from "@/db/schema/posts";

export async function POST(req: Request) {
  const body = await req.json();
  await db.insert(posts).values(body);
  return Response.json({ message: "Post created" });
}

export async function GET() {
  const allPosts = await db.select().from(posts);
  return Response.json(allPosts);
}
