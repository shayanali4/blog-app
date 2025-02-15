"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export async function createPost({
  title,
  content,
  authorId,
}: {
  title: string;
  content: string;
  authorId: number;
}) {
  const post = await prisma.post.create({
    data: { title, content, published: true, authorId },
  });
  revalidatePath("/posts");
  return post;
}

export async function getPosts(page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;
  const posts = await prisma.post.findMany({
    skip: offset,
    take: pageSize,
    orderBy: { id: "desc" },
    include: { author: true },
  });
  const totalPosts = await prisma.post.count();
  return { posts, totalPosts };
}

export async function getPostById(postId: number) {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });
}
