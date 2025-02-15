import { getUsers } from "@/actions/user";
import PageSizeInput from "@/components/PageSizeInput";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const { page, pageSize } = await searchParams;
  const pageNum = parseInt(page || "1");
  const pageSizeNum = parseInt(pageSize || "10");

  const { users, totalUsers } = await getUsers(pageNum, pageSizeNum);
  const totalPages = Math.ceil(totalUsers / pageSizeNum);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Users</h1>
        <Link href="/users/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            Create User
          </button>
        </Link>
      </div>
      <PageSizeInput pageSize={pageSizeNum} baseUrl="/users" />

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
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
      <Pagination
        totalPages={totalPages}
        page={pageNum}
        pageSize={pageSizeNum}
      />
    </div>
  );
}
