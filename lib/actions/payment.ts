'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { devBypassSchema } from '@/lib/validations'

export async function devBypassPayment(input: unknown) {
  // Hard block in production
  if (process.env.NODE_ENV === 'production') {
    return { error: 'Not available' }
  }

  const parsed = devBypassSchema.safeParse(input)
  if (!parsed.success) {
    return { error: 'Invalid input' }
  }

  const { sessionId, email } = parsed.data

  try {
    const supabase = await createServiceClient()

    // Verify session exists and is completed
    const { data: session, error: sessionError } = await supabase
      .from('test_sessions')
      .select('id, status')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return { error: 'Session not found' }
    }

    if (session.status !== 'completed') {
      return { error: 'Session not in completed state' }
    }

    const customerEmail = email || 'dev@localhost'

    // Create dev payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        session_id: sessionId,
        paddle_transaction_id: `dev_${Date.now()}`,
        amount: 0,
        currency: 'USD',
        status: 'completed',
        customer_email: customerEmail,
        paid_at: new Date().toISOString(),
      })

    if (paymentError) {
      console.error('Dev bypass payment error:', paymentError)
    }

    // Update session to paid
    await supabase
      .from('test_sessions')
      .update({ status: 'paid', email: customerEmail })
      .eq('id', sessionId)

    // Create certificate
    const certificateNumber = `MIQ-${new Date().getFullYear()}-${sessionId.slice(0, 8).toUpperCase()}`
    await supabase
      .from('certificates')
      .insert({
        session_id: sessionId,
        certificate_number: certificateNumber,
        generated_at: new Date().toISOString(),
      })

    return { success: true }
  } catch (error) {
    console.error('Dev bypass error:', error)
    return { error: 'Internal server error' }
  }
}
