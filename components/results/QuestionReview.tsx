'use client'

import { useState } from 'react'
import { Question, TestResponse, QuestionCategory } from '@/types'

interface QuestionReviewProps {
  questions: Question[]
  responses: TestResponse[]
}

const categoryNames: Record<QuestionCategory, string> = {
  pattern: 'Pattern Recognition',
  numerical: 'Numerical Reasoning',
  verbal: 'Verbal Reasoning',
  spatial: 'Spatial Reasoning'
}

const categoryColors: Record<QuestionCategory, string> = {
  pattern: 'bg-blue-500',
  numerical: 'bg-green-500',
  verbal: 'bg-purple-500',
  spatial: 'bg-orange-500'
}

export default function QuestionReview({ questions, responses }: QuestionReviewProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<QuestionCategory | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'correct' | 'incorrect'>('all')

  const responseMap = new Map(responses.map(r => [r.question_id, r]))

  const filteredQuestions = questions.filter(q => {
    if (filterCategory !== 'all' && q.category !== filterCategory) return false
    if (filterStatus !== 'all') {
      const response = responseMap.get(q.id)
      if (filterStatus === 'correct' && !response?.is_correct) return false
      if (filterStatus === 'incorrect' && response?.is_correct) return false
    }
    return true
  })

  const getOptionLabel = (optionId: string, options: any[]) => {
    const option = options.find(o => o.id === optionId)
    return option?.value || optionId
  }

  const renderQuestionContent = (question: Question) => {
    const { question_data } = question

    if (question_data.matrix) {
      return (
        <div className="grid grid-cols-3 gap-1 w-fit">
          {question_data.matrix.map((row: string[], rowIndex: number) =>
            row.map((cell: string, colIndex: number) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-lg text-gray-900"
              >
                {cell}
              </div>
            ))
          )}
        </div>
      )
    }

    if (question_data.sequence) {
      return (
        <div className="flex items-center gap-2 flex-wrap">
          {question_data.sequence.map((item: string | number, index: number) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-lg font-medium ${
                item === '?' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-900'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      )
    }

    if (question_data.images) {
      return (
        <div className="text-4xl text-gray-900">
          {question_data.images[0]}
        </div>
      )
    }

    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Question Review</h3>
        <div className="text-sm text-gray-500">
          {filteredQuestions.filter(q => responseMap.get(q.id)?.is_correct).length} / {filteredQuestions.length} correct
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Category</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as QuestionCategory | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Categories</option>
            <option value="pattern">Pattern Recognition</option>
            <option value="numerical">Numerical Reasoning</option>
            <option value="verbal">Verbal Reasoning</option>
            <option value="spatial">Spatial Reasoning</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'correct' | 'incorrect')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Questions</option>
            <option value="correct">Correct Only</option>
            <option value="incorrect">Incorrect Only</option>
          </select>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-3">
        {filteredQuestions.map((question, index) => {
          const response = responseMap.get(question.id)
          const isCorrect = response?.is_correct
          const isExpanded = expandedQuestion === question.id
          const userAnswer = response?.user_answer
          const options = question.question_data.options || []

          return (
            <div
              key={question.id}
              className={`border rounded-xl overflow-hidden transition-all ${
                isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'
              }`}
            >
              {/* Question header */}
              <button
                onClick={() => setExpandedQuestion(isExpanded ? null : question.id)}
                className="w-full px-4 py-3 flex items-center gap-4 text-left hover:bg-white/50 transition-colors"
              >
                {/* Status icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {isCorrect ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>

                {/* Question info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs font-medium text-white rounded ${categoryColors[question.category]}`}>
                      {categoryNames[question.category]}
                    </span>
                    <span className="text-xs text-gray-500">
                      Difficulty: {question.difficulty}/5
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 truncate">
                    {question.question_data.prompt}
                  </p>
                </div>

                {/* Expand icon */}
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200 bg-white">
                  <div className="pt-4 space-y-4">
                    {/* Question content */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {question.question_data.prompt}
                      </p>
                      {renderQuestionContent(question)}
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-2 gap-2">
                      {options.map((option: any) => {
                        const isUserAnswer = userAnswer === option.id
                        const isCorrectAnswer = question.correct_answer === option.id

                        return (
                          <div
                            key={option.id}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrectAnswer
                                ? 'border-green-500 bg-green-50'
                                : isUserAnswer
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                isCorrectAnswer
                                  ? 'bg-green-500 text-white'
                                  : isUserAnswer
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-300 text-gray-600'
                              }`}>
                                {option.id.toUpperCase()}
                              </span>
                              <span className="text-gray-900 font-medium">{option.value}</span>
                              {isCorrectAnswer && (
                                <svg className="w-4 h-4 text-green-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <span className="text-xs text-red-600 ml-auto">Your answer</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-blue-900">Explanation</p>
                            <p className="text-sm text-blue-800 mt-1">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Time spent */}
                    {response?.time_spent_seconds && (
                      <p className="text-xs text-gray-500">
                        Time spent: {response.time_spent_seconds} seconds
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No questions match the selected filters.
        </div>
      )}
    </div>
  )
}
