import { getPosts } from "@/actions/post";
import PostsGrid from "@/components/post/PostsGrid";
import Link from "next/link";

export default async function PostsPage(props: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const searchParams = await props.searchParams;
  const { page, pageSize } = searchParams;

  const pageNum = parseInt(page || "1");
  const pageSizeNum = parseInt(pageSize || "10");

  // Fetch posts with pagination
  const { posts, totalPosts } = await getPosts(pageNum, pageSizeNum);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalPosts / pageSizeNum);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 data-testid="posts-title" className="text-3xl font-bold">
          All Posts
        </h1>
        <Link href="/posts/create">
          <button
            data-testid="create-post-btn"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Create Post
          </button>
        </Link>
      </div>

      {/* Posts Grid */}
      <PostsGrid
        posts={posts}
        totalPages={totalPages}
        page={pageNum}
        pageSize={pageSizeNum}
      />
    </div>
  );
}
