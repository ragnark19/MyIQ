'use client'

interface StatCardProps {
  label: string
  value: string | number
  sublabel?: string
}

export default function StatCard({ label, value, sublabel }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      {sublabel && (
        <p className="mt-1 text-xs text-gray-400">{sublabel}</p>
      )}
    </div>
  )
}
