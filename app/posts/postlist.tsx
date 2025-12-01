"use client";

import { useState, useTransition } from "react";
import { createPost, updatePost, deletePost } from "../actions/postActions";
import { createComment } from "../actions/commentActions";



interface Post {
  id: number;
  title: string | null;
  slug: string | null;
  content: string | null;
  status: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface Category {
  id: number;
  name: string | null;
  slug: string | null;
}

export default function PostsClient({
  posts,
  categories,
}: {
  posts: Post[];
  categories: Category[];
}) {
  const [postList, setPostList] = useState(posts);
  const [isPending, start] = useTransition();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [errors, setErrors] = useState<any>({});

  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
const [commentUsername, setCommentUsername] = useState("");
const [commentText, setCommentText] = useState("");

async function handleAddComment(postId: number) {
  if (!commentUsername || !commentText) {
    return alert("Please fill all fields");
  }

  await createComment({
    postId,
    username: commentUsername,
    text: commentText,
  });

  alert("Comment added!");

  // Reset form
  setCommentUsername("");
  setCommentText("");
  setActiveCommentPostId(null);
}


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const slugInput = form.elements.namedItem("slug") as HTMLInputElement;
    const contentInput = form.elements.namedItem(
      "content"
    ) as HTMLTextAreaElement;
    const statusInput = form.elements.namedItem("status") as HTMLSelectElement;

    const data = {
      title: titleInput.value,
      slug: slugInput.value,
      content: contentInput.value,
      status: statusInput.value as "draft" | "published",
      categoryIds: selectedCategories,
    };

    if (data.title.length < 3) return alert("Title must be at least 3 chars");
    if (data.slug.length < 3) return alert("Slug must be at least 3 chars");
    if (data.content.length < 10)
      return alert("Content must be at least 10 chars");

    start(async () => {
      try {
        const newPost = editingPost
          ? await updatePost(editingPost.id, data)
          : await createPost(data);

        if (editingPost) {
          setPostList(
            postList.map((p) => (p.id === editingPost.id ? newPost : p))
          );
          setEditingPost(null);
        } else {
          setPostList([newPost, ...postList]);
        }

        form.reset();
        setSelectedCategories([]);
      } catch (err: any) {
        if (err?.issues) {
          const fieldErrors = err.issues.reduce((acc: any, issue: any) => {
            acc[issue.path[0]] = issue.message;
            return acc;
          }, {});
          setErrors(fieldErrors);
        } else {
          console.error(err);
        }
      }
    });
  }

  async function handleDelete(id: number) {
    start(async () => {
      await deletePost(id);
      setPostList(postList.filter((p) => p.id !== id));
    });
  }

  function handleEdit(post: Post) {
    setEditingPost(post);
    setErrors({});
    // TODO: fetch categories for editing post if needed
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-6 border"
      >
        <h2 className="text-xl font-semibold">
          {editingPost ? "Edit Post" : "Create New Post"}
        </h2>
        {/* Title, Slug, Content, Status as before */}
        {/* Title */}{" "}
        <div>
          {" "}
          <label className="block mb-1 font-medium">Title</label>{" "}
          <input
            name="title"
            defaultValue={editingPost?.title || ""}
            className="w-full border rounded-lg px-3 py-2"
          />{" "}
          {errors.title && (
            <p className="text-red-600 text-sm">{errors.title[0]}</p>
          )}{" "}
        </div>{" "}
        {/* Slug */}{" "}
        <div>
          {" "}
          <label className="block mb-1 font-medium">Slug</label>{" "}
          <input
            name="slug"
            defaultValue={editingPost?.slug || ""}
            className="w-full border rounded-lg px-3 py-2"
          />{" "}
          {errors.slug && (
            <p className="text-red-600 text-sm">{errors.slug[0]}</p>
          )}{" "}
        </div>{" "}
        {/* Content */}{" "}
        <div>
          {" "}
          <label className="block mb-1 font-medium">Content</label>{" "}
          <textarea
            name="content"
            defaultValue={editingPost?.content || ""}
            className="w-full border rounded-lg px-3 py-2 h-28"
          />{" "}
          {errors.content && (
            <p className="text-red-600 text-sm">{errors.content[0]}</p>
          )}{" "}
        </div>{" "}
        {/* Status */}{" "}
        <div>
          {" "}
          <label className="block mb-1 font-medium">Status</label>{" "}
          <select
            name="status"
            defaultValue={editingPost?.status || "draft"}
            className="w-full border rounded-lg px-3 py-2"
          >
            {" "}
            <option value="draft">Draft</option>{" "}
            <option value="published">Published</option>{" "}
          </select>{" "}
          {errors.status && (
            <p className="text-red-600 text-sm">{errors.status[0]}</p>
          )}{" "}
        </div>
        {/* ...existing fields... */}
        {/* Category Multi-select */}
        <div>
          {/* <label className="block mb-1 font-medium">Categories</label> */}
          {/* Category Multi-select (optional, clean dropdown style) */}
<div className="relative">
  <label className="block mb-1 font-medium">Categories</label>

  <select
    multiple
    value={selectedCategories.map(String)}
    onChange={(e) => {
      const options = Array.from(e.target.selectedOptions);
      setSelectedCategories(options.map((o) => Number(o.value)));
    }}
    className="w-full border rounded-lg px-3 py-2 focus:ring focus:border-blue-500 outline-none"
    size={1} // keeps it a single-line dropdown
  >
    {categories.map((cat) => (
      <option key={cat.id} value={cat.id}>
        {cat.name}
      </option>
    ))}
  </select>

  <p className="text-gray-500 text-sm mt-1">
    Select one or more categories, or leave empty.
  </p>
</div>

        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            {editingPost ? "Update Post" : "Create Post"}
          </button>

          {editingPost && (
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setEditingPost(null);
                setErrors({});
                setSelectedCategories([]);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List as before */}
      <div className="bg-white rounded-xl shadow p-6 border">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <ul className="divide-y">
          {postList.map((p) => (
           <li key={p.id} className="py-4 border-b">
  <div className="flex justify-between">
    <div>
      <p className="font-semibold">{p.title}</p>
      <p className="text-sm text-gray-600">Status: {p.status}</p>
    </div>

    <div className="flex gap-2">
      <button
        onClick={() => handleEdit(p)}
        className="px-3 py-1 bg-yellow-500 text-white rounded"
      >
        Edit
      </button>

      <button
        onClick={() => handleDelete(p.id)}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Delete
      </button>

      <button
        onClick={() => setActiveCommentPostId(p.id)}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        Add Comment
      </button>
    </div>
  </div>

  {/* Comment form for this specific post */}
  {activeCommentPostId === p.id && (
    <div className="mt-3 p-3 border rounded bg-gray-50">
      <input
        type="text"
        placeholder="Your name"
        className="border p-2 rounded w-full mb-2"
        value={commentUsername}
        onChange={(e) => setCommentUsername(e.target.value)}
      />

      <textarea
        placeholder="Write a comment..."
        className="border p-2 rounded w-full mb-2"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      ></textarea>

      <button
        onClick={() => handleAddComment(p.id)}
        className="px-4 py-2 bg-green-700 text-white rounded"
      >
        Submit Comment
      </button>

      <button
        onClick={() => setActiveCommentPostId(null)}
        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
      >
        Cancel
      </button>
    </div>
  )}
</li>

          ))}
        </ul>
      </div>
    </div>
  );
}
