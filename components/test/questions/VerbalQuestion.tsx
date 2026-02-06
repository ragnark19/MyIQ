'use client'

import { Question } from '@/types'

interface VerbalQuestionProps {
  question: Question
  selectedAnswer: string | null
  onSelectAnswer: (answer: string) => void
}

export default function VerbalQuestion({ question, selectedAnswer, onSelectAnswer }: VerbalQuestionProps) {
  const { question_data } = question
  const options = question_data.options || []

  return (
    <div className="space-y-8">
      {/* Question prompt */}
      <div className="text-center">
        <p className="text-lg text-gray-700 mb-4">{question_data.prompt}</p>

        {/* Analogy display */}
        {question_data.type === 'analogy' && question_data.sequence && (
          <div className="inline-flex items-center gap-3 p-6 bg-gray-100 rounded-xl text-xl">
            <span className="font-semibold text-gray-900">{question_data.sequence[0]}</span>
            <span className="text-gray-400">:</span>
            <span className="font-semibold text-gray-900">{question_data.sequence[1]}</span>
            <span className="text-gray-400">::</span>
            <span className="font-semibold text-gray-900">{question_data.sequence[2]}</span>
            <span className="text-gray-400">:</span>
            <span className="font-semibold text-primary-600 bg-primary-100 px-3 py-1 rounded-lg border-2 border-primary-500 border-dashed">?</span>
          </div>
        )}
      </div>

      {/* Answer options */}
      <div>
        <p className="text-sm text-gray-500 mb-4 text-center">Select the best answer:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectAnswer(option.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedAnswer === option.id
                  ? 'border-primary-500 bg-primary-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  selectedAnswer === option.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.id.toUpperCase()}
                </span>
                <span className="text-lg text-gray-900 font-medium">{option.value}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
