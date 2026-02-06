'use client'

import { useEffect, useState } from 'react'

interface ScoreDisplayProps {
  iqScore: number
  percentile: number
}

export default function ScoreDisplay({ iqScore, percentile }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = iqScore / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= iqScore) {
        setDisplayScore(iqScore)
        setIsAnimating(false)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [iqScore])

  const getScoreCategory = (score: number) => {
    if (score >= 130) return { label: 'Very Superior', color: 'text-purple-600' }
    if (score >= 120) return { label: 'Superior', color: 'text-blue-600' }
    if (score >= 110) return { label: 'High Average', color: 'text-green-600' }
    if (score >= 90) return { label: 'Average', color: 'text-gray-600' }
    if (score >= 80) return { label: 'Low Average', color: 'text-yellow-600' }
    if (score >= 70) return { label: 'Borderline', color: 'text-orange-600' }
    return { label: 'Below Average', color: 'text-red-600' }
  }

  const category = getScoreCategory(iqScore)

  return (
    <div className="text-center">
      {/* Main score */}
      <div className="relative inline-block">
        <div className={`text-8xl sm:text-9xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent ${isAnimating ? 'animate-pulse' : ''}`}>
          {displayScore}
        </div>
        <div className="text-xl text-gray-500 mt-2">IQ Score</div>
      </div>

      {/* Category badge */}
      <div className={`inline-block mt-6 px-6 py-2 rounded-full bg-gray-100 ${category.color} font-semibold text-lg`}>
        {category.label}
      </div>

      {/* Percentile */}
      <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
        <div className="text-4xl font-bold text-gray-900">{percentile}th</div>
        <div className="text-gray-600 mt-1">Percentile</div>
        <p className="text-sm text-gray-500 mt-2">
          You scored higher than {percentile}% of the population
        </p>
      </div>

      {/* Visual scale */}
      <div className="mt-8">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>70</span>
          <span>85</span>
          <span>100</span>
          <span>115</span>
          <span>130</span>
          <span>145</span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-500 rounded-full"
            style={{ width: '100%' }}
          />
          <div
            className="absolute top-0 h-full w-1 bg-gray-900"
            style={{ left: `${Math.min(100, Math.max(0, ((iqScore - 70) / 75) * 100))}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Lower</span>
          <span>Average</span>
          <span>Higher</span>
        </div>
      </div>
    </div>
  )
}
