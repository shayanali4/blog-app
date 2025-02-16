import React from "react";

function ViewsPerPost({
  viewsPerPost,
}: {
  viewsPerPost: {
    postId: number;
    _count: {
      postId: number;
    };
  }[];
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Views Per Post</h2>
      <table
        className="min-w-full bg-white border border-gray-200"
        data-testid="views-per-post-table"
      >
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Post ID</th>
            <th className="py-2 px-4 border-b">Total Views</th>
          </tr>
        </thead>
        <tbody>
          {viewsPerPost.map((event) => (
            <tr key={event.postId}>
              <td className="py-2 px-4 border-b text-center">{event.postId}</td>
              <td className="py-2 px-4 border-b text-center">
                {event._count.postId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewsPerPost;
