'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'How accurate is this IQ test?',
    answer: 'Our test is designed using principles from established psychometric assessments like the WAIS and Raven\'s Progressive Matrices. While no online test can replace a clinical assessment administered by a psychologist, our test provides a reliable estimate of cognitive ability based on your performance across four key domains.'
  },
  {
    question: 'How long does the test take?',
    answer: 'The complete test takes approximately 25 minutes, divided into four timed sections. Each section has its own time limit, and questions are auto-submitted when the timer expires. We recommend finding a quiet place where you won\'t be interrupted.'
  },
  {
    question: 'What happens if I close my browser during the test?',
    answer: 'Your progress is automatically saved. If you need to return later, you can continue from where you left off using the same session link. However, for the most accurate results, we recommend completing the test in one sitting.'
  },
  {
    question: 'What do I get after paying?',
    answer: 'After payment, you receive immediate access to: your calculated IQ score, percentile ranking compared to the general population, detailed breakdown by category (pattern recognition, numerical, verbal, spatial), analysis of your cognitive strengths and areas for growth, and a downloadable PDF certificate with a unique verification number.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use industry-standard encryption for all data transmission. Your test responses are stored securely and are only linked to your session. We don\'t require personal information to take the test - only an email address for delivering your results.'
  },
  {
    question: 'Can I retake the test?',
    answer: 'Yes, you can start a new test at any time. Each test session is independent, and you would need to pay separately to unlock results for each attempt. We recommend waiting at least 6 months between attempts for the most accurate measurement of your cognitive abilities.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our IQ assessment.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
