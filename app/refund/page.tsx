import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description:
    'MyIQ refund policy. We offer a 14-day no-questions-asked money-back guarantee on all purchases. Learn how to request a refund for your IQ test results.',
  alternates: {
    canonical: '/refund',
  },
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-primary-300 transition-colors"
          >
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">IQ</span>
            </div>
            <span className="text-lg font-semibold">MyIQ</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Page title */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Refund Policy
          </h1>
          <p className="text-white/50 text-sm">
            Last updated: February 7, 2026
          </p>
        </div>

        {/* Policy sections */}
        <div className="space-y-10 text-white/80 leading-relaxed">
          {/* 1. Our Guarantee */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Our Guarantee
            </h2>
            <p>
              We want you to be completely satisfied with your MyIQ experience.
              That is why every purchase comes with a{' '}
              <strong className="text-white">
                14-day money-back guarantee, no questions asked
              </strong>
              . If you are not happy with your results for any reason, we will
              gladly issue a full refund.
            </p>
          </section>

          {/* 2. Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Eligibility
            </h2>
            <p>
              Any purchase made within the last{' '}
              <strong className="text-white">14 days</strong> is eligible for a
              full refund. It does not matter whether you have viewed your
              results or downloaded your certificate. If you are within the
              14-day window, you qualify.
            </p>
          </section>

          {/* 3. How to Request a Refund */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. How to Request a Refund
            </h2>
            <p className="mb-4">
              There are two easy ways to request a refund:
            </p>
            <ul className="list-none space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-6 h-6 bg-primary-600/30 border border-primary-500/40 rounded-full flex items-center justify-center text-xs font-semibold text-primary-300">
                  1
                </span>
                <div>
                  <strong className="text-white">Email us directly</strong>
                  <br />
                  Send an email to{' '}
                  <a
                    href="mailto:support@myiq.is"
                    className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
                  >
                    support@myiq.is
                  </a>{' '}
                  with your session ID or the email address you used during
                  payment. We will take care of the rest.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-6 h-6 bg-primary-600/30 border border-primary-500/40 rounded-full flex items-center justify-center text-xs font-semibold text-primary-300">
                  2
                </span>
                <div>
                  <strong className="text-white">
                    Contact Paddle directly
                  </strong>
                  <br />
                  You can also request a refund through Paddle, our payment
                  processor, using the link in your payment receipt email.
                </div>
              </li>
            </ul>
          </section>

          {/* 4. Processing Time */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Processing Time
            </h2>
            <p>
              Once your refund has been approved, it is typically processed
              within{' '}
              <strong className="text-white">5 to 10 business days</strong>.
              The exact timing depends on your payment provider and financial
              institution. If you have not received your refund after 10
              business days, please reach out to us and we will look into it
              right away.
            </p>
          </section>

          {/* 5. Refund Method */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Refund Method
            </h2>
            <p>
              All refunds are issued to the{' '}
              <strong className="text-white">original payment method</strong>{' '}
              used at checkout. Refunds are processed through Paddle, our
              Merchant of Record, so you may see the credit coming from Paddle
              on your statement.
            </p>
          </section>

          {/* 6. What Happens After a Refund */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. What Happens After a Refund
            </h2>
            <p>
              Once a refund has been processed, your access to the purchased IQ
              test results and downloadable certificate will be{' '}
              <strong className="text-white">revoked</strong>. If you would
              like to view your results again in the future, you are welcome to
              retake the test and make a new purchase.
            </p>
          </section>

          {/* 7. Multiple Purchases */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Multiple Purchases
            </h2>
            <p>
              Each individual purchase is eligible for{' '}
              <strong className="text-white">one refund</strong>. If you have
              made multiple purchases (for example, by retaking the test), each
              transaction is treated independently and may be refunded
              separately within the 14-day window.
            </p>
          </section>

          {/* 8. Paddle as Merchant of Record */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Paddle as Merchant of Record
            </h2>
            <p>
              All payments for MyIQ are processed by{' '}
              <a
                href="https://www.paddle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
              >
                Paddle.com
              </a>
              , which acts as our{' '}
              <strong className="text-white">Merchant of Record</strong>.
              This means Paddle is the entity that formally sells the digital
              product to you and handles billing, sales tax, and refund
              processing on our behalf. Your payment receipt and invoice will
              come from Paddle.
            </p>
          </section>

          {/* 9. EU/EEA Consumer Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. EU/EEA Consumer Rights
            </h2>
            <p className="mb-4">
              MyIQ is operated from{' '}
              <strong className="text-white">Iceland</strong>, a member of the
              European Economic Area (EEA). Under EU consumer protection law
              (Directive 2011/83/EU), consumers in the EU/EEA have a{' '}
              <strong className="text-white">
                14-day right of withdrawal
              </strong>{' '}
              from the date of purchase for digital content and services bought
              online.
            </p>
            <p className="mb-4">
              Please note that under EU law, the right of withdrawal for
              digital content may no longer apply once the service has been
              fully performed, provided the consumer gave prior express consent
              and acknowledged that the right of withdrawal would be lost.
            </p>
            <p>
              However,{' '}
              <strong className="text-white">
                MyIQ honors the full 14-day no-questions-asked refund policy
                regardless
              </strong>
              . Even if you have already viewed your complete results and
              downloaded your certificate, you may still request a refund
              within 14 days of purchase.
            </p>
          </section>

          {/* 10. Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this refund policy or need
              assistance with a refund, we are here to help. Please do not
              hesitate to reach out:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="space-y-2">
                <p>
                  <strong className="text-white">Email:</strong>{' '}
                  <a
                    href="mailto:support@myiq.is"
                    className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
                  >
                    support@myiq.is
                  </a>
                </p>
                <p>
                  <strong className="text-white">Website:</strong>{' '}
                  <a
                    href="https://myiq.is"
                    className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
                  >
                    myiq.is
                  </a>
                </p>
              </div>
            </div>
            <p className="mt-4 text-white/50 text-sm">
              We aim to respond to all refund inquiries within 24 hours on
              business days.
            </p>
          </section>
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm text-center">
            This refund policy is effective as of February 7, 2026, and applies
            to all purchases made on or after this date.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} MyIQ. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/refund"
              className="text-white/70 hover:text-white transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
