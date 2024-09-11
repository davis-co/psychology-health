import React from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const CustomLineChart = ({ chartData }) => {
  return (
    <ResponsiveContainer className="" width="100%" height={220}>
      <AreaChart
        data={chartData}
        margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
      >
        <XAxis
          dataKey="name"
          angle={-60}
          fontSize={12}
          textAnchor="start"
          interval={0}
          height={60}
          tickLine={false}
          axisLine={{ stroke: "#d3d3d3" }}
          tick={{ fill: "#a1a4a2" }}
        />
        <YAxis
          textAnchor="start"
          tickLine={false}
          axisLine={{ stroke: "#d3d3d3" }}
          tick={{ fill: "#a1a4a2" }}
          fontSize={12}
        />
        <Tooltip />
        <defs>
          <linearGradient id="value" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#644DF6" stopOpacity={0.2} />
            <stop offset="85%" stopColor="#644DF6" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* <Line
          type="linear"
          dataKey="value"
          stroke="#000080"
          strokeWidth={2}
          dot={false}
          fill="#000080"
          fillOpacity={0.8}
          activeDot={{ r: 8 }}
          animationDuration={2000}
        /> */}
        <Area
          type="linear"
          dataKey="value"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#value)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default CustomLineChart
