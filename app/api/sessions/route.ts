import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Create a new session
    const sessionToken = uuidv4()
    const { data: session, error: sessionError } = await supabase
      .from('test_sessions')
      .insert({
        session_token: sessionToken,
        status: 'in_progress',
        current_section: 1
      })
      .select()
      .single()

    if (sessionError) {
      console.error('Session creation error:', sessionError)
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
    }

    // Fetch questions for the test
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .order('category')
      .order('difficulty')

    if (questionsError) {
      console.error('Questions fetch error:', questionsError)
      return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
    }

    return NextResponse.json({ session, questions })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: session, error: sessionError } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const { data: questions } = await supabase
      .from('questions')
      .select('*')
      .order('category')
      .order('difficulty')

    const { data: responses } = await supabase
      .from('test_responses')
      .select('*')
      .eq('session_id', sessionId)

    return NextResponse.json({ session, questions, responses })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, currentSection, status, email } = body

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    const supabase = await createClient()

    const updates: Record<string, any> = {}
    if (currentSection !== undefined) updates.current_section = currentSection
    if (status !== undefined) updates.status = status
    if (email !== undefined) updates.email = email

    const { data: session, error } = await supabase
      .from('test_sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to update session' }, { status: 500 })
    }

    return NextResponse.json({ session })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
