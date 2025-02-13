"use server";
import { prisma } from "../lib/prisma";

export async function createUser(name: string, email: string) {
  return await prisma.user.create({
    data: { name, email },
  });
}

export async function getUsers(page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;
  const users = await prisma.user.findMany({
    skip: offset,
    take: pageSize,

    include: {
      _count: {
        select: {
          events: true,
          posts: true,
        },
      },
    },
  });
  const totalUsers = await prisma.user.count();
  return { users, totalUsers };
}

export async function getUserById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
    // include: { author: true },
  });
}
