'use client'

import Card from '@/components/ui/Card'

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: 'Pattern Recognition',
    description: 'Analyze visual matrices and identify logical patterns in sequences. Tests your fluid intelligence and abstract reasoning.',
    questions: 12,
    time: '8 min'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Numerical Reasoning',
    description: 'Solve number sequences and mathematical logic problems. Measures your quantitative reasoning abilities.',
    questions: 10,
    time: '6 min'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    title: 'Verbal Reasoning',
    description: 'Navigate word relationships and analogies. Evaluates your crystallized intelligence and vocabulary depth.',
    questions: 10,
    time: '6 min'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
    title: 'Spatial Reasoning',
    description: 'Visualize 3D rotations and mental transformations. Assesses your ability to manipulate objects mentally.',
    questions: 8,
    time: '5 min'
  }
]

export default function Features() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Cognitive Assessment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our test evaluates four key dimensions of intelligence, providing a
            complete picture of your cognitive abilities.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              variant="elevated"
              className="group hover:border-primary-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex gap-4 text-sm">
                    <span className="inline-flex items-center gap-1 text-primary-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {feature.questions} questions
                    </span>
                    <span className="inline-flex items-center gap-1 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {feature.time}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Total summary */}
        <div className="mt-12 text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <span className="text-3xl font-bold text-primary-600">40</span>
              <span className="text-gray-600 ml-2">Total Questions</span>
            </div>
            <div className="hidden sm:block w-px bg-gray-200" />
            <div>
              <span className="text-3xl font-bold text-primary-600">~25</span>
              <span className="text-gray-600 ml-2">Minutes</span>
            </div>
            <div className="hidden sm:block w-px bg-gray-200" />
            <div>
              <span className="text-3xl font-bold text-primary-600">Instant</span>
              <span className="text-gray-600 ml-2">Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
