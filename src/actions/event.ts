// lib/actions/event.ts
"use server";
import { prisma } from "../lib/prisma";
import { subDays, startOfDay } from "date-fns";

// Log an event
export async function logEvent(
  postId: number,
  userId: number,
  type: "view" | "click"
) {
  console.log("vars2=>", postId, userId, type);

  return await prisma.event.create({
    data: {
      postId,
      userId,
      type: "view",
    },
    // data: { postId: 117, userId: 4, type: "view", timestamp: new Date() },
  });
}

// // Get analytics data
// export async function getAnalytics() {
//   const totalEvents = await prisma.event.count();

//   // Views per post
//   const viewsPerPost = await prisma.event.groupBy({
//     by: ["postId"],
//     _count: { postId: true },
//   });

//   // Get daily, weekly, and monthly views
//   const now = new Date();

//   const dailyViews = await prisma.event.groupBy({
//     by: ["timestamp"],
//     _count: { postId: true },
//     where: { timestamp: { gte: subDays(now, 7) } }, // Last 7 days
//     orderBy: { timestamp: "asc" },
//   });

//   const weeklyViews = await prisma.event.groupBy({
//     by: ["timestamp"],
//     _count: { postId: true },
//     where: { timestamp: { gte: subDays(now, 30) } }, // Last 30 days
//     orderBy: { timestamp: "asc" },
//   });

//   const monthlyViews = await prisma.event.groupBy({
//     by: ["timestamp"],
//     _count: { postId: true },
//     where: { timestamp: { gte: subDays(now, 90) } }, // Last 90 days
//     orderBy: { timestamp: "asc" },
//   });

//   return { totalEvents, viewsPerPost, dailyViews, weeklyViews, monthlyViews };
// }

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
