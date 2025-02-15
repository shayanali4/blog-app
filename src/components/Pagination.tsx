import React from "react";

function Pagination({
  totalPages,
  pageSize,
  page,
}: {
  totalPages: number;
  pageSize: number;
  page: number;
}) {
  return (
    <div className="flex justify-center mt-8 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <a
          key={i + 1}
          href={`/posts?page=${i + 1}&pageSize=${pageSize}`}
          className={`px-4 py-2 rounded-lg ${
            page === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition-colors duration-300`}
        >
          {i + 1}
        </a>
      ))}
    </div>
  );
}

export default Pagination;
