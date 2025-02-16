import React from "react";
import {
  getTotalEventsPerPost,
  getViewsPerPost,
  getTimeSeriesData,
} from "@/actions/event";

import EventsTrend from "@/components/home/EventsTrend";
import ViewsPerPost from "@/components/home/ViewsPerPost";
import EventsPerPost from "@/components/home/EventsPerPost";

export default async function AnalyticsPage() {
  // Fetch analytics data
  const totalEventsPerPost = await getTotalEventsPerPost();
  const viewsPerPost = await getViewsPerPost();
  const timeSeriesData = await getTimeSeriesData();

  const chartData = timeSeriesData.map((event) => ({
    timestamp: new Date(event.timestamp).toISOString().split("T")[0], // Convert timestamp to Date
    [event.type]: 1, // Increment count for the event type
  }));

  // Aggregate counts for each event type by date
  const aggregatedData = chartData.reduce((acc, curr) => {
    const date = curr.timestamp;
    if (!acc[date]) {
      acc[date] = { timestamp: date, view: 0, click: 0 };
    }
    if (curr.view) acc[date].view += 1;
    if (curr.click) acc[date].click += 1;
    return acc;
  }, {} as Record<string, { timestamp: string; view: number; click: number }>);

  const finalChartData = Object.values(aggregatedData);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      {/* Events Chart */}
      <EventsTrend finalChartData={finalChartData} />
      {/* Total Events Per Post */}
      <EventsPerPost totalEventsPerPost={totalEventsPerPost} />
      {/* Views Per Post */}
      <ViewsPerPost viewsPerPost={viewsPerPost} />
    </div>
  );
}
