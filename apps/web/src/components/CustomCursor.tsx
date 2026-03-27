'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | undefined>(undefined)
  const targetPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Hide native cursor
    document.documentElement.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY }
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
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    // Smooth animation loop
    const animate = () => {
      setPosition((prev) => {
        const dx = targetPosRef.current.x - prev.x
        const dy = targetPosRef.current.y - prev.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Easing: interpolate based on distance for smooth following
        const easing = Math.min(distance * 0.15, 1)

        return {
          x: prev.x + dx * easing,
          y: prev.y + dy * easing,
        }
      })

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
      className={`pointer-events-none fixed z-[9999] transition-all duration-100`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`border-2 rounded-full transition-all duration-100`}
        style={{
          borderColor: '#A3B5A6',
          width: isHovering ? '14px' : '20px',
          height: isHovering ? '14px' : '20px',
          borderWidth: isHovering ? '3px' : '2px',
        }}
      />
    </div>
  )
}
