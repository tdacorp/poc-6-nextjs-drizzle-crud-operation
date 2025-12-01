"use client";

import { useState } from "react";
import { createComment } from "@/app/actions/commentActions";

export default function CommentClient({
  initialComments,
  postId,
}: {
  initialComments: any[];
  postId: number;
}) {
  const [comments, setComments] = useState(initialComments);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const newComment = await createComment({
      postId,
      username,
      text,
    });

    setComments((prev) => [...prev, newComment]);
    setUsername("");
    setText("");
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* List Comments */}
    
<div className="space-y-3">
  {comments.length === 0 ? (
    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
  ) : (
    comments.map((c) => (
      <div key={c.id} className="border p-3 rounded">
        <p className="font-bold">{c.username}</p>
        <p>{c.text}</p>
        <span className="text-sm text-gray-500">
          {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
        </span>
      </div>
    ))
  )}
</div>


      {/* Add Comment */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input
          className="border p-2 rounded w-full"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <textarea
          className="border p-2 rounded w-full"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="bg-black text-white py-2 px-4 rounded" type="submit">
          Add Comment
        </button>
      </form>
    </div>
  );
}
