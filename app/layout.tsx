import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://myiq.is'),
  title: {
    default: 'MyIQ - Professional Online IQ Test | Measure Your Intelligence',
    template: '%s | MyIQ'
  },
  description: 'Take a scientifically-designed IQ test with 40 questions across pattern recognition, numerical reasoning, verbal analysis, and spatial visualization. Get your IQ score, percentile ranking, and downloadable certificate.',
  keywords: [
    'IQ test',
    'intelligence test',
    'online IQ test',
    'cognitive assessment',
    'IQ score',
    'brain test',
    'mental ability test',
    'pattern recognition test',
    'numerical reasoning',
    'verbal reasoning',
    'spatial reasoning',
    'free IQ test',
    'IQ certificate',
    'measure intelligence',
    'cognitive ability test'
  ],
  authors: [{ name: 'MyIQ' }],
  creator: 'MyIQ',
  publisher: 'MyIQ',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'MyIQ',
    title: 'MyIQ - Professional Online IQ Test | Measure Your Intelligence',
    description: 'Take a scientifically-designed IQ test with 40 questions. Get your IQ score, percentile ranking, and downloadable certificate in just 25 minutes.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyIQ - Professional IQ Test',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyIQ - Professional Online IQ Test',
    description: 'Discover your cognitive potential with our comprehensive IQ assessment. 40 questions, 4 categories, instant results.',
    images: ['/og-image.png'],
    creator: '@myiq',
  },
  alternates: {
    canonical: '/',
  },
  category: 'education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://myiq.is/#website',
        url: 'https://myiq.is',
        name: 'MyIQ',
        description: 'Professional Online IQ Test',
        publisher: {
          '@id': 'https://myiq.is/#organization'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://myiq.is/#organization',
        name: 'MyIQ',
        url: 'https://myiq.is',
        logo: {
          '@type': 'ImageObject',
          url: 'https://myiq.is/logo.png'
        },
        sameAs: []
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://myiq.is/#application',
        name: 'MyIQ IQ Test',
        url: 'https://myiq.is/test',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '2.99',
          priceCurrency: 'USD',
          description: 'Full IQ test results with certificate'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '2847',
          bestRating: '5',
          worstRating: '1'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://myiq.is/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How accurate is this IQ test?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our test is designed using principles from established psychometric assessments like the WAIS and Raven\'s Progressive Matrices. While no online test can replace a clinical assessment administered by a psychologist, our test provides a reliable estimate of cognitive ability based on your performance across four key domains.'
            }
          },
          {
            '@type': 'Question',
            name: 'How long does the IQ test take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The complete test takes approximately 25 minutes, divided into four timed sections: Pattern Recognition (8 min), Numerical Reasoning (6 min), Verbal Reasoning (6 min), and Spatial Reasoning (5 min).'
            }
          },
          {
            '@type': 'Question',
            name: 'What do I get after completing the IQ test?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'After payment of $2.99, you receive your calculated IQ score, percentile ranking compared to the general population, detailed breakdown by category, analysis of your cognitive strengths and areas for growth, and a downloadable PDF certificate with a unique verification number.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is my data secure?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. We use industry-standard encryption for all data transmission. Your test responses are stored securely and are only linked to your session. We don\'t require personal information to take the test.'
            }
          }
        ]
      }
    ]
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
