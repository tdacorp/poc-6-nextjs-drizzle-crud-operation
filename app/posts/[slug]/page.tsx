export default async function PostPage({ params }) {
  const posts = await fetch("http://localhost:3000/api/posts").then(r => r.json());
  const post = posts.find(p => p.slug === params.slug);

  const comments = await fetch("http://localhost:3000/api/comments").then(r => r.json());
  const filtered = comments.filter(c => c.postId === post.id);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <h3>Comments</h3>
      {filtered.map(c => (
        <p key={c.id}><b>{c.userName}:</b> {c.text}</p>
      ))}
    </div>
  );
}
