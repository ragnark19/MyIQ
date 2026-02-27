import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import crypto from 'crypto'

const MAX_SIGNATURE_AGE_SECONDS = 30

// Verify Paddle v2 webhook signature
// Header format: ts=TIMESTAMP;h1=HASH
// Signed payload: TIMESTAMP:RAW_BODY
function verifyPaddleSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string
): boolean {
  if (!secret || !signatureHeader) return false

  // Parse ts= and h1= from the header
  const parts: Record<string, string> = {}
  for (const part of signatureHeader.split(';')) {
    const [key, ...valueParts] = part.split('=')
    if (key && valueParts.length > 0) {
      parts[key] = valueParts.join('=')
    }
  }

  const ts = parts['ts']
  const h1 = parts['h1']
  if (!ts || !h1) return false

  // Reject if timestamp is too old (prevent replay attacks)
  const timestampSeconds = parseInt(ts, 10)
  if (isNaN(timestampSeconds)) return false
  const now = Math.floor(Date.now() / 1000)
  if (Math.abs(now - timestampSeconds) > MAX_SIGNATURE_AGE_SECONDS) return false

  // Build signed payload: ts:rawBody
  const signedPayload = `${ts}:${rawBody}`
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex')

  // Timing-safe comparison
  if (expectedSignature.length !== h1.length) return false
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(h1)
  )
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signatureHeader = request.headers.get('paddle-signature') || ''
    const secret = process.env.PADDLE_WEBHOOK_SECRET || ''

    // Always verify signature — no exceptions
    if (!verifyPaddleSignature(rawBody, signatureHeader, secret)) {
      console.error('Webhook signature verification failed')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(rawBody)
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

      // Idempotency: check if this transaction was already processed
      const { data: existingPayment } = await supabase
        .from('payments')
        .select('id')
        .eq('paddle_transaction_id', transactionId)
        .maybeSingle()

      if (existingPayment) {
        return NextResponse.json({ success: true, message: 'Already processed' })
      }

      // Verify session exists and is in 'completed' state (test finished, awaiting payment)
      const { data: session, error: sessionFetchError } = await supabase
        .from('test_sessions')
        .select('id, status')
        .eq('id', sessionId)
        .single()

      if (sessionFetchError || !session) {
        console.error('Session not found for webhook:', sessionId)
        return NextResponse.json({ error: 'Session not found' }, { status: 400 })
      }

      if (session.status === 'paid') {
        return NextResponse.json({ success: true, message: 'Already paid' })
      }

      if (session.status !== 'completed') {
        console.error('Session not in completed state:', sessionId, session.status)
        return NextResponse.json({ error: 'Session not ready for payment' }, { status: 400 })
      }

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
        return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 })
      }

      // Update session status to paid
      const { error: sessionError } = await supabase
        .from('test_sessions')
        .update({
          status: 'paid',
          email: customerEmail
        })
        .eq('id', sessionId)
        .eq('status', 'completed')

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
