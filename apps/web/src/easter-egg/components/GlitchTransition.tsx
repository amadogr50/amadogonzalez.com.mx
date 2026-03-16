'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface GlitchTransitionProps {
  onComplete: () => void
}

export function GlitchTransition({ onComplete }: GlitchTransitionProps) {
  useEffect(() => {
    const audio = new Audio('/doom/secret.mp3')
    audio.play().catch(() => {})

    const timer = setTimeout(onComplete, 1000)
    return () => {
      clearTimeout(timer)
      audio.pause()
    }
  }, [onComplete])

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999]"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <div
        className="h-full w-full bg-black"
        style={{
          animation: 'glitch-tear 0.1s steps(4) infinite, glitch-hue 0.15s infinite',
        }}
      />
      <style>{`
        @keyframes glitch-tear {
          0% { clip-path: inset(0 0 85% 0); }
          25% { clip-path: inset(20% 0 60% 0); }
          50% { clip-path: inset(50% 0 20% 0); }
          75% { clip-path: inset(70% 0 5% 0); }
          100% { clip-path: inset(10% 0 40% 0); }
        }
        @keyframes glitch-hue {
          0% { filter: hue-rotate(0deg); background: #0f0; }
          25% { filter: hue-rotate(90deg); background: #f00; }
          50% { filter: hue-rotate(180deg); background: #00f; }
          75% { filter: hue-rotate(270deg); background: #ff0; }
          100% { filter: hue-rotate(360deg); background: #0f0; }
        }
      `}</style>
    </motion.div>
  )
}
