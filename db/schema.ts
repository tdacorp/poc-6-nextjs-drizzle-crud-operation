import { pgTable, serial, varchar, text, integer,timestamp, primaryKey } from "drizzle-orm/pg-core";

// Posts table
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title"),
  slug: varchar("slug").unique(),
  content: text("content"),
  status: varchar("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Comments table (1:N with posts)
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
  .references(() => posts.id, { onDelete: "cascade" }),
  userName: varchar("user_name").notNull(),  
  text: varchar("text").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").unique(),
  slug: varchar("slug").unique()
});

// Join table for posts and categories (M:N)
export const postCategories = pgTable(
  "post_categories",
  {
    postId: integer("post_id").references(() => posts.id,{onDelete: "cascade"}),
    categoryId: integer("category_id").references(() => categories.id, {onDelete: "cascade"} ),
  },
  (table) => ({
    pk: primaryKey(table.postId, table.categoryId),
  })
);
