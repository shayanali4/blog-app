// "use client";
// import { useEffect, useState } from "react";
// import { getAnalytics } from "@/app/actions";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// export default function AnalyticsPage() {
//   const [analytics, setAnalytics] = useState<{
//     totalEvents: number;
//     viewsPerPost: any[];
//     dailyViews: any[];
//     weeklyViews: any[];
//     monthlyViews: any[];
//   } | null>(null);

//   useEffect(() => {
//     async function fetchAnalytics() {
//       const data = await getAnalytics();
//       setAnalytics(data);
//     }
//     fetchAnalytics();
//   }, []);

//   // Format timestamps for X-axis
//   const formatDate = (timestamp: string) =>
//     new Date(timestamp).toLocaleDateString();

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Analytics</h1>
//       {analytics ? (
//         <div>
//           <p className="mb-2">Total Events Logged: {analytics.totalEvents}</p>

//           {/* Views per post table */}
//           <h2 className="text-xl font-semibold mt-4 mb-2">Views Per Post</h2>
//           <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 p-2">Post ID</th>
//                 <th className="border border-gray-300 p-2">Total Views</th>
//               </tr>
//             </thead>
//             <tbody>
//               {analytics.viewsPerPost.length > 0 ? (
//                 analytics.viewsPerPost.map((item) => (
//                   <tr key={item.postId}>
//                     <td className="border border-gray-300 p-2 text-center">
//                       {item.postId}
//                     </td>
//                     <td className="border border-gray-300 p-2 text-center">
//                       {item._count.postId}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={2} className="text-center p-2">
//                     No data available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Daily, Weekly, Monthly Views Graphs */}
//           <h2 className="text-xl font-bold mt-6 mb-2">Views Trend</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Daily Views Chart */}
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Last 7 Days</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={analytics.dailyViews}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="timestamp" tickFormatter={formatDate} />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="_count.postId"
//                     stroke="#8884d8"
//                     strokeWidth={2}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Weekly Views Chart */}
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Last 30 Days</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={analytics.weeklyViews}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="timestamp" tickFormatter={formatDate} />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="_count.postId"
//                     stroke="#82ca9d"
//                     strokeWidth={2}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Monthly Views Chart */}
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Last 90 Days</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={analytics.monthlyViews}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="timestamp" tickFormatter={formatDate} />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="_count.postId"
//                     stroke="#FF8042"
//                     strokeWidth={2}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">Loading analytics...</p>
//       )}
//     </div>
//   );
// }

// app/analytics/page.tsx
import {
  getTotalEventsPerPost,
  getViewsPerPost,
  getTimeSeriesData,
} from "@/actions/event";

import EventsTrend from "../../components/EventsTrend";

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
