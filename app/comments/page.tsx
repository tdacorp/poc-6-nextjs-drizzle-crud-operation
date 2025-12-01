import { getAllComments } from "@/app/actions/commentActions";
import CommentsListClient from "./CommentsList";

export default async function CommentsPage() {
  const comments = await getAllComments(); // fetch all comments

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Comments</h1>

      <CommentsListClient comments={comments} />
    </div>
  );
}
