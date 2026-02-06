'use client'

import { Question } from '@/types'

interface SpatialQuestionProps {
  question: Question
  selectedAnswer: string | null
  onSelectAnswer: (answer: string) => void
}

// SVG shapes for spatial reasoning
const shapes: Record<string, JSX.Element> = {
  cube: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <polygon points="30,20 70,20 85,40 85,80 45,80 30,60" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="30" y1="20" x2="30" y2="60" stroke="currentColor" strokeWidth="2" />
      <line x1="30" y1="60" x2="45" y2="80" stroke="currentColor" strokeWidth="2" />
      <line x1="70" y1="20" x2="85" y2="40" stroke="currentColor" strokeWidth="2" />
      <line x1="30" y1="20" x2="45" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
      <line x1="45" y1="40" x2="85" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
      <line x1="45" y1="40" x2="45" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
    </svg>
  ),
  pyramid: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <polygon points="50,15 20,80 80,80" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="15" x2="50" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
    </svg>
  ),
  lshape: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <polygon points="20,20 60,20 60,50 40,50 40,80 20,80" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  tshape: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <polygon points="20,20 80,20 80,40 55,40 55,80 45,80 45,40 20,40" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export default function SpatialQuestion({ question, selectedAnswer, onSelectAnswer }: SpatialQuestionProps) {
  const { question_data } = question
  const options = question_data.options || []

  return (
    <div className="space-y-8">
      {/* Question prompt */}
      <div className="text-center">
        <p className="text-lg text-gray-700">{question_data.prompt}</p>
      </div>

      {/* Source shape */}
      {question_data.images && question_data.images[0] && (
        <div className="flex justify-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 p-4 bg-gray-100 rounded-xl text-gray-700">
            {shapes[question_data.images[0]] || (
              <div className="w-full h-full flex items-center justify-center text-6xl text-gray-900">
                <span dangerouslySetInnerHTML={{ __html: question_data.images[0] }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rotation indicator */}
      {question_data.type === 'rotation' && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>How does this shape look when rotated?</span>
          </div>
        </div>
      )}

      {/* Answer options */}
      <div>
        <p className="text-sm text-gray-500 mb-4 text-center">Select the correct answer:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectAnswer(option.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedAnswer === option.id
                  ? 'border-primary-500 bg-primary-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow'
              }`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-700">
                {shapes[option.value] || (
                  <div className="w-full h-full flex items-center justify-center text-3xl text-gray-900">
                    <span dangerouslySetInnerHTML={{ __html: option.value }} />
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm font-medium text-gray-600">
                {option.id.toUpperCase()}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
