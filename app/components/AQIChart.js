import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AQIChart({ data }) {
  return (
    <div className="w-full h-64 bg-white dark:bg-black rounded-lg p-4 shadow">
      <h3 className="font-semibold mb-2">Historical AQI Trend</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="aqi" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 