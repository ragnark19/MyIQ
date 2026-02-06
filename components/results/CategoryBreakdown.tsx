'use client'

import { CategoryScore, QuestionCategory } from '@/types'

interface CategoryBreakdownProps {
  categoryScores: CategoryScore[]
}

const categoryInfo: Record<QuestionCategory, { name: string; icon: JSX.Element; color: string }> = {
  pattern: {
    name: 'Pattern Recognition',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    color: 'bg-blue-500'
  },
  numerical: {
    name: 'Numerical Reasoning',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: 'bg-green-500'
  },
  verbal: {
    name: 'Verbal Reasoning',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    color: 'bg-purple-500'
  },
  spatial: {
    name: 'Spatial Reasoning',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
    color: 'bg-orange-500'
  }
}

export default function CategoryBreakdown({ categoryScores }: CategoryBreakdownProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Performance by Category</h3>

      {categoryScores.map((score) => {
        const info = categoryInfo[score.category]
        return (
          <div key={score.category} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center text-white`}>
                {info.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{info.name}</span>
                  <span className="text-sm text-gray-600">
                    {score.correct}/{score.total} correct
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${info.color} transition-all duration-1000`}
                    style={{ width: `${score.percentage}%` }}
                  />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 w-16 text-right">
                {score.percentage}%
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
