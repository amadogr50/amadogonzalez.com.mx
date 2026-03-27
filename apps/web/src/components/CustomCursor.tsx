'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetPosRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    // Hide native cursor
    document.documentElement.style.cursor = 'none'

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
      const circle = cursorRef.current.querySelector('div') as HTMLElement
      if (circle) {
        circle.style.width = isHoveringRef.current ? '14px' : '20px'
        circle.style.height = isHoveringRef.current ? '14px' : '20px'
        circle.style.borderWidth = isHoveringRef.current ? '3px' : '2px'
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
        style={{
          borderColor: '#A3B5A6',
          width: '20px',
          height: '20px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderRadius: '50%',
          transition: 'width 0.15s, height 0.15s, border-width 0.15s',
        }}
      />
    </div>
  )
}
