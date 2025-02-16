import React from "react";
import PostCard from "./PostCard";
import Pagination from "../Pagination";
import PageSizeInput from "../PageSizeInput";

interface PostsGridProps {
  posts: {
    id: number;
    title: string;
    content: string;
    author: {
      name: string;
    };
  }[];
  totalPages: number;
  pageSize: number;
  page: number;
}
function PostsGrid({ posts, totalPages, page, pageSize }: PostsGridProps) {
  return (
    <>
      <PageSizeInput pageSize={pageSize} baseUrl="/posts" />

      <div
        data-testid="posts-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination totalPages={totalPages} page={page} pageSize={pageSize} />
    </>
  );
}

export default PostsGrid;
