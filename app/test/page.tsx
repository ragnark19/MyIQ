'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function TestStartPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStartTest = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) throw new Error('Failed to create session')

      const data = await response.json()
      router.push(`/test/${data.session.id}`)
    } catch (err) {
      setError('Failed to start test. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">IQ</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Ready to Discover Your IQ?
          </h1>
          <p className="text-gray-600">
            Complete our comprehensive cognitive assessment to measure your intelligence
            across four key dimensions.
          </p>
        </div>

        {/* Test overview */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">What to Expect:</h2>
          <div className="space-y-4">
            {[
              { section: 'Pattern Recognition', questions: 12, time: '8 min' },
              { section: 'Numerical Reasoning', questions: 10, time: '6 min' },
              { section: 'Verbal Reasoning', questions: 10, time: '6 min' },
              { section: 'Spatial Reasoning', questions: 8, time: '5 min' }
            ].map((item, index) => (
              <div key={item.section} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.section}</div>
                  <div className="text-sm text-gray-500">
                    {item.questions} questions • {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h2 className="font-semibold text-gray-900 mb-3">Before You Begin:</h2>
          <ul className="space-y-2">
            {[
              'Find a quiet place where you won\'t be disturbed',
              'Ensure you have ~25 minutes of uninterrupted time',
              'Have a pen and paper ready for calculations',
              'Each section is timed - manage your time wisely'
            ].map((instruction) => (
              <li key={instruction} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* CTA */}
        <Button
          size="lg"
          onClick={handleStartTest}
          isLoading={isLoading}
          className="w-full"
        >
          {isLoading ? 'Starting Test...' : 'Begin Test'}
          {!isLoading && (
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          The test is free. You'll only pay $2.99 to see your results.
        </p>
      </div>
    </div>
  )
}
