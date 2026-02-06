import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, questionId, answer, timeSpent } = body

    if (!sessionId || !questionId) {
      return NextResponse.json({ error: 'Session ID and Question ID required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get the question to check the correct answer
    const { data: question, error: questionError } = await supabase
      .from('questions')
      .select('correct_answer')
      .eq('id', questionId)
      .single()

    if (questionError || !question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    const isCorrect = answer === question.correct_answer

    // Upsert the response (update if exists, insert if not)
    const { data: response, error: responseError } = await supabase
      .from('test_responses')
      .upsert(
        {
          session_id: sessionId,
          question_id: questionId,
          user_answer: answer,
          is_correct: isCorrect,
          time_spent_seconds: timeSpent,
          answered_at: new Date().toISOString()
        },
        {
          onConflict: 'session_id,question_id'
        }
      )
      .select()
      .single()

    if (responseError) {
      console.error('Response upsert error:', responseError)
      return NextResponse.json({ error: 'Failed to save answer' }, { status: 500 })
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
