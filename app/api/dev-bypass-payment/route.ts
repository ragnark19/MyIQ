import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  // Hard block in production — this route must never work in prod
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 })
  }

  try {
    const { sessionId, email } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    // Verify session exists and is completed
    const { data: session, error: sessionError } = await supabase
      .from('test_sessions')
      .select('id, status')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (session.status !== 'completed') {
      return NextResponse.json({ error: 'Session not in completed state' }, { status: 400 })
    }

    // Create dev payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        session_id: sessionId,
        paddle_transaction_id: `dev_${Date.now()}`,
        amount: 0,
        currency: 'USD',
        status: 'completed',
        customer_email: email || 'dev@localhost',
        paid_at: new Date().toISOString()
      })

    if (paymentError) {
      console.error('Dev bypass payment error:', paymentError)
    }

    // Update session to paid
    await supabase
      .from('test_sessions')
      .update({ status: 'paid', email: email || 'dev@localhost' })
      .eq('id', sessionId)

    // Create certificate
    const certificateNumber = `MIQ-${new Date().getFullYear()}-${sessionId.slice(0, 8).toUpperCase()}`
    await supabase
      .from('certificates')
      .insert({
        session_id: sessionId,
        certificate_number: certificateNumber,
        generated_at: new Date().toISOString()
      })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Dev bypass error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
