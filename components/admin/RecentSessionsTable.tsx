'use client'

interface Session {
  id: string
  status: string
  iq_score: number | null
  created_at: string
  completed_at: string | null
}

interface RecentSessionsTableProps {
  sessions: Session[]
}

const statusColors: Record<string, string> = {
  in_progress: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
}

export default function RecentSessionsTable({ sessions }: RecentSessionsTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Recent Sessions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 pr-4 font-medium text-gray-500">Session</th>
              <th className="text-left py-2 pr-4 font-medium text-gray-500">Status</th>
              <th className="text-left py-2 pr-4 font-medium text-gray-500">IQ</th>
              <th className="text-left py-2 font-medium text-gray-500">Started</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id} className="border-b border-gray-50">
                <td className="py-2 pr-4 text-gray-700 font-mono text-xs">
                  {s.id.slice(0, 8)}
                </td>
                <td className="py-2 pr-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[s.status] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="py-2 pr-4 text-gray-900 font-medium">
                  {s.iq_score ?? '—'}
                </td>
                <td className="py-2 text-gray-500">
                  {new Date(s.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {sessions.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-400">
                  No sessions yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
