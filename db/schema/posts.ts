import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title"),
  slug: varchar("slug").unique(),
  content: text("content"),
  status: varchar("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
