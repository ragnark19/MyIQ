import { createServiceClient } from '@/lib/supabase/server'
import { AdminStats } from '@/types/admin'

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createServiceClient()

  const [
    sessionsResult,
    revenueResult,
    dailyRevenueResult,
    iqResult,
    categoryResult,
    recentPaymentsResult,
    recentSessionsResult,
  ] = await Promise.all([
    // Session counts by status
    supabase
      .from('test_sessions')
      .select('status'),
    // All completed payments
    supabase
      .from('payments')
      .select('amount, paid_at')
      .eq('status', 'completed'),
    // Daily revenue (last 30 days)
    supabase
      .from('payments')
      .select('amount, paid_at')
      .eq('status', 'completed')
      .gte('paid_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('paid_at', { ascending: true }),
    // IQ scores for distribution
    supabase
      .from('test_sessions')
      .select('iq_score')
      .not('iq_score', 'is', null),
    // Category performance: responses with question data
    supabase
      .from('test_responses')
      .select('is_correct, question_id, questions(category)')
      .not('questions', 'is', null),
    // Recent payments
    supabase
      .from('payments')
      .select('id, session_id, customer_email, amount, currency, paid_at, created_at')
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(20),
    // Recent sessions
    supabase
      .from('test_sessions')
      .select('id, status, iq_score, created_at, completed_at')
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  // Process session counts
  const sessions = sessionsResult.data || []
  const sessionCounts = {
    total: sessions.length,
    inProgress: sessions.filter((s) => s.status === 'in_progress').length,
    completed: sessions.filter((s) => s.status === 'completed').length,
    paid: sessions.filter((s) => s.status === 'paid').length,
  }

  // Process revenue
  const payments = revenueResult.data || []
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0)
  const todayRevenue = payments
    .filter((p) => p.paid_at && p.paid_at >= todayStart)
    .reduce((sum, p) => sum + (p.amount || 0), 0)
  const weekRevenue = payments
    .filter((p) => p.paid_at && p.paid_at >= weekStart)
    .reduce((sum, p) => sum + (p.amount || 0), 0)
  const monthRevenue = payments
    .filter((p) => p.paid_at && p.paid_at >= monthStart)
    .reduce((sum, p) => sum + (p.amount || 0), 0)

  // Process daily revenue
  const dailyMap = new Map<string, number>()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
    dailyMap.set(d.toISOString().slice(0, 10), 0)
  }
  for (const p of dailyRevenueResult.data || []) {
    if (p.paid_at) {
      const day = p.paid_at.slice(0, 10)
      dailyMap.set(day, (dailyMap.get(day) || 0) + (p.amount || 0))
    }
  }
  const dailyRevenue = Array.from(dailyMap.entries()).map(([date, amount]) => ({
    date,
    amount: Math.round(amount * 100) / 100,
  }))

  // Conversion rates
  const finishedOrPaid = sessionCounts.completed + sessionCounts.paid
  const startedToCompleted =
    sessionCounts.total > 0
      ? ((finishedOrPaid) / sessionCounts.total) * 100
      : 0
  const completedToPaid =
    finishedOrPaid > 0
      ? (sessionCounts.paid / finishedOrPaid) * 100
      : 0

  // IQ distribution
  const iqRanges = [
    { range: '55-69', min: 55, max: 69 },
    { range: '70-79', min: 70, max: 79 },
    { range: '80-89', min: 80, max: 89 },
    { range: '90-99', min: 90, max: 99 },
    { range: '100-109', min: 100, max: 109 },
    { range: '110-119', min: 110, max: 119 },
    { range: '120-129', min: 120, max: 129 },
    { range: '130-145', min: 130, max: 145 },
  ]
  const iqScores = (iqResult.data || []).map((s) => s.iq_score as number)
  const iqDistribution = iqRanges.map(({ range, min, max }) => ({
    range,
    count: iqScores.filter((s) => s >= min && s <= max).length,
  }))

  // Category performance
  const categoryMap = new Map<string, { correct: number; total: number }>()
  for (const r of categoryResult.data || []) {
    const category = (r as Record<string, unknown>).questions as { category: string } | null
    if (!category) continue
    const cat = category.category
    const entry = categoryMap.get(cat) || { correct: 0, total: 0 }
    entry.total++
    if (r.is_correct) entry.correct++
    categoryMap.set(cat, entry)
  }
  const categoryLabels: Record<string, string> = {
    pattern: 'Pattern Recognition',
    numerical: 'Numerical Reasoning',
    verbal: 'Verbal Reasoning',
    spatial: 'Spatial Reasoning',
  }
  const categoryPerformance = Array.from(categoryMap.entries()).map(
    ([cat, { correct, total }]) => ({
      category: categoryLabels[cat] || cat,
      avgCorrectPct: total > 0 ? Math.round((correct / total) * 100) : 0,
    })
  )

  return {
    sessions: sessionCounts,
    revenue: {
      total: Math.round(totalRevenue * 100) / 100,
      today: Math.round(todayRevenue * 100) / 100,
      thisWeek: Math.round(weekRevenue * 100) / 100,
      thisMonth: Math.round(monthRevenue * 100) / 100,
      daily: dailyRevenue,
    },
    conversions: {
      startedToCompleted: Math.round(startedToCompleted * 10) / 10,
      completedToPaid: Math.round(completedToPaid * 10) / 10,
    },
    iqDistribution,
    categoryPerformance,
    recentPayments: (recentPaymentsResult.data || []).map((p) => ({
      id: p.id,
      session_id: p.session_id,
      customer_email: p.customer_email,
      amount: p.amount,
      currency: p.currency,
      paid_at: p.paid_at,
      created_at: p.created_at,
    })),
    recentSessions: (recentSessionsResult.data || []).map((s) => ({
      id: s.id,
      status: s.status,
      iq_score: s.iq_score,
      created_at: s.created_at,
      completed_at: s.completed_at,
    })),
  }
}
