declare global {
  interface Window {
    Paddle?: {
      Environment: { set: (env: 'sandbox' | 'production') => void }
      Initialize: (options: { token: string }) => void
      Checkout: {
        open: (options: {
          items: { priceId: string; quantity: number }[]
          customData?: Record<string, string>
          customer?: { email?: string }
          successCallback?: (data: any) => void
          closeCallback?: () => void
        }) => void
      }
    }
  }
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

export function openCheckout({
  sessionId,
  email,
  onSuccess,
  onClose
}: {
  sessionId: string
  email: string
  onSuccess?: (data: any) => void
  onClose?: () => void
}) {
  if (typeof window !== 'undefined' && window.Paddle) {
    window.Paddle.Checkout.open({
      items: [
        {
          priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!,
          quantity: 1
        }
      ],
      customData: {
        sessionId
      },
      customer: {
        email
      },
      successCallback: onSuccess,
      closeCallback: onClose
    })
  }
}
