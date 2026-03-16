'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface HintModalProps {
  isMobile: boolean
  onDismiss: () => void
}

export function HintModal({ isMobile, onDismiss }: HintModalProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onDismiss()
    }, 8000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  const handleDismiss = () => {
    setVisible(false)
    onDismiss()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          onClick={handleDismiss}
          transition={{ duration: 0.4 }}
        >
          <div className="rounded-lg border border-green-500/30 bg-black/90 px-8 py-6 text-center shadow-lg shadow-green-500/10 backdrop-blur-sm">
            {isMobile ? (
              <>
                <p className="font-mono text-sm text-green-400">
                  Hidden level detected.
                </p>
                <p className="mt-2 font-mono text-xs text-green-400/70">
                  Try shaking your device.
                </p>
              </>
            ) : (
              <>
                <p className="font-mono text-sm text-green-400">
                  Do you remember the code?
                </p>
                <p className="mt-3 font-mono text-xs tracking-widest text-green-400/50">
                  ↑ ↑ ↓ ↓ ← → ← → B A
                </p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
