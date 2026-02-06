import { Question, TestResponse, QuestionCategory, CategoryScore, TestResult } from '@/types'

const CATEGORY_NAMES: Record<QuestionCategory, string> = {
  pattern: 'Pattern Recognition',
  numerical: 'Numerical Reasoning',
  verbal: 'Verbal Reasoning',
  spatial: 'Spatial Reasoning'
}

// Weights for each difficulty level
const DIFFICULTY_WEIGHTS: Record<number, number> = {
  1: 1.0,
  2: 1.25,
  3: 1.5,
  4: 1.75,
  5: 2.0
}

// Time bonus multipliers (if answered in less than expected time)
const TIME_BONUS_THRESHOLD = 30 // seconds
const TIME_BONUS_MULTIPLIER = 1.1

export function calculateRawScore(
  questions: Question[],
  responses: TestResponse[]
): number {
  let totalScore = 0
  const responseMap = new Map(responses.map(r => [r.question_id, r]))

  for (const question of questions) {
    const response = responseMap.get(question.id)
    if (response?.is_correct) {
      let points = question.points * (DIFFICULTY_WEIGHTS[question.difficulty] || 1)

      // Apply time bonus
      if (response.time_spent_seconds && response.time_spent_seconds < TIME_BONUS_THRESHOLD) {
        points *= TIME_BONUS_MULTIPLIER
      }

      totalScore += points
    }
  }

  return Math.round(totalScore)
}

export function calculateCategoryScores(
  questions: Question[],
  responses: TestResponse[]
): CategoryScore[] {
  const responseMap = new Map(responses.map(r => [r.question_id, r]))
  const categories: QuestionCategory[] = ['pattern', 'numerical', 'verbal', 'spatial']

  return categories.map(category => {
    const categoryQuestions = questions.filter(q => q.category === category)
    const correct = categoryQuestions.filter(q => responseMap.get(q.id)?.is_correct).length

    return {
      category,
      correct,
      total: categoryQuestions.length,
      percentage: categoryQuestions.length > 0
        ? Math.round((correct / categoryQuestions.length) * 100)
        : 0
    }
  })
}

export function calculateIQScore(rawScore: number, maxPossibleScore: number): number {
  // Convert raw score to a percentage
  const percentageScore = rawScore / maxPossibleScore

  // IQ is normally distributed with mean=100, SD=15
  // We use a simplified conversion based on performance percentile
  // Map 0% -> 55, 50% -> 100, 100% -> 145

  // Using a more realistic distribution curve
  // The relationship is non-linear to reflect the normal distribution

  if (percentageScore <= 0) return 55
  if (percentageScore >= 1) return 145

  // Convert to z-score (approximately)
  // This uses an inverse normal approximation
  const zScore = (percentageScore - 0.5) * 4 // Maps 0-1 to approximately -2 to +2

  // Convert z-score to IQ (mean=100, SD=15)
  const iq = Math.round(100 + (zScore * 15))

  // Clamp to reasonable range
  return Math.max(55, Math.min(145, iq))
}

export function calculatePercentile(iqScore: number): number {
  // Convert IQ to percentile using the normal distribution
  // IQ has mean=100 and SD=15

  const zScore = (iqScore - 100) / 15

  // Approximate cumulative distribution function for normal distribution
  // Using an approximation formula
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore))
  const d = 0.3989423 * Math.exp(-zScore * zScore / 2)
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))

  const percentile = zScore > 0 ? (1 - p) * 100 : p * 100

  return Math.round(Math.max(1, Math.min(99, percentile)))
}

export function calculateMaxPossibleScore(questions: Question[]): number {
  return questions.reduce((total, q) => {
    return total + q.points * (DIFFICULTY_WEIGHTS[q.difficulty] || 1)
  }, 0)
}

export function analyzeStrengthsWeaknesses(categoryScores: CategoryScore[]): {
  strengths: string[]
  weaknesses: string[]
} {
  const strengths: string[] = []
  const weaknesses: string[] = []

  // Sort by percentage
  const sorted = [...categoryScores].sort((a, b) => b.percentage - a.percentage)

  // Top performers (>= 70%) are strengths
  for (const score of sorted) {
    if (score.percentage >= 70) {
      strengths.push(CATEGORY_NAMES[score.category])
    } else if (score.percentage < 50) {
      weaknesses.push(CATEGORY_NAMES[score.category])
    }
  }

  // If no clear strengths/weaknesses, use relative performance
  if (strengths.length === 0 && sorted.length > 0) {
    strengths.push(CATEGORY_NAMES[sorted[0].category])
  }

  if (weaknesses.length === 0 && sorted.length > 1) {
    weaknesses.push(CATEGORY_NAMES[sorted[sorted.length - 1].category])
  }

  return { strengths, weaknesses }
}

export function calculateFullResult(
  questions: Question[],
  responses: TestResponse[]
): TestResult {
  const rawScore = calculateRawScore(questions, responses)
  const maxScore = calculateMaxPossibleScore(questions)
  const iqScore = calculateIQScore(rawScore, maxScore)
  const percentile = calculatePercentile(iqScore)
  const categoryScores = calculateCategoryScores(questions, responses)
  const { strengths, weaknesses } = analyzeStrengthsWeaknesses(categoryScores)

  const totalTime = responses.reduce((sum, r) => sum + (r.time_spent_seconds || 0), 0)

  return {
    iqScore,
    percentile,
    rawScore,
    totalQuestions: questions.length,
    categoryScores,
    strengths,
    weaknesses,
    timeSpent: totalTime
  }
}
