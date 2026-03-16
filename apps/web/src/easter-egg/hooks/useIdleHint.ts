'use client'

import { useEffect, useRef } from 'react'

const IDLE_TIMEOUT = 60_000

export function useIdleHint(onIdle: () => void, enabled = true) {
  const onIdleRef = useRef(onIdle)
  onIdleRef.current = onIdle

  useEffect(() => {
    if (!enabled) return

    let timer = setTimeout(() => onIdleRef.current(), IDLE_TIMEOUT)

    const reset = () => {
      clearTimeout(timer)
      timer = setTimeout(() => onIdleRef.current(), IDLE_TIMEOUT)
    }

    const events = ['mousemove', 'keydown', 'scroll', 'touchstart'] as const
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }))

    return () => {
      clearTimeout(timer)
      events.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [enabled])
}
