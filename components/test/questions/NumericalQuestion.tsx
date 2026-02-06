'use client'

import { Question } from '@/types'

interface NumericalQuestionProps {
  question: Question
  selectedAnswer: string | null
  onSelectAnswer: (answer: string) => void
}

export default function NumericalQuestion({ question, selectedAnswer, onSelectAnswer }: NumericalQuestionProps) {
  const { question_data } = question
  const sequence = question_data.sequence || []
  const options = question_data.options || []

  return (
    <div className="space-y-8">
      {/* Question prompt */}
      <div className="text-center">
        <p className="text-lg text-gray-700">{question_data.prompt}</p>
      </div>

      {/* Number sequence */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 sm:gap-4 p-4 bg-gray-100 rounded-xl overflow-x-auto">
          {sequence.map((num, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-4">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold ${
                  num === '?'
                    ? 'bg-primary-100 text-primary-600 border-2 border-primary-500 border-dashed'
                    : 'bg-white text-gray-900 border-2 border-gray-200'
                }`}
              >
                {num}
              </div>
              {index < sequence.length - 1 && (
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Answer options */}
      <div>
        <p className="text-sm text-gray-500 mb-4 text-center">What number comes next?</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
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
              <div className="text-2xl font-bold text-gray-900">
                {option.value}
              </div>
              <div className="mt-1 text-sm font-medium text-gray-500">
                {option.id.toUpperCase()}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
