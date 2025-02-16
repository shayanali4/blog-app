/**
 * @jest-environment node
 */

import { createUser, getUsers, getUserById } from "@/actions/user";
import { prisma } from "@/lib/prisma";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(), // Mock Next.js cache revalidation
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
    },
  },
}));

describe("User Server Actions", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test("Should create a user", async () => {
    const mockUser = { id: 1, name: "John Doe", email: "john@example.com" };

    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const user = await createUser({
      name: "John Doe",
      email: "john@example.com",
    });

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { name: "John Doe", email: "john@example.com" },
    });
    expect(user).toEqual(mockUser);
  });

  test("Should fetch paginated users", async () => {
    const mockUsers = [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
    ];

    (prisma.user.findMany as jest.Mock).mockResolvedValue([mockUsers[0]]);
    (prisma.user.count as jest.Mock).mockResolvedValue(2);

    const { users, totalUsers } = await getUsers(1, 1);

    expect(prisma.user.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 1,
      include: { _count: { select: { events: true, posts: true } } },
    });

    expect(users).toEqual([mockUsers[0]]);
    expect(totalUsers).toBe(2);
  });

  test("Should fetch a user by ID", async () => {
    const mockUser = { id: 3, name: "Charlie", email: "charlie@example.com" };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const user = await getUserById(3);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 3 },
    });
    expect(user).toEqual(mockUser);
  });

  test("Should return null if user not found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const user = await getUserById(999);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 999 },
    });
    expect(user).toBeNull();
  });
});
