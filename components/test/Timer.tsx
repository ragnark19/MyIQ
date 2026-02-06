'use client'

interface TimerProps {
  timeLeft: number
  totalTime: number
  formattedTime: string
}

export default function Timer({ timeLeft, totalTime, formattedTime }: TimerProps) {
  const percentage = (timeLeft / totalTime) * 100
  const isLow = percentage < 20
  const isCritical = percentage < 10

  return (
    <div className="flex items-center gap-3">
      {/* Timer ring */}
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14 transform -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={150.8}
            strokeDashoffset={150.8 * (1 - percentage / 100)}
            className={`transition-all duration-1000 ${
              isCritical ? 'text-red-500' : isLow ? 'text-yellow-500' : 'text-primary-500'
            }`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className={`w-5 h-5 ${isCritical ? 'text-red-500' : isLow ? 'text-yellow-500' : 'text-primary-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Time display */}
      <div>
        <div className={`text-2xl font-bold tabular-nums ${
          isCritical ? 'text-red-600 animate-pulse' : isLow ? 'text-yellow-600' : 'text-gray-900'
        }`}>
          {formattedTime}
        </div>
        <div className="text-xs text-gray-500">remaining</div>
      </div>
    </div>
  )
}
