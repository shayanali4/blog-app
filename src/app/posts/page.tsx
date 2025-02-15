import { getPosts } from "@/actions/post";
import PageSizeInput from "@/components/PageSizeInput";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
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
        <h1 className="text-3xl font-bold">All Posts</h1>
        <Link href="/posts/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            Create Post
          </button>
        </Link>
      </div>

      <PageSizeInput pageSize={pageSizeNum} baseUrl="/posts" />
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        totalPages={totalPages}
        page={pageNum}
        pageSize={pageSizeNum}
      />
    </div>
  );
}
