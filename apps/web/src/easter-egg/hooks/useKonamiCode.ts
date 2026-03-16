'use client'

import { useCallback, useEffect, useRef } from 'react'

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
] as const

export function useKonamiCode(onMatch: () => void, enabled = true) {
  const bufferRef = useRef<string[]>([])
  const onMatchRef = useRef(onMatch)
  onMatchRef.current = onMatch

  const checkMatch = useCallback(() => {
    const buffer = bufferRef.current
    if (buffer.length < KONAMI_SEQUENCE.length) return false
    const recent = buffer.slice(-KONAMI_SEQUENCE.length)
    return KONAMI_SEQUENCE.every((key, i) => recent[i] === key)
  }, [])

  const feedInput = useCallback(
    (key: string) => {
      if (!enabled) return
      bufferRef.current.push(key)
      if (bufferRef.current.length > KONAMI_SEQUENCE.length) {
        bufferRef.current = bufferRef.current.slice(-KONAMI_SEQUENCE.length)
      }
      if (checkMatch()) {
        bufferRef.current = []
        onMatchRef.current()
      }
    },
    [enabled, checkMatch],
  )

  const reset = useCallback(() => {
    bufferRef.current = []
  }, [])

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      feedInput(e.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, feedInput])

  return { feedInput, reset }
}
