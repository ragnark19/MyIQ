'use client'

import { Question, QuestionOption } from '@/types'

interface PatternQuestionProps {
  question: Question
  selectedAnswer: string | null
  onSelectAnswer: (answer: string) => void
}

export default function PatternQuestion({ question, selectedAnswer, onSelectAnswer }: PatternQuestionProps) {
  const { question_data } = question
  const matrix = question_data.matrix || []
  const options = question_data.options || []

  return (
    <div className="space-y-3 md:space-y-8">
      {/* Question prompt */}
      <div className="text-center">
        <p className="text-lg text-gray-700">{question_data.prompt}</p>
      </div>

      {/* Pattern matrix */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-1.5 p-2 md:gap-2 md:p-4 bg-gray-100 rounded-xl">
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-lg flex items-center justify-center text-2xl md:text-4xl border-2 ${
                  cell === '?' ? 'border-primary-500 border-dashed bg-primary-50' : 'border-gray-200'
                }`}
              >
                {cell === '?' ? (
                  <span className="text-primary-500 font-bold">?</span>
                ) : (
                  <span className="text-gray-900" dangerouslySetInnerHTML={{ __html: cell }} />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Answer options */}
      <div>
        <p className="text-sm text-gray-500 mb-2 md:mb-4 text-center">Select the pattern that completes the sequence:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectAnswer(option.id)}
              className={`p-2 md:p-4 rounded-xl border-2 transition-all ${
                selectedAnswer === option.id
                  ? 'border-primary-500 bg-primary-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow'
              }`}
            >
              <div className="w-10 h-10 md:w-16 md:h-16 mx-auto flex items-center justify-center text-xl md:text-3xl text-gray-900">
                <span dangerouslySetInnerHTML={{ __html: option.value }} />
              </div>
              <div className="mt-1 md:mt-2 text-xs md:text-sm font-medium text-gray-600">
                {option.id.toUpperCase()}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
