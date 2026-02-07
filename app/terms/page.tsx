import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for MyIQ - the online IQ test platform. Read about our usage terms, payment policies, intellectual property, and your rights.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
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
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-white/50 text-sm">
            Last updated: February 7, 2026
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-10 text-white/80 leading-relaxed">
          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              Welcome to MyIQ. These Terms of Service (&quot;Terms&quot;) constitute a
              legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or
              &quot;your&quot;) and MyIQ (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operated from
              Iceland, governing your access to and use of the MyIQ website
              located at{' '}
              <a
                href="https://myiq.is"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                myiq.is
              </a>{' '}
              and all related services (collectively, the &quot;Service&quot;).
            </p>
            <p>
              By accessing or using the Service, you acknowledge that you have
              read, understood, and agree to be bound by these Terms. If you do
              not agree to these Terms, you must not access or use the Service.
            </p>
            <p>
              Your use of the Service is also subject to our{' '}
              <Link
                href="/privacy"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              , which describes how we collect, use, and protect your
              information.
            </p>
          </section>

          {/* 2. Description of Service */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Description of Service
            </h2>
            <p>
              MyIQ provides an online cognitive assessment consisting of 40
              questions across four categories:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Pattern Recognition</li>
              <li>Numerical Reasoning</li>
              <li>Verbal Reasoning</li>
              <li>Spatial Reasoning</li>
            </ul>
            <p>
              Upon completion of the test, users may purchase access to detailed
              results, which include an estimated IQ score, percentile ranking
              compared to the general population, a category-by-category
              breakdown of performance, an analysis of cognitive strengths and
              areas for improvement, and a downloadable PDF certificate.
            </p>
          </section>

          {/* 3. Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Eligibility
            </h2>
            <p>To use the Service, you must meet the following requirements:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white">Age 16 or older:</strong> You may
                use the Service independently, including making purchases.
              </li>
              <li>
                <strong className="text-white">Age 13 to 15:</strong> You may
                use the Service only with verifiable consent from a parent or
                legal guardian. A parent or legal guardian must agree to these
                Terms on your behalf and is responsible for any purchase made in
                connection with your use of the Service.
              </li>
              <li>
                <strong className="text-white">Under age 13:</strong> You are
                not permitted to use the Service. We do not knowingly collect
                data from children under the age of 13.
              </li>
            </ul>
            <p>
              By using the Service, you represent and warrant that you meet the
              applicable eligibility requirements described above. We reserve the
              right to request proof of age or parental consent at any time and
              to terminate access if these requirements are not met.
            </p>
          </section>

          {/* 4. Free Test & Paid Results */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Free Test &amp; Paid Results
            </h2>
            <p>
              <strong className="text-white">Free component:</strong> Taking the
              IQ test is entirely free of charge. You may complete all 40
              questions across the four categories at no cost. No account
              creation is required; your test responses are linked to an
              anonymous session identifier.
            </p>
            <p>
              <strong className="text-white">Paid component:</strong> After
              completing the test, you may unlock your detailed results for a
              one-time payment of <strong className="text-white">$2.99 USD</strong>.
              The paid results include your calculated IQ score, percentile
              ranking, category breakdown, strengths and weaknesses analysis, and
              a downloadable PDF certificate. Access to your paid results is
              linked to your session and the unique URL provided after purchase.
            </p>
            <p>
              We reserve the right to modify the pricing of the Service at any
              time. Any price changes will not affect purchases already completed.
            </p>
          </section>

          {/* 5. Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Payment Terms
            </h2>
            <p>
              All payments for the Service are processed by{' '}
              <strong className="text-white">Paddle.com Market Limited</strong>{' '}
              (&quot;Paddle&quot;), which acts as our Merchant of Record. When you make
              a purchase, you are transacting directly with Paddle, not with
              MyIQ. Paddle is responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Processing your payment using your chosen payment method (credit
                card, PayPal, or other methods offered by Paddle)
              </li>
              <li>
                Calculating and collecting applicable taxes (VAT, sales tax, GST)
                based on your location
              </li>
              <li>Issuing payment receipts and invoices</li>
              <li>
                Handling billing disputes and chargebacks in accordance with
                Paddle&apos;s own terms
              </li>
            </ul>
            <p>
              By completing a purchase, you agree to Paddle&apos;s{' '}
              <a
                href="https://www.paddle.com/legal/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                Terms of Use
              </a>{' '}
              and{' '}
              <a
                href="https://www.paddle.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                Privacy Policy
              </a>
              . The final price displayed at checkout includes all applicable
              taxes.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mt-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                Refund Policy
              </h3>
              <p>
                We offer a <strong className="text-white">14-day no-questions-asked
                refund policy</strong>. If you are unsatisfied with your purchase for
                any reason, you may request a full refund within 14 days of your
                purchase date. Refund requests are processed by Paddle. To
                request a refund, contact us at{' '}
                <a
                  href="mailto:support@myiq.is"
                  className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
                >
                  support@myiq.is
                </a>{' '}
                with your order number, or use the refund link provided in your
                purchase receipt email.
              </p>
            </div>
          </section>

          {/* 6. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Intellectual Property
            </h2>
            <p>
              All content, materials, and intellectual property associated with
              the Service are owned by or licensed to MyIQ and are protected by
              applicable intellectual property laws. This includes, but is not
              limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                All test questions, answer sets, and question designs across all
                four categories
              </li>
              <li>
                Scoring algorithms, statistical models, and assessment
                methodologies
              </li>
              <li>
                The MyIQ name, logo, branding elements, and visual design
              </li>
              <li>
                Website code, layout, graphics, and user interface elements
              </li>
              <li>PDF certificate templates and designs</li>
            </ul>
            <p>
              You may not copy, reproduce, distribute, modify, create derivative
              works from, publicly display, publicly perform, republish,
              download, store, or transmit any of the Service&apos;s content except
              as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                You may download and print your own personal PDF certificate for
                personal, non-commercial use
              </li>
              <li>
                Your browser may temporarily cache pages of the Service in the
                normal course of use
              </li>
            </ul>
            <p>
              You do not acquire any ownership rights in any content accessed
              through the Service. Any unauthorized use of the Service&apos;s
              intellectual property may violate copyright, trademark, and other
              applicable laws.
            </p>
          </section>

          {/* 7. Important Disclaimer */}
          <section>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-amber-300 mb-4">
                7. Important Disclaimer: Not a Clinical Assessment
              </h2>
              <p className="text-amber-100/90">
                <strong className="text-amber-200">
                  The MyIQ test is provided for entertainment and educational
                  purposes only.
                </strong>{' '}
                It is not a clinically administered, professionally supervised,
                or diagnostically validated intelligence quotient (IQ) test.
              </p>
              <p className="text-amber-100/90">
                The scores and results generated by the Service are
                approximations based on your responses and our proprietary
                scoring algorithm. They should not be interpreted as a definitive
                measure of your intelligence, cognitive ability, or potential.
              </p>
              <p className="text-amber-100/90">
                <strong className="text-amber-200">
                  The Service is not a substitute for a professional
                  psychological or neuropsychological assessment.
                </strong>{' '}
                If you require an official IQ evaluation for clinical, educational,
                employment, or legal purposes, you should consult a licensed
                psychologist or qualified mental health professional who can
                administer a standardized assessment (such as the WAIS, WISC, or
                Stanford-Binet) under controlled conditions.
              </p>
              <p className="text-amber-100/90">
                We make no warranties or representations regarding the accuracy,
                reliability, or validity of the scores provided. Individual
                results may vary based on numerous factors including but not
                limited to testing conditions, time of day, fatigue, stress, and
                familiarity with test-taking strategies.
              </p>
            </div>
          </section>

          {/* 8. User Conduct */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. User Conduct
            </h2>
            <p>
              By using the Service, you agree that you will not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Use the Service for any unlawful purpose or in violation of any
                applicable laws or regulations
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the Service,
                other users&apos; data, or our systems and networks
              </li>
              <li>
                Use automated scripts, bots, crawlers, or other automated means
                to access the Service or extract data
              </li>
              <li>
                Copy, share, distribute, or publish test questions, answers, or
                scoring methodologies
              </li>
              <li>
                Take the test on behalf of another person or misrepresent your
                identity
              </li>
              <li>
                Attempt to manipulate, reverse-engineer, or circumvent the
                scoring algorithm
              </li>
              <li>
                Interfere with or disrupt the integrity or performance of the
                Service or the data contained therein
              </li>
              <li>
                Use the Service in any manner that could damage, disable,
                overburden, or impair our servers or networks
              </li>
              <li>
                Use test results to discriminate against or harm any individual
              </li>
            </ul>
            <p>
              We reserve the right to terminate or restrict your access to the
              Service at our sole discretion if we reasonably believe you have
              violated any of these conduct rules.
            </p>
          </section>

          {/* 9. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, MyIQ and its
              owners, directors, employees, agents, and affiliates shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including but not limited to loss of profits,
              data, use, goodwill, or other intangible losses, arising out of or
              related to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Your access to or use of (or inability to access or use) the Service</li>
              <li>Any conduct or content of any third party on or related to the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your data or content</li>
              <li>
                Any decisions made or actions taken based on the results,
                scores, or information provided by the Service
              </li>
            </ul>
            <p>
              In no event shall our total aggregate liability to you for all
              claims arising out of or relating to the Service exceed the amount
              you have paid us in the twelve (12) months preceding the event
              giving rise to the claim, or $2.99 USD, whichever is greater.
            </p>
            <p>
              The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis
              without warranties of any kind, whether express or implied,
              including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement. We do not warrant that the Service will be
              uninterrupted, error-free, secure, or free of viruses or other
              harmful components.
            </p>
            <p>
              Nothing in these Terms shall exclude or limit liability that
              cannot be excluded or limited under applicable law, including
              liability for death or personal injury caused by negligence, for
              fraud or fraudulent misrepresentation, or any other liability that
              cannot be excluded under the laws of Iceland or the European
              Economic Area.
            </p>
          </section>

          {/* 10. Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless MyIQ, its
              owners, directors, employees, agents, and affiliates from and
              against any and all claims, damages, obligations, losses,
              liabilities, costs, and expenses (including but not limited to
              reasonable legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Your use of and access to the Service</li>
              <li>Your violation of any provision of these Terms</li>
              <li>
                Your violation of any third-party right, including any
                intellectual property or privacy right
              </li>
              <li>
                Any claim that your use of the Service caused damage to a third
                party
              </li>
            </ul>
            <p>
              This indemnification obligation shall survive the termination of
              these Terms and your use of the Service.
            </p>
          </section>

          {/* 11. Modifications to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              11. Modifications to Terms
            </h2>
            <p>
              We reserve the right to modify or replace these Terms at any time
              at our sole discretion. When we make material changes, we will
              update the &quot;Last updated&quot; date at the top of this page and, where
              practicable, provide notice through the Service (such as a banner
              on the website).
            </p>
            <p>
              Your continued use of the Service after any changes to the Terms
              constitutes acceptance of those changes. If you do not agree to
              the revised Terms, you must stop using the Service. We encourage
              you to review these Terms periodically.
            </p>
            <p>
              For changes that materially affect your rights or obligations, we
              will make reasonable efforts to provide at least 30 days&apos; notice
              before the new Terms take effect.
            </p>
          </section>

          {/* 12. Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              12. Termination
            </h2>
            <p>
              Since the Service does not require account registration, the
              concept of termination applies as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white">By you:</strong> You may stop
                using the Service at any time. No formal cancellation process is
                required.
              </li>
              <li>
                <strong className="text-white">By us:</strong> We may restrict
                or terminate access to the Service (including invalidating
                session links) at our sole discretion, without prior notice, for
                any reason, including but not limited to a breach of these Terms.
              </li>
            </ul>
            <p>
              Upon termination, your right to use the Service ceases
              immediately. We may, but are not obligated to, retain your test
              data and results for a reasonable period. If you have purchased
              results and your access is terminated due to our action (and not
              due to your breach of these Terms), you may be eligible for a
              refund at our discretion.
            </p>
            <p>
              All provisions of these Terms that by their nature should survive
              termination shall survive, including but not limited to
              intellectual property provisions, disclaimers, limitations of
              liability, and indemnification.
            </p>
          </section>

          {/* 13. Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              13. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of Iceland, without regard to its conflict of law
              provisions.
            </p>
            <p>
              As MyIQ is operated from Iceland, a member state of the European
              Economic Area (EEA), users located within the EEA retain all
              rights afforded to them under applicable European Union and EEA
              regulations, including but not limited to the General Data
              Protection Regulation (GDPR), the Consumer Rights Directive, and
              any applicable national implementing legislation. Nothing in these
              Terms shall limit any rights you may have under mandatory consumer
              protection laws of your country of residence.
            </p>
          </section>

          {/* 14. Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              14. Dispute Resolution
            </h2>
            <p>
              We encourage you to contact us first at{' '}
              <a
                href="mailto:support@myiq.is"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                support@myiq.is
              </a>{' '}
              to resolve any disputes informally. We will make reasonable
              efforts to address your concerns promptly and in good faith.
            </p>
            <p>
              If informal resolution is not successful, any dispute, claim, or
              controversy arising out of or relating to these Terms or the
              Service shall be subject to the exclusive jurisdiction of the
              courts of Iceland, unless mandatory applicable law provides
              otherwise.
            </p>
            <p>
              <strong className="text-white">European Union residents:</strong>{' '}
              If you are a consumer in the EU/EEA, you may also be entitled to
              submit a dispute to the Online Dispute Resolution (ODR) platform
              provided by the European Commission at{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              . You may also have the right to bring proceedings in the courts of
              your country of residence in accordance with applicable consumer
              protection legislation.
            </p>
          </section>

          {/* 15. Severability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              15. Severability
            </h2>
            <p>
              If any provision of these Terms is held to be invalid, illegal, or
              unenforceable by a court of competent jurisdiction, such provision
              shall be modified to the minimum extent necessary to make it
              valid, legal, and enforceable while preserving its original intent.
              If modification is not possible, the provision shall be severed
              from these Terms. The invalidity or unenforceability of any
              provision shall not affect the validity or enforceability of the
              remaining provisions, which shall continue in full force and
              effect.
            </p>
          </section>

          {/* 16. Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              16. Contact Information
            </h2>
            <p>
              If you have any questions, concerns, or feedback regarding these
              Terms of Service, please contact us:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mt-4">
              <ul className="space-y-3">
                <li>
                  <strong className="text-white">Email:</strong>{' '}
                  <a
                    href="mailto:support@myiq.is"
                    className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
                  >
                    support@myiq.is
                  </a>
                </li>
                <li>
                  <strong className="text-white">Website:</strong>{' '}
                  <a
                    href="https://myiq.is"
                    className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
                  >
                    myiq.is
                  </a>
                </li>
                <li>
                  <strong className="text-white">Location:</strong> Iceland
                </li>
              </ul>
            </div>
            <p className="mt-4">
              We aim to respond to all inquiries within 5 business days.
            </p>
          </section>

          {/* 17. Effective Date */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              17. Effective Date
            </h2>
            <p>
              These Terms of Service are effective as of{' '}
              <strong className="text-white">February 7, 2026</strong>. They
              apply to all users who access or use the Service on or after this
              date.
            </p>
          </section>
        </div>

        {/* Footer navigation */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
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
          <div className="flex gap-6 text-sm text-white/40">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-white/60">Terms of Service</span>
          </div>
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} MyIQ. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  )
}
