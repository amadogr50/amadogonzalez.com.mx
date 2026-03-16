'use client'

import { Suspense, lazy, useEffect } from 'react'

const DoomCanvas = lazy(() =>
  import('./DoomCanvas').then((m) => ({ default: m.DoomCanvas })),
)
const CRTOverlay = lazy(() =>
  import('./CRTOverlay').then((m) => ({ default: m.CRTOverlay })),
)

interface DoomOverlayProps {
  onClose: () => void
}

export function DoomOverlay({ onClose }: DoomOverlayProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <p className="font-mono text-sm text-green-400">Loading...</p>
          </div>
        }
      >
        <DoomCanvas />
        <CRTOverlay />
      </Suspense>
      <button
        className="absolute right-4 top-4 z-[10000] font-mono text-sm text-white/50 hover:text-white"
        onClick={onClose}
        type="button"
      >
        [ESC]
      </button>
    </div>
  )
}
