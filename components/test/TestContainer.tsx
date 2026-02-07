'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTimer } from '@/hooks/useTimer'
import { Question, TEST_SECTIONS, QuestionCategory } from '@/types'
import Timer from './Timer'
import ProgressBar from './ProgressBar'
import SectionIntro from './SectionIntro'
import PatternQuestion from './questions/PatternQuestion'
import NumericalQuestion from './questions/NumericalQuestion'
import VerbalQuestion from './questions/VerbalQuestion'
import SpatialQuestion from './questions/SpatialQuestion'
import Button from '@/components/ui/Button'

interface TestContainerProps {
  sessionId: string
  initialQuestions: Question[]
  initialSection: number
  initialResponses: Map<string, { answer: string; questionId: string }>
}

export default function TestContainer({
  sessionId,
  initialQuestions,
  initialSection,
  initialResponses
}: TestContainerProps) {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(initialSection)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showSectionIntro, setShowSectionIntro] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [responses, setResponses] = useState(initialResponses)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const questionStartTime = useRef<number>(Date.now())

  const section = TEST_SECTIONS[currentSection - 1]
  const sectionQuestions = initialQuestions.filter(q => q.category === section.category)
  const currentQuestion = sectionQuestions[currentQuestionIndex]

  const answeredInSection = sectionQuestions.filter(q => responses.has(q.id)).length

  const handleTimeUp = useCallback(async () => {
    // Auto-submit current section and move to next
    if (currentSection < TEST_SECTIONS.length) {
      setCurrentSection(prev => prev + 1)
      setCurrentQuestionIndex(0)
      setShowSectionIntro(true)
      setSelectedAnswer(null)

      // Update session on server
      await fetch('/api/sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          currentSection: currentSection + 1
        })
      })
    } else {
      // Complete test
      await completeTest()
    }
  }, [currentSection, sessionId])

  const { timeLeft, formattedTime, start: startTimer, reset: resetTimer } = useTimer({
    initialTime: section?.timeLimit || 300,
    onTimeUp: handleTimeUp
  })

  // Reset timer when section changes
  useEffect(() => {
    if (section && !showSectionIntro) {
      resetTimer(section.timeLimit)
      startTimer()
    }
  }, [currentSection, showSectionIntro])

  // Load existing answer for current question
  useEffect(() => {
    if (currentQuestion) {
      const existingResponse = responses.get(currentQuestion.id)
      setSelectedAnswer(existingResponse?.answer || null)
      questionStartTime.current = Date.now()
    }
  }, [currentQuestion?.id])

  const handleStartSection = () => {
    setShowSectionIntro(false)
    questionStartTime.current = Date.now()
  }

  const submitAnswer = async (questionId: string, answer: string) => {
    const timeSpent = Math.floor((Date.now() - questionStartTime.current) / 1000)

    try {
      await fetch('/api/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          questionId,
          answer,
          timeSpent
        })
      })

      setResponses(prev => {
        const newMap = new Map(prev)
        newMap.set(questionId, { answer, questionId })
        return newMap
      })
    } catch (err) {
      console.error('Failed to submit answer:', err)
    }
  }

  const handleSelectAnswer = async (answer: string) => {
    setSelectedAnswer(answer)
    if (currentQuestion) {
      await submitAnswer(currentQuestion.id, answer)
    }
  }

  const handleNext = async () => {
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      questionStartTime.current = Date.now()
    } else if (currentSection < TEST_SECTIONS.length) {
      // Move to next section
      const nextSection = currentSection + 1
      setCurrentSection(nextSection)
      setCurrentQuestionIndex(0)
      setShowSectionIntro(true)
      setSelectedAnswer(null)

      await fetch('/api/sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          currentSection: nextSection
        })
      })
    } else {
      // Complete test
      await completeTest()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      questionStartTime.current = Date.now()
    }
  }

  const completeTest = async () => {
    setIsSubmitting(true)
    try {
      await fetch('/api/calculate-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      router.push(`/complete/${sessionId}`)
    } catch (err) {
      console.error('Failed to complete test:', err)
      setIsSubmitting(false)
    }
  }

  const renderQuestion = () => {
    if (!currentQuestion) return null

    const props = {
      question: currentQuestion,
      selectedAnswer,
      onSelectAnswer: handleSelectAnswer
    }

    switch (currentQuestion.category) {
      case 'pattern':
        return <PatternQuestion {...props} />
      case 'numerical':
        return <NumericalQuestion {...props} />
      case 'verbal':
        return <VerbalQuestion {...props} />
      case 'spatial':
        return <SpatialQuestion {...props} />
      default:
        return null
    }
  }

  if (showSectionIntro && section) {
    return <SectionIntro section={section} onStart={handleStartSection} />
  }

  const isLastQuestion = currentQuestionIndex === sectionQuestions.length - 1
  const isLastSection = currentSection === TEST_SECTIONS.length

  return (
    <div className="h-[100dvh] bg-gray-50 flex flex-col overflow-hidden md:block md:h-auto md:overflow-visible">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 flex-shrink-0">
        <div className="max-w-5xl mx-auto px-3 py-2 md:px-4 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">IQ</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Section {currentSection}</div>
                <div className="font-semibold text-gray-900">{section?.name}</div>
              </div>
            </div>
            <Timer
              timeLeft={timeLeft}
              totalTime={section?.timeLimit || 300}
              formattedTime={formattedTime}
            />
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200 px-3 py-1.5 md:px-4 md:py-3 flex-shrink-0">
        <div className="max-w-5xl mx-auto">
          <ProgressBar
            currentSection={currentSection}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={sectionQuestions.length}
            answeredCount={answeredInSection}
          />
        </div>
      </div>

      {/* Question content */}
      <main className="max-w-4xl mx-auto px-3 py-2 md:px-4 md:py-8 flex-1 flex flex-col min-h-0 md:block">
        <div className="bg-white rounded-2xl shadow-lg p-3 md:p-6 lg:p-8 flex-1 min-h-0 overflow-y-auto md:overflow-visible">
          {renderQuestion()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-2 md:mt-6 flex-shrink-0">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>

          <div className="text-xs md:text-sm text-gray-500">
            {selectedAnswer ? 'Answer saved' : 'Select an answer'}
          </div>

          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isLastQuestion && isLastSection ? (
              'Finish Test'
            ) : isLastQuestion ? (
              'Next Section'
            ) : (
              'Next'
            )}
            {!isSubmitting && (
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </Button>
        </div>

        {/* Question dots navigation */}
        <div className="hidden md:flex justify-center gap-2 mt-6 flex-wrap">
          {sectionQuestions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => {
                setCurrentQuestionIndex(index)
                questionStartTime.current = Date.now()
              }}
              className={`w-6 h-6 text-xs md:w-8 md:h-8 md:text-sm rounded-full font-medium transition-all ${
                index === currentQuestionIndex
                  ? 'bg-primary-600 text-white'
                  : responses.has(q.id)
                  ? 'bg-green-100 text-green-700 border-2 border-green-500'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
