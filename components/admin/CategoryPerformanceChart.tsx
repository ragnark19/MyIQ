'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

interface CategoryPerformanceChartProps {
  data: { category: string; avgCorrectPct: number }[]
}

export default function CategoryPerformanceChart({ data }: CategoryPerformanceChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Category Performance (Avg % Correct)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fontSize: 11 }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fontSize: 11 }}
              width={140}
            />
            <Tooltip formatter={(value: number) => [`${value}%`, 'Avg Correct']} />
            <Bar dataKey="avgCorrectPct" fill="#d946ef" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
