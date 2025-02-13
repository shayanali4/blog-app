"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartDataPoint = {
  timestamp: string; // Assuming the timestamp is a formatted string
  view: number;
  click: number;
};

interface EventsTrendProps {
  finalChartData: ChartDataPoint[];
}

function EventsTrend({ finalChartData }: EventsTrendProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Event Trends Over Time</h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={finalChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="view"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="click" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EventsTrend;
