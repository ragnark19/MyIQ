'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface CertificateDownloadProps {
  sessionId: string
  certificateNumber: string
  iqScore: number
  percentile: number
}

export default function CertificateDownload({
  sessionId,
  certificateNumber,
  iqScore,
  percentile
}: CertificateDownloadProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch(`/api/certificate/${sessionId}`)

      if (!response.ok) throw new Error('Failed to generate certificate')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `IQ-Certificate-${certificateNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download certificate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
      <div className="flex items-start gap-4">
        {/* Certificate preview */}
        <div className="w-24 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center border-4 border-primary-200 flex-shrink-0">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{iqScore}</div>
            <div className="text-xs text-gray-500">IQ</div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Official IQ Certificate
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Download your personalized certificate with your IQ score and verification number.
          </p>
          <div className="text-xs text-gray-500 mb-4">
            Certificate #: <span className="font-mono">{certificateNumber}</span>
          </div>
          <Button
            onClick={handleDownload}
            isLoading={isGenerating}
            className="w-full sm:w-auto"
          >
            {isGenerating ? 'Generating...' : 'Download PDF Certificate'}
            {!isGenerating && (
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
