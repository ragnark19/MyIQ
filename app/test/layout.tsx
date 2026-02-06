import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start Your IQ Test - Free Online Cognitive Assessment',
  description: 'Begin your comprehensive IQ test now. 40 questions across 4 categories: pattern recognition, numerical reasoning, verbal reasoning, and spatial visualization. Takes only 25 minutes.',
  openGraph: {
    title: 'Start Your IQ Test - MyIQ',
    description: 'Take a scientifically-designed IQ test. 40 questions, 4 categories, instant results with PDF certificate.',
  },
  alternates: {
    canonical: '/test',
  },
}

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
