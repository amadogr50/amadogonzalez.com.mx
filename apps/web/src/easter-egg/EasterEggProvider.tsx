'use client'

import { usePathname } from '@/i18n/routing'
import { Suspense, lazy, useCallback, useState } from 'react'

import { useIdleHint } from './hooks/useIdleHint'
import { useKonamiCode } from './hooks/useKonamiCode'
import { useShake } from './hooks/useShake'

const HintModal = lazy(() =>
  import('./components/HintModal').then((m) => ({ default: m.HintModal })),
)
const MobileController = lazy(() =>
  import('./components/MobileController').then((m) => ({
    default: m.MobileController,
  })),
)
const GlitchTransition = lazy(() =>
  import('./components/GlitchTransition').then((m) => ({
    default: m.GlitchTransition,
  })),
)
const DoomOverlay = lazy(() =>
  import('./components/DoomOverlay').then((m) => ({ default: m.DoomOverlay })),
)

type Phase =
  | 'awaitingCode'
  | 'awaitingShake'
  | 'controllerVisible'
  | 'doomActive'
  | 'glitching'
  | 'hintShown'
  | 'idle'

export function EasterEggProvider() {
  const [phase, setPhase] = useState<Phase>('idle')
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isMobile = typeof window !== 'undefined' && 'ontouchstart' in window

  const handleKonamiMatch = useCallback(() => {
    setPhase('glitching')
  }, [])

  const { feedInput, reset: resetKonami } = useKonamiCode(
    handleKonamiMatch,
    phase === 'awaitingCode' || phase === 'controllerVisible',
  )

  useIdleHint(
    useCallback(() => setPhase('hintShown'), []),
    isHome && phase === 'idle',
  )

  useShake(
    useCallback(() => {
      if (phase === 'awaitingShake') setPhase('controllerVisible')
    }, [phase]),
    phase === 'awaitingShake',
  )

  const handleClose = useCallback(() => {
    resetKonami()
    setPhase('idle')
  }, [resetKonami])

  const handleHintDismiss = useCallback(() => {
    if (isMobile) {
      setPhase('awaitingShake')
    } else {
      setPhase('awaitingCode')
    }
  }, [isMobile])

  const handleGlitchComplete = useCallback(() => {
    setPhase('doomActive')
  }, [])

  return (
    <Suspense fallback={null}>
      {phase === 'hintShown' && (
        <HintModal isMobile={isMobile} onDismiss={handleHintDismiss} />
      )}
      {phase === 'controllerVisible' && (
        <MobileController onInput={feedInput} />
      )}
      {phase === 'glitching' && (
        <GlitchTransition onComplete={handleGlitchComplete} />
      )}
      {phase === 'doomActive' && <DoomOverlay onClose={handleClose} />}
    </Suspense>
  )
}
