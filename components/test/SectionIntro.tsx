'use client'

import Button from '@/components/ui/Button'
import { TestSection } from '@/types'

interface SectionIntroProps {
  section: TestSection
  onStart: () => void
}

const sectionIcons: Record<string, JSX.Element> = {
  pattern: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  numerical: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  verbal: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  ),
  spatial: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
    </svg>
  )
}

export default function SectionIntro({ section, onStart }: SectionIntroProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    return `${mins} minute${mins !== 1 ? 's' : ''}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        {/* Section icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
          {sectionIcons[section.category]}
        </div>

        {/* Section number */}
        <div className="text-sm font-semibold text-primary-600 mb-2">
          Section {section.id} of 4
        </div>

        {/* Section name */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {section.name}
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          {section.description}
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-gray-900">{section.questionCount}</div>
            <div className="text-sm text-gray-500">Questions</div>
          </div>
          <div className="w-px bg-gray-200" />
          <div>
            <div className="text-2xl font-bold text-gray-900">{formatTime(section.timeLimit)}</div>
            <div className="text-sm text-gray-500">Time Limit</div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 text-left">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-yellow-800">
              <strong>Tip:</strong> Work quickly but carefully. Unanswered questions when time expires will be marked as incorrect.
            </div>
          </div>
        </div>

        {/* Start button */}
        <Button size="lg" onClick={onStart} className="w-full">
          Begin Section
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
