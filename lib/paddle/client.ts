declare global {
  interface Window {
    Paddle?: {
      Environment: { set: (env: 'sandbox' | 'production') => void }
      Initialize: (options: {
        token: string
        eventCallback?: (event: PaddleEvent) => void
      }) => void
      Checkout: {
        open: (options: {
          items: { priceId: string; quantity: number }[]
          customData?: Record<string, string>
          customer?: { email?: string }
        }) => void
      }
    }
  }
}

export interface PaddleEvent {
  name: string
  data?: any
}

export function initializePaddle() {
  if (typeof window !== 'undefined' && window.Paddle) {
    if (process.env.NODE_ENV !== 'production') {
      window.Paddle.Environment.set('sandbox')
    }
    window.Paddle.Initialize({
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!
    })
  }
}
