'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Pricing() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section header */}
        <h2 className="text-4xl font-bold text-white mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-white/70 mb-12">
          Take the test for free. Only pay when you want to see your results.
        </p>

        {/* Pricing card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg mx-auto">
          {/* Free test */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="text-gray-500 uppercase tracking-wide text-sm font-semibold mb-2">
              Step 1
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-gray-900">Free</span>
            </div>
            <p className="text-gray-600 mt-2">Take the complete IQ test</p>
            <ul className="mt-6 space-y-3 text-left">
              {[
                '40 questions across 4 categories',
                'Timed sections for accuracy',
                'Progress saved automatically',
                'No account required'
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Paid results */}
          <div>
            <div className="text-gray-500 uppercase tracking-wide text-sm font-semibold mb-2">
              Step 2
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-primary-600">$2.99</span>
              <span className="text-gray-500">one-time</span>
            </div>
            <p className="text-gray-600 mt-2">Unlock your detailed results</p>
            <ul className="mt-6 space-y-3 text-left">
              {[
                'Your calculated IQ score',
                'Percentile ranking',
                'Category-by-category breakdown',
                'Strengths & areas for growth',
                'Downloadable PDF certificate'
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link href="/test">
              <Button size="lg" className="w-full">
                Start Your Free Test
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required to start
            </p>
          </div>
        </div>

        {/* Money-back guarantee */}
        <div className="mt-12 flex items-center justify-center gap-3 text-white/70">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>30-day money-back guarantee. Secure payment via Paddle.</span>
        </div>
      </div>
    </section>
  )
}
