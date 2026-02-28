'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AdminStats } from '@/types/admin'
import { refreshAdminStats, adminLogout } from '@/lib/actions/admin'
import StatCard from './StatCard'
import ConversionFunnel from './ConversionFunnel'
import RevenueChart from './RevenueChart'
import IQDistributionChart from './IQDistributionChart'
import CategoryPerformanceChart from './CategoryPerformanceChart'
import RecentPaymentsTable from './RecentPaymentsTable'
import RecentSessionsTable from './RecentSessionsTable'

interface DashboardShellProps {
  initialStats: AdminStats
}

export default function DashboardShell({ initialStats }: DashboardShellProps) {
  const [stats, setStats] = useState<AdminStats>(initialStats)
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      const result = await refreshAdminStats()
      if (result.stats) {
        setStats(result.stats)
      }
    } finally {
      setRefreshing(false)
    }
  }, [])

  const handleLogout = useCallback(async () => {
    await adminLogout()
    router.push('/admin/login')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Session Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Tests Started" value={stats.sessions.total} />
          <StatCard label="Completed" value={stats.sessions.completed + stats.sessions.paid} />
          <StatCard label="Paid" value={stats.sessions.paid} />
          <StatCard label="Total Revenue" value={`$${stats.revenue.total.toFixed(2)}`} />
        </div>

        {/* Conversion Funnel */}
        <ConversionFunnel
          startedToCompleted={stats.conversions.startedToCompleted}
          completedToPaid={stats.conversions.completedToPaid}
        />

        {/* Revenue Period Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Today" value={`$${stats.revenue.today.toFixed(2)}`} />
          <StatCard label="This Week" value={`$${stats.revenue.thisWeek.toFixed(2)}`} />
          <StatCard label="This Month" value={`$${stats.revenue.thisMonth.toFixed(2)}`} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={stats.revenue.daily} />
          <IQDistributionChart data={stats.iqDistribution} />
        </div>

        {/* Category Performance */}
        <CategoryPerformanceChart data={stats.categoryPerformance} />

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentPaymentsTable payments={stats.recentPayments} />
          <RecentSessionsTable sessions={stats.recentSessions} />
        </div>
      </main>
    </div>
  )
}
