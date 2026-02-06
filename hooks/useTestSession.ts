'use client'

import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TestSession, Question, TestResponse, TEST_SECTIONS, QuestionCategory } from '@/types'

interface UseTestSessionReturn {
  session: TestSession | null
  questions: Question[]
  responses: Map<string, TestResponse>
  currentSection: number
  currentQuestionIndex: number
  isLoading: boolean
  error: string | null
  createSession: () => Promise<string>
  loadSession: (sessionId: string) => Promise<void>
  submitAnswer: (questionId: string, answer: string, timeSpent: number) => Promise<void>
  nextQuestion: () => void
  previousQuestion: () => void
  nextSection: () => void
  completeTest: () => Promise<void>
  getCurrentQuestion: () => Question | null
  getSectionQuestions: () => Question[]
  getSectionProgress: () => { current: number; total: number }
}

export function useTestSession(): UseTestSessionReturn {
  const [session, setSession] = useState<TestSession | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [responses, setResponses] = useState<Map<string, TestResponse>>(new Map())
  const [currentSection, setCurrentSection] = useState(1)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createSession = useCallback(async (): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) throw new Error('Failed to create session')

      const data = await response.json()
      setSession(data.session)
      setQuestions(data.questions)
      setCurrentSection(1)
      setCurrentQuestionIndex(0)

      return data.session.id
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadSession = useCallback(async (sessionId: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/sessions?id=${sessionId}`)

      if (!response.ok) throw new Error('Failed to load session')

      const data = await response.json()
      setSession(data.session)
      setQuestions(data.questions)
      setCurrentSection(data.session.current_section || 1)

      // Load existing responses
      if (data.responses) {
        const responsesMap = new Map<string, TestResponse>()
        data.responses.forEach((r: TestResponse) => {
          responsesMap.set(r.question_id, r)
        })
        setResponses(responsesMap)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const submitAnswer = useCallback(async (
    questionId: string,
    answer: string,
    timeSpent: number
  ): Promise<void> => {
    if (!session) return

    try {
      const response = await fetch('/api/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          questionId,
          answer,
          timeSpent
        })
      })

      if (!response.ok) throw new Error('Failed to submit answer')

      const data = await response.json()

      setResponses((prev) => {
        const newMap = new Map(prev)
        newMap.set(questionId, data.response)
        return newMap
      })
    } catch (err) {
      console.error('Failed to submit answer:', err)
    }
  }, [session])

  const getSectionQuestions = useCallback((): Question[] => {
    const sectionConfig = TEST_SECTIONS[currentSection - 1]
    if (!sectionConfig) return []

    return questions.filter(q => q.category === sectionConfig.category)
  }, [questions, currentSection])

  const getCurrentQuestion = useCallback((): Question | null => {
    const sectionQuestions = getSectionQuestions()
    return sectionQuestions[currentQuestionIndex] || null
  }, [getSectionQuestions, currentQuestionIndex])

  const nextQuestion = useCallback(() => {
    const sectionQuestions = getSectionQuestions()
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }, [getSectionQuestions, currentQuestionIndex])

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }, [currentQuestionIndex])

  const nextSection = useCallback(async () => {
    if (currentSection < TEST_SECTIONS.length) {
      const newSection = currentSection + 1
      setCurrentSection(newSection)
      setCurrentQuestionIndex(0)

      // Update session on server
      if (session) {
        await fetch('/api/sessions', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: session.id,
            currentSection: newSection
          })
        })
      }
    }
  }, [currentSection, session])

  const completeTest = useCallback(async (): Promise<void> => {
    if (!session) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/calculate-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.id })
      })

      if (!response.ok) throw new Error('Failed to complete test')

      const data = await response.json()
      setSession(data.session)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [session])

  const getSectionProgress = useCallback(() => {
    const sectionQuestions = getSectionQuestions()
    return {
      current: currentQuestionIndex + 1,
      total: sectionQuestions.length
    }
  }, [getSectionQuestions, currentQuestionIndex])

  return {
    session,
    questions,
    responses,
    currentSection,
    currentQuestionIndex,
    isLoading,
    error,
    createSession,
    loadSession,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    nextSection,
    completeTest,
    getCurrentQuestion,
    getSectionQuestions,
    getSectionProgress
  }
}
