import Link from "next/link";
import React from "react";
import Pagination from "../Pagination";
import PageSizeInput from "../PageSizeInput";

interface UsersTableProps {
  users: {
    id: number;
    name: string;
    email: string;
    _count: { posts: number; events: number };
  }[];
  totalPages: number;
  pageSize: number;
  page: number;
}
function UsersTable({ users, totalPages, page, pageSize }: UsersTableProps) {
  return (
    <>
      <PageSizeInput pageSize={pageSize} baseUrl="/users" />

      <div className="overflow-x-auto">
        <table
          className="min-w-full bg-white shadow-md rounded-lg overflow-hidden"
          data-testid="users-table"
        >
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Posts</th>
              <th className="py-3 px-6 text-center">Events</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 text-center">{user._count.posts}</td>
                <td className="py-3 px-6 text-center">{user._count.events}</td>
                <td className="py-3 px-6 text-center">
                  <Link
                    href={`/users/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <Pagination totalPages={totalPages} page={page} pageSize={pageSize} />
    </>
  );
}

export default UsersTable;
