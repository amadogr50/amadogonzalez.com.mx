'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

const links = [
  { href: '/#work', label: 'Selected Work' },
  { href: '/about', label: 'About' },
  { href: '/#experience', label: 'Work Experience' },
  { href: '/#stack', label: 'Tech Stack' },
  { href: '/#blog', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
]

const NAV_HEIGHT = 64 // px — matches h-16

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showText, setShowText] = useState(false)
  const lastScrollY = useRef(0)
  const textTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-hide on scroll — disabled while menu is open
  useEffect(() => {
    function onScroll() {
      if (menuOpen) return
      const y = window.scrollY
      setHidden(y > lastScrollY.current && y > 80)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (textTimer.current) clearTimeout(textTimer.current)
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  const handleClose = useCallback(() => {
    if (textTimer.current) clearTimeout(textTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    // 1. Hide text first
    setShowText(false)
    // 2. Then collapse sheet
    closeTimer.current = setTimeout(() => {
      setMenuOpen(false)
      lastScrollY.current = window.scrollY
    }, 280)
  }, [])

  const handleOpen = useCallback(() => {
    if (textTimer.current) clearTimeout(textTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setHidden(false)
    setMenuOpen(true)
    // 1. Sheet expands first, then reveal text
    textTimer.current = setTimeout(() => setShowText(true), 400)
  }, [])

  // Escape key closes menu
  useEffect(() => {
    if (!menuOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, handleClose])

  return (
    <>
      {/* Spacer — keeps content below the fixed nav bar */}
      <div style={{ height: NAV_HEIGHT }} aria-hidden="true" />

      {/* Fixed wrapper: nav bar + sheet */}
      <div
        className="fixed inset-x-0 top-0 z-50 transition-transform duration-300"
        style={{
          transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        {/* Nav bar */}
        <div
          className="flex items-center justify-between bg-cream px-6 md:px-12"
          style={{ height: NAV_HEIGHT }}
        >
          <Link onClick={handleClose} href="/" className="font-serif text-xl font-medium text-ink">
            Amado González
          </Link>

          {/* Hamburger / X button */}
          <button
            onClick={() => (menuOpen ? handleClose() : handleOpen())}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="-mr-2 flex h-10 w-10 items-center justify-center"
          >
            <div className="relative flex h-4 w-5 flex-col justify-between">
              <span
                className="block h-px w-full origin-center bg-ink transition-transform duration-300"
                style={{
                  transform: menuOpen
                    ? 'translateY(7.5px) rotate(45deg)'
                    : 'translateY(0) rotate(0deg)',
                }}
              />
              <span
                className="block h-px w-full bg-ink transition-opacity duration-200"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-px w-full origin-center bg-ink transition-transform duration-300"
                style={{
                  transform: menuOpen
                    ? 'translateY(-7.5px) rotate(-45deg)'
                    : 'translateY(0) rotate(0deg)',
                }}
              />
            </div>
          </button>
        </div>

        {/* Full-screen menu sheet */}
        <div
          className="overflow-hidden bg-sage"
          style={{
            height: menuOpen ? `calc(100vh - ${NAV_HEIGHT}px)` : 0,
            transition: menuOpen
              ? 'height 480ms cubic-bezier(0.16, 1, 0.3, 1)'
              : 'height 380ms cubic-bezier(0.4, 0, 1, 1)',
          }}
        >
          <div className="flex h-full flex-col px-6 pb-10 pt-6 md:px-12">
            {/* Navigation links */}
            <nav className="flex flex-1 flex-col justify-center gap-3">
              {links.map((link, i) => (
                <div
                  key={link.href}
                  style={{ overflow: 'hidden' }}
                >
                  <Link
                    href={link.href}
                    onClick={handleClose}
                    tabIndex={menuOpen ? 0 : -1}
                    className="group inline-block"
                    style={{
                      transform: showText ? 'translateY(0)' : 'translateY(110%)',
                      transition: showText
                        ? `transform 650ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 70}ms`
                        : `transform 220ms cubic-bezier(0.4, 0, 1, 1) ${(links.length - 1 - i) * 30}ms`,
                    }}
                  >
                    {/* Text roll-up hover effect */}
                    <div className="relative overflow-hidden">
                      {/* Default — exits upward on hover */}
                      <span className="block font-serif text-4xl leading-[1.15] text-ink transition-transform duration-[350ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-full md:text-5xl lg:text-6xl">
                        {link.label}
                      </span>
                      {/* Duplicate — enters from below on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 block translate-y-full font-serif text-4xl leading-[1.15] text-ink transition-transform duration-[350ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0 md:text-5xl lg:text-6xl"
                      >
                        {link.label}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </nav>

            {/* Bottom section: Language toggle & Social icons */}
            <div className="flex items-center justify-between">
              {/* Language toggle — bottom left */}
              {/* <button
                tabIndex={menuOpen ? 0 : -1}
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-ink"
              >
                <span className="border-b border-ink pb-px">EN</span>
                <span className="mx-1.5 text-stone">/</span>
                <span className="text-stone">ES</span>
              </button> */}

              {/* Social icons — bottom right */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/amadogr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={menuOpen ? 0 : -1}
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center transition-colors duration-200 hover:text-stone focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/amadogr50"
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={menuOpen ? 0 : -1}
                  aria-label="GitHub"
                  className="flex h-8 w-8 items-center justify-center transition-colors duration-200 hover:text-stone focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
