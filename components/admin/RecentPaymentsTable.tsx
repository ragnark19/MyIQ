'use client'

interface Payment {
  id: string
  session_id: string
  customer_email: string | null
  amount: number
  currency: string
  paid_at: string | null
  created_at: string
}

interface RecentPaymentsTableProps {
  payments: Payment[]
}

export default function RecentPaymentsTable({ payments }: RecentPaymentsTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Recent Payments</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 pr-4 font-medium text-gray-500">Email</th>
              <th className="text-left py-2 pr-4 font-medium text-gray-500">Amount</th>
              <th className="text-left py-2 font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-gray-50">
                <td className="py-2 pr-4 text-gray-700 truncate max-w-[200px]">
                  {p.customer_email || '—'}
                </td>
                <td className="py-2 pr-4 text-gray-900 font-medium">
                  ${p.amount.toFixed(2)}
                </td>
                <td className="py-2 text-gray-500">
                  {p.paid_at
                    ? new Date(p.paid_at).toLocaleDateString()
                    : '—'}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-400">
                  No payments yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
