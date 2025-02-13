// app/posts/page.tsx
import { getPosts } from "@/actions/post";
import Link from "next/link";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page } = await searchParams;
  // Parse the page number from searchParams
  const pageNum = parseInt(page || "1");
  const pageSize = 10;

  // Fetch posts with pagination
  const { posts, totalPosts } = await getPosts(pageNum, pageSize);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalPosts / pageSize);

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
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`}>
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <p className="text-sm text-gray-500">
                  Author:{" "}
                  <span className="font-medium">{post.author.name}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <a
            key={i + 1}
            href={`/posts?page=${i + 1}`}
            className={`px-4 py-2 rounded-lg ${
              pageNum === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors duration-300`}
          >
            {i + 1}
          </a>
        ))}
      </div>
    </div>
  );
}
