import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { calculateCategoryScores, analyzeStrengthsWeaknesses } from '@/lib/scoring/calculator'
import ScoreDisplay from '@/components/results/ScoreDisplay'
import CategoryBreakdown from '@/components/results/CategoryBreakdown'
import StrengthsWeaknesses from '@/components/results/StrengthsWeaknesses'
import CertificateDownload from '@/components/results/CertificateDownload'
import ShareButtons from '@/components/results/ShareButtons'
import QuestionReview from '@/components/results/QuestionReview'
import Button from '@/components/ui/Button'

interface ResultsPageProps {
  params: Promise<{ sessionId: string }>
}

export default async function ResultsPage({ params }: ResultsPageProps) {
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

  // If not paid, redirect to payment
  if (session.status !== 'paid') {
    redirect(`/complete/${sessionId}`)
  }

  // Fetch certificate
  const { data: certificate } = await supabase
    .from('certificates')
    .select('*')
    .eq('session_id', sessionId)
    .single()

  // Fetch questions and responses for category breakdown
  const { data: questions } = await supabase.from('questions').select('*')
  const { data: responses } = await supabase
    .from('test_responses')
    .select('*')
    .eq('session_id', sessionId)

  // Calculate category scores
  const categoryScores = questions && responses
    ? calculateCategoryScores(questions, responses)
    : []

  const { strengths, weaknesses } = analyzeStrengthsWeaknesses(categoryScores)

  const iqScore = session.iq_score || 100
  const percentile = session.percentile || 50

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">IQ</span>
            </div>
            <span className="font-semibold text-gray-900">MyIQ</span>
          </Link>
          <Link href="/test">
            <Button variant="secondary" size="sm">
              Take Another Test
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Congratulations banner */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Test Completed Successfully
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Your IQ Results</h1>
        </div>

        {/* Main score card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <ScoreDisplay iqScore={iqScore} percentile={percentile} />
        </div>

        {/* Category breakdown */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <CategoryBreakdown categoryScores={categoryScores} />
        </div>

        {/* Strengths and weaknesses */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis</h3>
          <StrengthsWeaknesses strengths={strengths} weaknesses={weaknesses} />
        </div>

        {/* Certificate download */}
        {certificate && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Certificate</h3>
            <CertificateDownload
              sessionId={sessionId}
              certificateNumber={certificate.certificate_number}
              iqScore={iqScore}
              percentile={percentile}
            />
          </div>
        )}

        {/* Question Review */}
        {questions && responses && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
            <QuestionReview questions={questions} responses={responses} />
          </div>
        )}

        {/* Share section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Results</h3>
          <p className="text-gray-600 mb-4">
            Proud of your score? Share it with friends and challenge them to take the test!
          </p>
          <ShareButtons iqScore={iqScore} percentile={percentile} />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Thank you for taking the MyIQ assessment.</p>
          <p className="mt-1">
            Questions or concerns? Contact us at support@myiq.com
          </p>
        </div>
      </main>
    </div>
  )
}
