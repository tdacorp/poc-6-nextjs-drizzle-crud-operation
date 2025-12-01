// app/posts/page.tsx
import { getPosts } from "../actions/postActions";
import { getCategories } from "../actions/categoryActions";
import PostsClient from "./postlist";

export default async function PostsPage() {
  const posts = await getPosts();
  const categories = await getCategories(); // fetch categories from DB

  return (
    <div style={{ padding: 20 }}>
      <PostsClient posts={posts} categories={categories} />
    </div>
  );
}
