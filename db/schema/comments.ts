import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userName: varchar("user_name").notNull(),
  text: varchar("text").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
