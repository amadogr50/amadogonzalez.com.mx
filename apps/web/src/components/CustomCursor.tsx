'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetPosRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    // Hide native cursor globally
    document.documentElement.style.cursor = 'none'
    // Also ensure body and all elements hide the cursor
    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current.x = e.clientX
      targetPosRef.current.y = e.clientY
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.role === 'button' ||
        target.role === 'link' ||
        target.classList.contains('cursor-pointer') ||
        getComputedStyle(target).cursor === 'pointer'

      if (isClickable) {
        isHoveringRef.current = true
        updateCursorStyle()
      }
    }

    const handleMouseLeave = () => {
      isHoveringRef.current = false
      updateCursorStyle()
    }

    const updateCursorStyle = () => {
      if (!cursorRef.current) return
      const circle = cursorRef.current.querySelector('[data-cursor-border]') as HTMLElement
      const inner = cursorRef.current.querySelector('[data-cursor-inner]') as HTMLElement

      if (circle) {
        circle.style.width = isHoveringRef.current ? '16px' : '28px'
        circle.style.height = isHoveringRef.current ? '16px' : '28px'
        circle.style.borderWidth = isHoveringRef.current ? '3px' : '2px'
        circle.style.borderColor = isHoveringRef.current ? '#1A1A1A' : '#A3B5A6'
      }

      if (inner) {
        inner.style.opacity = isHoveringRef.current ? '1' : '0'
      }
    }

    // Smooth animation loop
    const animate = () => {
      const dx = targetPosRef.current.x - posRef.current.x
      const dy = targetPosRef.current.y - posRef.current.y

      // Smooth easing - use a consistent lerp factor
      const lerpFactor = 0.15

      posRef.current.x += dx * lerpFactor
      posRef.current.y += dy * lerpFactor

      if (cursorRef.current) {
        cursorRef.current.style.left = `${posRef.current.x}px`
        cursorRef.current.style.top = `${posRef.current.y}px`
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    // Event listeners with delegation
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      document.documentElement.style.cursor = 'auto'
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999]"
      style={{
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        data-cursor-border
        style={{
          borderColor: '#A3B5A6',
          width: '28px',
          height: '28px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderRadius: '50%',
          transition: 'width 0.15s, height 0.15s, border-width 0.15s, border-color 0.15s',
          position: 'relative',
        }}
      >
        <div
          data-cursor-inner
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#1A1A1A',
            borderRadius: '50%',
            opacity: 0,
            transition: 'opacity 0.15s',
          }}
        />
      </div>
    </div>
  )
}
