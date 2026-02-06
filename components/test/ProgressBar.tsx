'use client'

import { TEST_SECTIONS } from '@/types'

interface ProgressBarProps {
  currentSection: number
  currentQuestion: number
  totalQuestions: number
  answeredCount: number
}

export default function ProgressBar({
  currentSection,
  currentQuestion,
  totalQuestions,
  answeredCount
}: ProgressBarProps) {
  const section = TEST_SECTIONS[currentSection - 1]

  return (
    <div className="w-full">
      {/* Section tabs */}
      <div className="flex mb-4">
        {TEST_SECTIONS.map((s, index) => (
          <div
            key={s.id}
            className={`flex-1 text-center py-2 text-sm font-medium transition-colors ${
              index + 1 === currentSection
                ? 'text-primary-600 border-b-2 border-primary-600'
                : index + 1 < currentSection
                ? 'text-green-600 border-b-2 border-green-500'
                : 'text-gray-400 border-b-2 border-gray-200'
            }`}
          >
            <span className="hidden sm:inline">{s.name}</span>
            <span className="sm:hidden">{s.id}</span>
            {index + 1 < currentSection && (
              <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Current section info */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm text-gray-600">
          {answeredCount} answered
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 transition-all duration-300"
          style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
        />
      </div>
    </div>
  )
}
