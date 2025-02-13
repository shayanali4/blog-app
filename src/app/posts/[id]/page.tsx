import { getPostById } from "@/actions";
import { logEvent } from "@/actions/event";
import { notFound } from "next/navigation";

export default async function SinglePostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const postId = parseInt(id);
  const userId = 1; // Replace with actual user ID

  console.log("vars=>", postId, userId);
  // Log a "view" event

  // Fetch the post data
  const post = await getPostById(postId);
  console.log("post=>", post);

  if (!post) {
    notFound();
  }

  await logEvent(postId, userId, "view");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">
        Author: <span className="font-medium">{post.author.name}</span>
      </p>
    </div>
  );
}
