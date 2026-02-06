import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateCertificatePDF } from '@/lib/pdf/certificate'
import { calculateCategoryScores } from '@/lib/scoring/calculator'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params
    const supabase = await createClient()

    // Get session with payment verification
    const { data: session, error: sessionError } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('status', 'paid')
      .single()

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized or session not found' }, { status: 401 })
    }

    // Get certificate
    const { data: certificate } = await supabase
      .from('certificates')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    // Get questions and responses for category breakdown
    const { data: questions } = await supabase.from('questions').select('*')
    const { data: responses } = await supabase
      .from('test_responses')
      .select('*')
      .eq('session_id', sessionId)

    let categoryScores = undefined
    if (questions && responses) {
      const scores = calculateCategoryScores(questions, responses)
      categoryScores = scores.map(s => ({
        category: s.category.charAt(0).toUpperCase() + s.category.slice(1) + ' Reasoning',
        percentage: s.percentage
      }))
    }

    // Generate PDF
    const pdf = generateCertificatePDF({
      iqScore: session.iq_score || 100,
      percentile: session.percentile || 50,
      certificateNumber: certificate.certificate_number,
      completedAt: session.completed_at || new Date().toISOString(),
      categoryScores
    })

    const pdfBuffer = pdf.output('arraybuffer')

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="IQ-Certificate-${certificate.certificate_number}.pdf"`
      }
    })
  } catch (error) {
    console.error('Certificate generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
