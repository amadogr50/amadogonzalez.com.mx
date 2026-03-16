'use client'

import { useEffect, useRef } from 'react'

const SHAKE_THRESHOLD = 35
const DEBOUNCE_MS = 1000

interface DeviceMotionEventWithPermission extends DeviceMotionEvent {
  requestPermission?: () => Promise<'denied' | 'granted'>
}

export function useShake(onShake: () => void, enabled = true) {
  const onShakeRef = useRef(onShake)
  onShakeRef.current = onShake
  const lastShakeRef = useRef(0)

  useEffect(() => {
    if (!enabled) return

    const handler = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity
      if (!acc) return

      const magnitude =
        Math.abs(acc.x ?? 0) + Math.abs(acc.y ?? 0) + Math.abs(acc.z ?? 0)

      if (magnitude > SHAKE_THRESHOLD) {
        const now = Date.now()
        if (now - lastShakeRef.current > DEBOUNCE_MS) {
          lastShakeRef.current = now
          onShakeRef.current()
        }
      }
    }

    const start = () => {
      window.addEventListener('devicemotion', handler)
    }

    const DME = DeviceMotionEvent as unknown as DeviceMotionEventWithPermission
    if (typeof DME.requestPermission === 'function') {
      DME.requestPermission().then((perm) => {
        if (perm === 'granted') start()
      })
    } else {
      start()
    }

    return () => {
      window.removeEventListener('devicemotion', handler)
    }
  }, [enabled])
}
