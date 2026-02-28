'use server'

import { createClient } from '@/lib/supabase/server'
import { calculateFullResult } from '@/lib/scoring/calculator'
import {
  submitAnswerSchema,
  updateSessionSectionSchema,
  updateSessionEmailSchema,
  calculateScoreSchema,
} from '@/lib/validations'
import { v4 as uuidv4 } from 'uuid'

export async function createTestSession() {
  try {
    const supabase = await createClient()

    const sessionToken = uuidv4()
    const { data: session, error: sessionError } = await supabase
      .from('test_sessions')
      .insert({
        session_token: sessionToken,
        status: 'in_progress',
        current_section: 1,
      })
      .select()
      .single()

    if (sessionError) {
      console.error('Session creation error:', sessionError)
      return { error: 'Failed to create session' }
    }

    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .order('category')
      .order('difficulty')

    if (questionsError) {
      console.error('Questions fetch error:', questionsError)
      return { error: 'Failed to fetch questions' }
    }

    return { session, questions }
  } catch (error) {
    console.error('createTestSession error:', error)
    return { error: 'Internal server error' }
  }
}

export async function submitAnswer(input: unknown) {
  const parsed = submitAnswerSchema.safeParse(input)
  if (!parsed.success) {
    return { error: 'Invalid input' }
  }

  const { sessionId, questionId, answer, timeSpent } = parsed.data

  try {
    const supabase = await createClient()

    // Verify session is in_progress
    const { data: session, error: sessionError } = await supabase
      .from('test_sessions')
      .select('status')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return { error: 'Session not found' }
    }

    if (session.status !== 'in_progress') {
      return { error: 'Session is not in progress' }
    }

    // Get the question to check the correct answer
    const { data: question, error: questionError } = await supabase
      .from('questions')
      .select('correct_answer')
      .eq('id', questionId)
      .single()

    if (questionError || !question) {
      return { error: 'Question not found' }
    }

    const isCorrect = answer === question.correct_answer

    const { data: response, error: responseError } = await supabase
      .from('test_responses')
      .upsert(
        {
          session_id: sessionId,
          question_id: questionId,
          user_answer: answer,
          is_correct: isCorrect,
          time_spent_seconds: timeSpent,
          answered_at: new Date().toISOString(),
        },
        { onConflict: 'session_id,question_id' }
      )
      .select()
      .single()

    if (responseError) {
      console.error('Response upsert error:', responseError)
      return { error: 'Failed to save answer' }
    }

    return { response }
  } catch (error) {
    console.error('submitAnswer error:', error)
    return { error: 'Internal server error' }
  }
}

export async function updateSessionSection(input: unknown) {
  const parsed = updateSessionSectionSchema.safeParse(input)
  if (!parsed.success) {
    return { error: 'Invalid input' }
  }

  const { sessionId, currentSection } = parsed.data

  try {
    const supabase = await createClient()

    // Verify session is in_progress
    const { data: existing, error: checkError } = await supabase
      .from('test_sessions')
      .select('status')
      .eq('id', sessionId)
      .single()

    if (checkError || !existing) {
      return { error: 'Session not found' }
    }

    if (existing.status !== 'in_progress') {
      return { error: 'Session is not in progress' }
    }

    const { data: session, error } = await supabase
      .from('test_sessions')
      .update({ current_section: currentSection })
      .eq('id', sessionId)
      .select()
      .single()

    if (error) {
      return { error: 'Failed to update session' }
    }

    return { session }
  } catch (error) {
    console.error('updateSessionSection error:', error)
    return { error: 'Internal server error' }
  }
}

export async function updateSessionEmail(input: unknown) {
  const parsed = updateSessionEmailSchema.safeParse(input)
  if (!parsed.success) {
    return { error: 'Invalid input' }
  }

  const { sessionId, email } = parsed.data

  try {
    const supabase = await createClient()

    const { data: session, error } = await supabase
      .from('test_sessions')
      .update({ email })
      .eq('id', sessionId)
      .select()
      .single()

    if (error) {
      return { error: 'Failed to update session' }
    }

    return { session }
  } catch (error) {
    console.error('updateSessionEmail error:', error)
    return { error: 'Internal server error' }
  }
}

export async function calculateScore(input: unknown) {
  const parsed = calculateScoreSchema.safeParse(input)
  if (!parsed.success) {
    return { error: 'Invalid input' }
  }

  const { sessionId } = parsed.data

  try {
    const supabase = await createClient()

    // Get the session
    const { data: session, error: sessionError } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return { error: 'Session not found' }
    }

    if (session.status !== 'in_progress') {
      return { error: 'Session already scored' }
    }

    // Get all questions
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')

    if (questionsError || !questions) {
      return { error: 'Failed to fetch questions' }
    }

    // Get all responses for this session
    const { data: responses, error: responsesError } = await supabase
      .from('test_responses')
      .select('*')
      .eq('session_id', sessionId)

    if (responsesError) {
      return { error: 'Failed to fetch responses' }
    }

    const result = calculateFullResult(questions, responses || [])

    const { data: updatedSession, error: updateError } = await supabase
      .from('test_sessions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        raw_score: result.rawScore,
        iq_score: result.iqScore,
        percentile: result.percentile,
      })
      .eq('id', sessionId)
      .select()
      .single()

    if (updateError) {
      console.error('Session update error:', updateError)
      return { error: 'Failed to update session' }
    }

    return { session: updatedSession, result }
  } catch (error) {
    console.error('calculateScore error:', error)
    return { error: 'Internal server error' }
  }
}
