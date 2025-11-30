import Link from "next/link";
export default async function PostsPage() {
  const posts = await fetch("http://localhost:3000/api/posts").then(r => r.json());

  async function handleDelete(postId: number) {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "DELETE"
  });
  const json = await res.json();
  if (json.success) {
    alert("Post deleted!");
    // optionally refresh page
  } else {
    alert("Error: " + json.error);
  }
}


  return (
    <div>
      <h1>All Posts</h1>
      <Link href="/posts/create">
        <button>New</button>
      </Link>
      {posts.map(p => (
        <a key={p.id} href={`/posts/${p.slug}`}>
            <h2>{p.id}</h2>
          <h2>{p.title}</h2>
                <button onClick={() => handleDelete(post.id)}>Delete Post</button>

        </a>
      ))}
    </div>
  );
}
