'use client'

interface StrengthsWeaknessesProps {
  strengths: string[]
  weaknesses: string[]
}

export default function StrengthsWeaknesses({ strengths, weaknesses }: StrengthsWeaknessesProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Strengths */}
      <div className="bg-green-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-900">Strengths</h3>
        </div>
        <ul className="space-y-2">
          {strengths.map((strength) => (
            <li key={strength} className="flex items-center gap-2 text-green-800">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {strength}
            </li>
          ))}
        </ul>
        <p className="text-sm text-green-700 mt-4">
          You demonstrated strong performance in these areas. Consider careers or activities that leverage these abilities.
        </p>
      </div>

      {/* Weaknesses */}
      <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-amber-900">Areas for Growth</h3>
        </div>
        <ul className="space-y-2">
          {weaknesses.map((weakness) => (
            <li key={weakness} className="flex items-center gap-2 text-amber-800">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              {weakness}
            </li>
          ))}
        </ul>
        <p className="text-sm text-amber-700 mt-4">
          These areas offer opportunity for improvement. Targeted practice can help strengthen these cognitive skills.
        </p>
      </div>
    </div>
  )
}
