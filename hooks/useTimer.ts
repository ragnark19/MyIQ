'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTimerOptions {
  initialTime: number
  onTimeUp?: () => void
  autoStart?: boolean
}

export function useTimer({ initialTime, onTimeUp, autoStart = false }: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(autoStart)
  const onTimeUpRef = useRef(onTimeUp)
  const hasCalledTimeUp = useRef(false)

  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          if (!hasCalledTimeUp.current && onTimeUpRef.current) {
            hasCalledTimeUp.current = true
            onTimeUpRef.current()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const start = useCallback(() => {
    hasCalledTimeUp.current = false
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback((newTime?: number) => {
    hasCalledTimeUp.current = false
    setTimeLeft(newTime ?? initialTime)
    setIsRunning(false)
  }, [initialTime])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    formattedTime: formatTime(timeLeft),
    percentageLeft: (timeLeft / initialTime) * 100
  }
}
