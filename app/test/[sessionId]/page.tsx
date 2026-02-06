import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TestContainer from '@/components/test/TestContainer'

interface TestPageProps {
  params: Promise<{ sessionId: string }>
}

export default async function TestPage({ params }: TestPageProps) {
  const { sessionId } = await params
  const supabase = await createClient()

  // Fetch session
  const { data: session, error: sessionError } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (sessionError || !session) {
    redirect('/test')
  }

  // If session is completed or paid, redirect accordingly
  if (session.status === 'completed' || session.status === 'paid') {
    redirect(`/complete/${sessionId}`)
  }

  // Fetch questions for this test
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('*')
    .order('category')
    .order('difficulty')

  if (questionsError || !questions || questions.length === 0) {
    // If no questions exist, show error
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Available</h1>
          <p className="text-gray-600">Questions are being loaded. Please try again later.</p>
        </div>
      </div>
    )
  }

  // Fetch existing responses
  const { data: responses } = await supabase
    .from('test_responses')
    .select('*')
    .eq('session_id', sessionId)

  // Create a map of question_id -> response
  const responsesMap = new Map<string, { answer: string; questionId: string }>()
  if (responses) {
    responses.forEach((r) => {
      if (r.user_answer) {
        responsesMap.set(r.question_id, {
          answer: r.user_answer,
          questionId: r.question_id
        })
      }
    })
  }

  return (
    <TestContainer
      sessionId={sessionId}
      initialQuestions={questions}
      initialSection={session.current_section || 1}
      initialResponses={responsesMap}
    />
  )
}
