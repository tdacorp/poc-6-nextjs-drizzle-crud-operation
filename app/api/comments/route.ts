import { db } from "@/db";
import { comments } from "@/db/schema/comments";

export async function POST(req: Request) {
  const body = await req.json();
  await db.insert(comments).values(body);
  return Response.json({ message: "Comment added" });
}

export async function GET() {
  const all = await db.select().from(comments);
  return Response.json(all);
}
