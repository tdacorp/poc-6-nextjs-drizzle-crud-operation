"use client";

export default function CommentsList({ comments }: { comments: any[] }) {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="space-y-3">
      {comments.map((c) => (
        <div key={c.id} className="border p-3 rounded">
          <p className="font-bold">{c.username}</p>
          <p>{c.text}</p>
          <span className="text-sm text-gray-500">
            {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
          </span>
          <p>Post id : {c.postId}</p>
        </div>
      ))}
    </div>
  );
}
