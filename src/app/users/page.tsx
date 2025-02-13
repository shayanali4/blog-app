// app/users/page.tsx
import { getUsers } from "@/actions/user";
import Link from "next/link";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page } = await searchParams;
  const pageNum = parseInt(page || "1");
  const pageSize = 10;

  const { users, totalUsers } = await getUsers(pageNum, pageSize);
  const totalPages = Math.ceil(totalUsers / pageSize);

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

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Link key={user.id} href={`/users/${user.id}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6">
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 mb-4">
                  <b>Posts:</b> {user._count.posts}
                </span>
                <span className="text-gray-600 mb-4">
                  <b>Events:</b> {user._count.events}
                </span>
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
            href={`/users?page=${i + 1}`}
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
