'use client'

import { motion } from 'framer-motion'

interface MobileControllerProps {
  onInput: (key: string) => void
}

function DpadButton({
  className,
  label,
  onInput,
  value,
}: {
  className?: string
  label: string
  onInput: (key: string) => void
  value: string
}) {
  return (
    <button
      className={`flex h-14 w-14 items-center justify-center rounded-md bg-white/10 text-xl text-white active:bg-white/30 ${className ?? ''}`}
      onTouchStart={(e) => {
        e.preventDefault()
        onInput(value)
      }}
      type="button"
    >
      {label}
    </button>
  )
}

function ActionButton({
  label,
  onInput,
  value,
}: {
  label: string
  onInput: (key: string) => void
  value: string
}) {
  return (
    <button
      className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/60 font-mono text-lg font-bold text-white active:bg-red-600/90"
      onTouchStart={(e) => {
        e.preventDefault()
        onInput(value)
      }}
      type="button"
    >
      {label}
    </button>
  )
}

export function MobileController({ onInput }: MobileControllerProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-x-0 bottom-0 z-[9998] flex items-end justify-between px-8 pb-12"
      initial={{ opacity: 0, y: 100 }}
      transition={{ damping: 20, stiffness: 200, type: 'spring' }}
    >
      {/* D-pad */}
      <div className="grid grid-cols-3 grid-rows-3 gap-1">
        <div />
        <DpadButton label="↑" onInput={onInput} value="ArrowUp" />
        <div />
        <DpadButton label="←" onInput={onInput} value="ArrowLeft" />
        <div />
        <DpadButton label="→" onInput={onInput} value="ArrowRight" />
        <div />
        <DpadButton label="↓" onInput={onInput} value="ArrowDown" />
        <div />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-4">
        <ActionButton label="B" onInput={onInput} value="b" />
        <ActionButton label="A" onInput={onInput} value="a" />
      </div>
    </motion.div>
  )
}
