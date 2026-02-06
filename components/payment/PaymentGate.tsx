'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import Button from '@/components/ui/Button'

interface PaymentGateProps {
  sessionId: string
  onPaymentSuccess?: () => void
}

export default function PaymentGate({ sessionId, onPaymentSuccess }: PaymentGateProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paddleLoaded, setPaddleLoaded] = useState(false)

  const handlePaddleLoad = () => {
    if (typeof window !== 'undefined' && window.Paddle) {
      window.Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'test_token',
        environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
      })
      setPaddleLoaded(true)
    }
  }

  const handlePayment = async () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setError(null)

    // Update session with email
    await fetch('/api/sessions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, email })
    })

    // If Paddle is not configured, simulate payment for development
    if (!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || !paddleLoaded) {
      // Development mode: simulate successful payment
      try {
        const response = await fetch('/api/paddle-webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_type: 'transaction.completed',
            data: {
              id: 'dev_' + Date.now(),
              custom_data: { sessionId },
              customer: { email },
              details: {
                totals: { total: '2.99', currency_code: 'USD' }
              }
            }
          })
        })

        if (response.ok) {
          onPaymentSuccess?.()
          router.push(`/results/${sessionId}`)
        } else {
          setError('Payment processing failed. Please try again.')
        }
      } catch (err) {
        setError('An error occurred. Please try again.')
      } finally {
        setIsLoading(false)
      }
      return
    }

    // Production: Use Paddle checkout
    if (window.Paddle) {
      window.Paddle.Checkout.open({
        items: [
          {
            priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!,
            quantity: 1
          }
        ],
        customData: { sessionId },
        customer: { email },
        successCallback: (data) => {
          onPaymentSuccess?.()
          router.push(`/results/${sessionId}`)
        },
        closeCallback: () => {
          setIsLoading(false)
        }
      })
    }
  }

  return (
    <>
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        onLoad={handlePaddleLoad}
      />

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Test Complete!
          </h1>
          <p className="text-gray-600">
            You've answered all questions. Unlock your results to see your IQ score.
          </p>
        </div>

        {/* What you get */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your results include:</h3>
          <ul className="space-y-3">
            {[
              'Your calculated IQ score',
              'Percentile ranking',
              'Category breakdown',
              'Strengths & weaknesses',
              'Downloadable PDF certificate'
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-bold text-gray-900">$2.99</span>
            <span className="text-gray-500">one-time</span>
          </div>
        </div>

        {/* Email input */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
          />
          <p className="text-xs text-gray-500 mt-2">
            We'll send your receipt and certificate to this email
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Pay button */}
        <Button
          size="lg"
          onClick={handlePayment}
          isLoading={isLoading}
          className="w-full"
        >
          {isLoading ? 'Processing...' : 'Unlock My Results'}
        </Button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure payment</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>30-day guarantee</span>
          </div>
        </div>

        {/* Skip payment for testing */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
            <p className="text-xs text-gray-400 text-center mb-3">Development Mode</p>
            <button
              onClick={async () => {
                setIsLoading(true)
                try {
                  const response = await fetch('/api/paddle-webhook', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      event_type: 'transaction.completed',
                      data: {
                        id: 'test_' + Date.now(),
                        custom_data: { sessionId },
                        customer: { email: 'test@example.com' },
                        details: {
                          totals: { total: '0.00', currency_code: 'USD' }
                        }
                      }
                    })
                  })
                  if (response.ok) {
                    router.push(`/results/${sessionId}`)
                  }
                } catch (err) {
                  console.error(err)
                } finally {
                  setIsLoading(false)
                }
              }}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm transition-colors"
            >
              Skip Payment (Testing Only)
            </button>
          </div>
        )}
      </div>
    </>
  )
}
