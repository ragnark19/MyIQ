import { getAdminStats } from '@/lib/admin/queries'
import DashboardShell from '@/components/admin/DashboardShell'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const stats = await getAdminStats()
  return <DashboardShell initialStats={stats} />
}
