// app/posts/[id]/page.tsx
import { getPostById } from "@/app/actions/postActions";
import { getCommentsByPost } from "@/app/actions/commentActions";
import CommentClient from "./CommentClient";

type PostPageProps = {
  params: Promise<{ id: string }>; // params is a Promise
};

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params; // unwrap the promise
  const postId = Number(resolvedParams.id);

  if (isNaN(postId)) {
    return <div className="p-8">Invalid post ID</div>;
  }

  const post = await getPostById(postId);

  if (!post) {
    return <div className="p-8">Post not found</div>;
  }

  const comments = await getCommentsByPost(postId);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>

      <CommentClient postId={postId} initialComments={comments} />
    </div>
  );
}
