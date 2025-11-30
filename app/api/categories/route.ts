import { db } from "@/db";
import { categories } from "@/db/schema/categories";

export async function POST(req: Request) {
  const body = await req.json();
  await db.insert(categories).values(body);
  return Response.json({ message: "category created" });
}

export async function GET() {
  const allPosts = await db.select().from(categories);
  return Response.json(categories);
}
