'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    Module?: Record<string, unknown>
  }
}

export function DoomCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    window.Module = {
      canvas,
      noInitialRun: false,
      postRun: [],
      preRun: [],
      print: () => {},
      printErr: () => {},
    }

    const script = document.createElement('script')
    script.src = '/doom/doom.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      script.remove()
      delete window.Module
    }
  }, [])

  return (
    <canvas
      className="h-full w-full"
      id="doom-canvas"
      ref={canvasRef}
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
