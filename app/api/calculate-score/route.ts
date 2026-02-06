import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { calculateFullResult } from '@/lib/scoring/calculator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get the session
    const { data: session, error: sessionError } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Get all questions
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')

    if (questionsError || !questions) {
      return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
    }

    // Get all responses for this session
    const { data: responses, error: responsesError } = await supabase
      .from('test_responses')
      .select('*')
      .eq('session_id', sessionId)

    if (responsesError) {
      return NextResponse.json({ error: 'Failed to fetch responses' }, { status: 500 })
    }

    // Calculate the results
    const result = calculateFullResult(questions, responses || [])

    // Update the session with scores
    const { data: updatedSession, error: updateError } = await supabase
      .from('test_sessions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        raw_score: result.rawScore,
        iq_score: result.iqScore,
        percentile: result.percentile
      })
      .eq('id', sessionId)
      .select()
      .single()

    if (updateError) {
      console.error('Session update error:', updateError)
      return NextResponse.json({ error: 'Failed to update session' }, { status: 500 })
    }

    return NextResponse.json({
      session: updatedSession,
      result
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
