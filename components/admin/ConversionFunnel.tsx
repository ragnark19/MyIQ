'use client'

interface ConversionFunnelProps {
  startedToCompleted: number
  completedToPaid: number
}

export default function ConversionFunnel({
  startedToCompleted,
  completedToPaid,
}: ConversionFunnelProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <p className="text-sm font-medium text-gray-500">Started &rarr; Completed</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-3xl font-bold text-primary-600">
            {startedToCompleted}%
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all"
            style={{ width: `${Math.min(startedToCompleted, 100)}%` }}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <p className="text-sm font-medium text-gray-500">Completed &rarr; Paid</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-3xl font-bold text-accent-600">
            {completedToPaid}%
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-500 rounded-full transition-all"
            style={{ width: `${Math.min(completedToPaid, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
