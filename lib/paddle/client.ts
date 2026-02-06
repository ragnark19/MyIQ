declare global {
  interface Window {
    Paddle?: {
      Initialize: (options: { token: string; environment?: 'sandbox' | 'production' }) => void
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
    window.Paddle.Initialize({
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
      environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
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
