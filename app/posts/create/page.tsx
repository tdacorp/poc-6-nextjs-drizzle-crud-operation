"use client";

export default function NewPost() {
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      slug: e.target.slug.value,
      content: e.target.content.value,
      status: "draft"
    };
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" />
      <input name="slug" placeholder="Slug" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create</button>
    </form>
  );
}
