"use server";
import { prisma } from "../lib/prisma";

// Log an event
export async function logEvent(
  postId: number,
  userId: number,
  type: "view" | "click"
) {
  return await prisma.event.create({
    data: {
      postId,
      userId,
      type: "view",
    },
  });
}

// Fetch total number of events per post
export async function getTotalEventsPerPost() {
  return await prisma.event.groupBy({
    by: ["postId"],
    _count: { postId: true },
  });
}

// Fetch number of views per post
export async function getViewsPerPost() {
  return await prisma.event.groupBy({
    by: ["postId"],
    _count: { postId: true },
    where: { type: "view" },
  });
}

// Fetch time-based data for a time series chart
export async function getTimeSeriesData() {
  return await prisma.event.findMany({
    select: {
      timestamp: true,
      type: true,
      postId: true,
    },
    orderBy: {
      timestamp: "asc",
    },
  });
}
