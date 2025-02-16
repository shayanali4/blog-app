import { getUsers } from "@/actions/user";
import UsersTable from "@/components/users/UsersTable";
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
        <h1 data-testid="users-title" className="text-3xl font-bold">
          All Users
        </h1>
        <Link href="/users/create">
          <button
            data-testid="create-user-btn"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Create User
          </button>
        </Link>
      </div>

      {/* Users Table */}
      <UsersTable
        users={users}
        totalPages={totalPages}
        page={pageNum}
        pageSize={pageSizeNum}
      />
    </div>
  );
}
