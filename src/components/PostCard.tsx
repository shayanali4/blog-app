import Link from "next/link";
import React from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
}
function PostCard({ post }: { post: Post }) {
  const { id, title, content, author } = post;
  return (
    <Link href={`/posts/${id}`}>
      <div
        key={post.id}
        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{content}</p>
          <p className="text-sm text-gray-500">
            Author: <span className="font-medium">{author.name}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
