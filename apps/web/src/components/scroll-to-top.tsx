'use client'

import { useEffect, useState } from 'react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const clientHeight = window.innerHeight
      const remaining = scrollHeight - scrollTop - clientHeight
      setVisible(remaining < 600)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      aria-label="Scroll to top"
      className="absolute bottom-10 right-0 mr-6 md:mr-12 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink shadow-lg transition-all duration-300 hover:opacity-80"
      onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 16 16"
        width="16"
      >
        <path d="M8 14V2M2 7l6-5 6 5" />
      </svg>
    </button>
  )
}
