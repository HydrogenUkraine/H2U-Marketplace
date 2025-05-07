"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

export default function DashboardCharts() {
  // Sample data for the charts
  const productionData = [
    { name: "Jan", production: 400, consumption: 240 },
    { name: "Feb", production: 300, consumption: 139 },
    { name: "Mar", production: 200, consumption: 980 },
    { name: "Apr", production: 278, consumption: 390 },
    { name: "May", production: 189, consumption: 480 },
    { name: "Jun", production: 239, consumption: 380 },
    { name: "Jul", production: 349, consumption: 430 },
    { name: "Aug", production: 349, consumption: 430 },
    { name: "Sep", production: 349, consumption: 430 },
    { name: "Oct", production: 349, consumption: 430 },
    { name: "Nov", production: 349, consumption: 430 },
    { name: "Dec", production: 349, consumption: 430 },
  ]

  return (
    <div className="grid grid-cols-1 gap-4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={productionData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} kg`}
          />
          <Tooltip />
          <Line type="monotone" dataKey="production" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="consumption" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
