declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, boolean | number | string>) => void
    }
  }
}

export function trackEvent(event: string, data?: Record<string, boolean | number | string>) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(event, data)
  }
}
