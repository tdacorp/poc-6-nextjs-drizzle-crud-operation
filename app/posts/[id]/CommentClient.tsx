"use client";

import { useState } from "react";
import { createComment } from "@/app/actions/commentActions";
import CommentsList from "@/app/comments/CommentsList";

export default function CommentClient({ initialComments, postId }: any) {
  const [comments, setComments] = useState(initialComments);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const newComment = await createComment({ postId, username, text });

setComments((prev: Comment[]) => [...prev, newComment]);
    setUsername("");
    setText("");
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* ⬇️ IMPORTED COMMENT LIST */}
      <CommentsList comments={comments} />

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
