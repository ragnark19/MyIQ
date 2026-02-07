import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for MyIQ - Learn how we collect, use, and protect your data in compliance with the GDPR.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold">IQ</span>
            </div>
            <span className="text-lg font-semibold">MyIQ</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-sm">
            Last updated: February 7, 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-10 text-white/80 leading-relaxed">
          {/* 1. Introduction & Data Controller */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Introduction and Data Controller
            </h2>
            <p className="mb-4">
              Welcome to MyIQ (&quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;). We are committed to protecting your personal data
              and respecting your privacy in accordance with the General Data
              Protection Regulation (GDPR) and applicable Icelandic data
              protection law.
            </p>
            <p className="mb-4">
              MyIQ operates the website{' '}
              <a
                href="https://myiq.is"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                myiq.is
              </a>{' '}
              and provides an online IQ testing service. MyIQ is based in
              Iceland, a member of the European Economic Area (EEA), and is the
              data controller responsible for your personal data as described in
              this Privacy Policy.
            </p>
            <p>
              This Privacy Policy explains what data we collect, how we use it,
              who we share it with, and what rights you have regarding your
              personal data. Please read it carefully before using our service.
            </p>
          </section>

          {/* 2. Data We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Data We Collect
            </h2>
            <p className="mb-4">
              Our service is designed to minimise the personal data we collect.
              You do not need to create an account to use MyIQ. We collect the
              following categories of data:
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              2.1 Session Data
            </h3>
            <p className="mb-4">
              When you start a test, we generate an anonymous session ID and
              record timestamps (e.g. when the session was created and when each
              test section was started and completed). This session ID is not
              linked to any personally identifiable information such as your name
              or email address.
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              2.2 Test Responses
            </h3>
            <p className="mb-4">
              We collect your answers to the test questions so that we can
              calculate your results. These responses are stored against your
              anonymous session ID.
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              2.3 Test Results
            </h3>
            <p className="mb-4">
              Once your test is scored, we store the calculated IQ score and
              individual category scores (pattern recognition, numerical
              reasoning, verbal reasoning, and spatial reasoning) associated with
              your session.
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              2.4 Payment Data
            </h3>
            <p className="mb-4">
              Payment for test results ($2.99) is processed by our payment
              partner, Paddle, which acts as the Merchant of Record for all
              transactions. We do not collect, store, or have access to your
              credit card number, debit card number, or other financial payment
              instrument details. Paddle may share with us limited transaction
              information such as a transaction reference, purchase status, and
              the email address you provide at checkout so that we can fulfil
              your order. Paddle&apos;s handling of your payment data is governed
              by{' '}
              <a
                href="https://www.paddle.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                Paddle&apos;s Privacy Policy
              </a>
              .
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              2.5 Technical Data
            </h3>
            <p className="mb-4">
              Like most websites, our servers automatically collect certain
              technical information when you visit our site. This may include
              your IP address, browser type and version, operating system, device
              type, referring URL, pages visited, and the date and time of your
              visit. This data is collected through standard web server logs and
              is used to ensure the security and proper functioning of our
              service.
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              2.6 Cookies
            </h3>
            <p>
              We use only essential cookies that are strictly necessary for the
              operation of our service, such as session management cookies. We do
              not use any tracking, analytics, or advertising cookies. For more
              details, see Section 9 below.
            </p>
          </section>

          {/* 3. How We Use Your Data */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. How We Use Your Data
            </h2>
            <p className="mb-4">We use the data we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <span className="text-white/80">
                  Provide the IQ test service, including presenting questions and
                  recording your answers
                </span>
              </li>
              <li>
                <span className="text-white/80">
                  Calculate and deliver your test results, including your overall
                  IQ score and category-level scores
                </span>
              </li>
              <li>
                <span className="text-white/80">
                  Generate a downloadable PDF certificate of your results
                </span>
              </li>
              <li>
                <span className="text-white/80">
                  Process payments for test results through our payment partner,
                  Paddle
                </span>
              </li>
              <li>
                <span className="text-white/80">
                  Maintain the security and integrity of our service, including
                  fraud prevention
                </span>
              </li>
              <li>
                <span className="text-white/80">
                  Improve and optimise our service based on aggregated,
                  anonymised usage patterns
                </span>
              </li>
            </ul>
          </section>

          {/* 4. Legal Basis for Processing */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Legal Basis for Processing (GDPR Article 6)
            </h2>
            <p className="mb-4">
              Under the GDPR, we must have a valid legal basis for processing
              your personal data. We rely on the following legal bases:
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              4.1 Performance of a Contract (Article 6(1)(b))
            </h3>
            <p className="mb-4">
              Processing your session data, test responses, and test results is
              necessary to perform the contract between you and us &mdash;
              namely, to provide the IQ test you have taken and to deliver the
              results you have purchased.
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              4.2 Legitimate Interests (Article 6(1)(f))
            </h3>
            <p className="mb-4">
              We process certain technical data (such as IP addresses and browser
              information) on the basis of our legitimate interests in
              maintaining the security of our service, preventing fraud, and
              improving the quality of our offerings. We have assessed that these
              interests do not override your fundamental rights and freedoms.
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              4.3 Consent (Article 6(1)(a))
            </h3>
            <p>
              Where required, we will obtain your consent before processing your
              personal data. You have the right to withdraw your consent at any
              time by contacting us at{' '}
              <a
                href="mailto:support@myiq.is"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                support@myiq.is
              </a>
              . Withdrawal of consent does not affect the lawfulness of
              processing carried out before the withdrawal.
            </p>
          </section>

          {/* 5. Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Data Sharing
            </h2>
            <p className="mb-4">
              We do not sell your personal data to third parties. We do not share
              your data with advertising networks. We share data only with the
              following categories of service providers, and only to the extent
              necessary to operate our service:
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              5.1 Paddle
            </h3>
            <p className="mb-4">
              Paddle acts as our Merchant of Record and processes all payments on
              our behalf. When you make a purchase, Paddle collects and processes
              your payment information directly. We share your session reference
              with Paddle so that we can link a completed payment to your test
              results. Paddle&apos;s processing of your data is subject to{' '}
              <a
                href="https://www.paddle.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                Paddle&apos;s Privacy Policy
              </a>
              .
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              5.2 Supabase
            </h3>
            <p className="mb-4">
              We use Supabase as our cloud-hosted database and backend
              infrastructure provider. Your session data, test responses, and
              test results are stored on Supabase&apos;s servers. Supabase acts
              as a data processor on our behalf and processes data in accordance
              with our instructions and their{' '}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                Privacy Policy
              </a>
              .
            </p>

            <h3 className="text-lg font-semibold text-white/90 mb-2">
              5.3 Legal Requirements
            </h3>
            <p>
              We may disclose your data if required to do so by law, or if we
              believe in good faith that such disclosure is necessary to comply
              with a legal obligation, protect our rights, or ensure the safety
              of our users.
            </p>
          </section>

          {/* 6. Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Data Retention
            </h2>
            <p className="mb-4">
              We retain your data only for as long as necessary to fulfil the
              purposes for which it was collected:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
              <li>
                <span className="text-white/80">
                  <strong className="text-white/90">
                    Test session data, responses, and results:
                  </strong>{' '}
                  Retained for 12 months from the date of your test, after which
                  it is automatically deleted.
                </span>
              </li>
              <li>
                <span className="text-white/80">
                  <strong className="text-white/90">Payment records:</strong>{' '}
                  Retained for as long as required by applicable tax and
                  accounting laws (typically up to 7 years), in accordance with
                  Icelandic and EU legislation.
                </span>
              </li>
              <li>
                <span className="text-white/80">
                  <strong className="text-white/90">
                    Technical / server logs:
                  </strong>{' '}
                  Retained for up to 90 days for security and troubleshooting
                  purposes.
                </span>
              </li>
            </ul>
            <p>
              You may request the deletion of your data at any time by
              contacting us at{' '}
              <a
                href="mailto:support@myiq.is"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                support@myiq.is
              </a>
              . We will process your request without undue delay, subject to any
              legal obligations that require us to retain certain records.
            </p>
          </section>

          {/* 7. Your Rights Under GDPR */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Your Rights Under the GDPR
            </h2>
            <p className="mb-4">
              As a data subject, you have the following rights under the GDPR.
              You may exercise any of these rights by contacting us at{' '}
              <a
                href="mailto:support@myiq.is"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                support@myiq.is
              </a>
              :
            </p>
            <ul className="space-y-4 ml-2">
              <li>
                <strong className="text-white/90">Right of Access</strong>
                <span className="text-white/60"> &mdash; </span>
                You have the right to request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong className="text-white/90">Right to Rectification</strong>
                <span className="text-white/60"> &mdash; </span>
                You have the right to request that we correct any inaccurate or
                incomplete personal data.
              </li>
              <li>
                <strong className="text-white/90">
                  Right to Erasure (&quot;Right to Be Forgotten&quot;)
                </strong>
                <span className="text-white/60"> &mdash; </span>
                You have the right to request the deletion of your personal
                data, subject to certain legal exceptions.
              </li>
              <li>
                <strong className="text-white/90">
                  Right to Restrict Processing
                </strong>
                <span className="text-white/60"> &mdash; </span>
                You have the right to request that we limit the way we use your
                data in certain circumstances.
              </li>
              <li>
                <strong className="text-white/90">
                  Right to Data Portability
                </strong>
                <span className="text-white/60"> &mdash; </span>
                You have the right to receive your personal data in a
                structured, commonly used, and machine-readable format, and to
                transmit it to another controller.
              </li>
              <li>
                <strong className="text-white/90">Right to Object</strong>
                <span className="text-white/60"> &mdash; </span>
                You have the right to object to our processing of your personal
                data where we rely on legitimate interests as the legal basis.
              </li>
              <li>
                <strong className="text-white/90">
                  Right to Withdraw Consent
                </strong>
                <span className="text-white/60"> &mdash; </span>
                Where processing is based on your consent, you may withdraw that
                consent at any time without affecting the lawfulness of
                processing prior to the withdrawal.
              </li>
              <li>
                <strong className="text-white/90">
                  Right to Lodge a Complaint
                </strong>
                <span className="text-white/60"> &mdash; </span>
                If you believe that we have violated your data protection rights,
                you have the right to lodge a complaint with the Icelandic Data
                Protection Authority (Personuvernd):{' '}
                <a
                  href="https://www.personuvernd.is"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
                >
                  www.personuvernd.is
                </a>
                .
              </li>
            </ul>
            <p className="mt-4">
              We will respond to all legitimate requests within one month. In
              certain cases, we may need to verify your identity before
              processing your request. If your request is particularly complex,
              we may extend the response period by up to two additional months,
              in which case we will inform you of the extension and the reasons
              for the delay.
            </p>
          </section>

          {/* 8. International Data Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. International Data Transfers
            </h2>
            <p className="mb-4">
              MyIQ is based in Iceland, which is part of the EEA. However, some
              of our service providers (such as Supabase and Paddle) may process
              data outside the EEA, including in the United States.
            </p>
            <p>
              Where personal data is transferred outside the EEA, we ensure that
              appropriate safeguards are in place in accordance with the GDPR.
              These safeguards may include the European Commission&apos;s
              Standard Contractual Clauses (SCCs), adequacy decisions, or other
              legally recognised transfer mechanisms. You may contact us at{' '}
              <a
                href="mailto:support@myiq.is"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                support@myiq.is
              </a>{' '}
              to obtain further details about the specific safeguards applied to
              any international data transfer.
            </p>
          </section>

          {/* 9. Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Cookies
            </h2>
            <p className="mb-4">
              Cookies are small text files stored on your device when you visit a
              website. We use only strictly necessary cookies that are essential
              for the operation of our service:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left py-3 px-4 font-semibold text-white/90">
                      Cookie
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-white/90">
                      Purpose
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-white/90">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="py-3 px-4 font-mono text-primary-400 text-xs">
                      session_id
                    </td>
                    <td className="py-3 px-4">
                      Identifies your test session so that your progress and
                      results can be associated correctly
                    </td>
                    <td className="py-3 px-4">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              We do not use any tracking cookies, analytics cookies, or
              advertising cookies. Because we use only strictly necessary
              cookies, consent is not required under the ePrivacy Directive.
            </p>
          </section>

          {/* 10. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Children&apos;s Privacy
            </h2>
            <p>
              Our service is not intended for children under the age of 13. We
              do not knowingly collect personal data from children under 13. If
              we become aware that we have inadvertently collected personal data
              from a child under 13, we will take steps to delete such data as
              soon as possible. If you are a parent or guardian and believe that
              your child has provided us with personal data, please contact us at{' '}
              <a
                href="mailto:support@myiq.is"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                support@myiq.is
              </a>
              .
            </p>
          </section>

          {/* 11. Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              11. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technologies, legal requirements, or
              other factors. When we make material changes, we will update the
              &quot;Last updated&quot; date at the top of this page. We
              encourage you to review this Privacy Policy periodically to stay
              informed about how we are protecting your data. Your continued use
              of our service after any changes to this Privacy Policy constitutes
              your acknowledgement of those changes.
            </p>
          </section>

          {/* 12. Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              12. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our handling of your personal data, please
              contact us:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="mb-2">
                <strong className="text-white/90">MyIQ</strong>
              </p>
              <p className="mb-1">
                Email:{' '}
                <a
                  href="mailto:support@myiq.is"
                  className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
                >
                  support@myiq.is
                </a>
              </p>
              <p className="mb-1">
                Website:{' '}
                <a
                  href="https://myiq.is"
                  className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
                >
                  myiq.is
                </a>
              </p>
              <p>Location: Iceland (EEA)</p>
            </div>
          </section>

          {/* 13. Effective Date */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              13. Effective Date
            </h2>
            <p>
              This Privacy Policy is effective as of{' '}
              <strong className="text-white/90">February 7, 2026</strong>.
            </p>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-medium"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
