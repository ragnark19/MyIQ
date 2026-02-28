export interface AdminStats {
  sessions: {
    total: number
    inProgress: number
    completed: number
    paid: number
  }
  revenue: {
    total: number
    today: number
    thisWeek: number
    thisMonth: number
    daily: { date: string; amount: number }[]
  }
  conversions: {
    startedToCompleted: number
    completedToPaid: number
  }
  iqDistribution: { range: string; count: number }[]
  categoryPerformance: { category: string; avgCorrectPct: number }[]
  recentPayments: {
    id: string
    session_id: string
    customer_email: string | null
    amount: number
    currency: string
    paid_at: string | null
    created_at: string
  }[]
  recentSessions: {
    id: string
    status: string
    iq_score: number | null
    created_at: string
    completed_at: string | null
  }[]
}
