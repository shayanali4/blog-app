import {
  getTotalEventsPerPost,
  getViewsPerPost,
  getTimeSeriesData,
} from "@/actions/event";

import EventsTrend from "@/components/EventsTrend";

export default async function AnalyticsPage() {
  // Fetch analytics data
  const totalEventsPerPost = await getTotalEventsPerPost();
  const viewsPerPost = await getViewsPerPost();
  const timeSeriesData = await getTimeSeriesData();

  // Process time series data for the chart
  const chartData = timeSeriesData.map((event) => ({
    timestamp: event.timestamp.toISOString().split("T")[0], // Format date as YYYY-MM-DD
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

      <EventsTrend finalChartData={finalChartData} />

      {/* Total Events Per Post */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Total Events Per Post</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Post ID</th>
              <th className="py-2 px-4 border-b">Total Events</th>
            </tr>
          </thead>
          <tbody>
            {totalEventsPerPost.map((event) => (
              <tr key={event.postId}>
                <td className="py-2 px-4 border-b text-center">
                  {event.postId}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {event._count.postId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Views Per Post */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Views Per Post</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Post ID</th>
              <th className="py-2 px-4 border-b">Total Views</th>
            </tr>
          </thead>
          <tbody>
            {viewsPerPost.map((event) => (
              <tr key={event.postId}>
                <td className="py-2 px-4 border-b text-center">
                  {event.postId}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {event._count.postId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
