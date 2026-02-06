import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PaymentGate from '@/components/payment/PaymentGate'

interface CompletePageProps {
  params: Promise<{ sessionId: string }>
}

export default async function CompletePage({ params }: CompletePageProps) {
  const { sessionId } = await params
  const supabase = await createClient()

  // Fetch session
  const { data: session, error } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (error || !session) {
    redirect('/test')
  }

  // If already paid, redirect to results
  if (session.status === 'paid') {
    redirect(`/results/${sessionId}`)
  }

  // If test not completed, redirect back to test
  if (session.status === 'in_progress') {
    redirect(`/test/${sessionId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 flex items-center justify-center p-4">
      <PaymentGate sessionId={sessionId} />
    </div>
  )
}
