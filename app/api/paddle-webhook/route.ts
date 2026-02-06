import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import crypto from 'crypto'

// Verify Paddle webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!secret) return true // Skip verification in development

  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  const expectedSignature = hmac.digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get('paddle-signature') || ''
    const secret = process.env.PADDLE_WEBHOOK_SECRET || ''

    // Verify signature in production
    if (process.env.NODE_ENV === 'production' && secret) {
      if (!verifyWebhookSignature(payload, signature, secret)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const event = JSON.parse(payload)
    const eventType = event.event_type

    // Handle transaction completed event
    if (eventType === 'transaction.completed') {
      const transactionId = event.data.id
      const customData = event.data.custom_data || {}
      const sessionId = customData.sessionId
      const customerEmail = event.data.customer?.email
      const amount = event.data.details?.totals?.total
      const currency = event.data.details?.totals?.currency_code || 'USD'

      if (!sessionId) {
        console.error('No sessionId in webhook data')
        return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
      }

      const supabase = await createServiceClient()

      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          session_id: sessionId,
          paddle_transaction_id: transactionId,
          amount: parseFloat(amount) || 2.99,
          currency,
          status: 'completed',
          customer_email: customerEmail,
          paid_at: new Date().toISOString()
        })

      if (paymentError) {
        console.error('Payment insert error:', paymentError)
      }

      // Update session status to paid
      const { error: sessionError } = await supabase
        .from('test_sessions')
        .update({
          status: 'paid',
          email: customerEmail
        })
        .eq('id', sessionId)

      if (sessionError) {
        console.error('Session update error:', sessionError)
        return NextResponse.json({ error: 'Failed to update session' }, { status: 500 })
      }

      // Generate certificate number
      const certificateNumber = `MIQ-${new Date().getFullYear()}-${sessionId.slice(0, 8).toUpperCase()}`

      const { error: certError } = await supabase
        .from('certificates')
        .insert({
          session_id: sessionId,
          certificate_number: certificateNumber,
          generated_at: new Date().toISOString()
        })

      if (certError) {
        console.error('Certificate insert error:', certError)
      }

      return NextResponse.json({ success: true })
    }

    // Handle payment failed
    if (eventType === 'transaction.payment_failed') {
      const customData = event.data.custom_data || {}
      const sessionId = customData.sessionId

      if (sessionId) {
        const supabase = await createServiceClient()

        await supabase
          .from('payments')
          .insert({
            session_id: sessionId,
            paddle_transaction_id: event.data.id,
            status: 'failed',
            customer_email: event.data.customer?.email
          })
      }

      return NextResponse.json({ success: true })
    }

    // Return success for unhandled events
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
