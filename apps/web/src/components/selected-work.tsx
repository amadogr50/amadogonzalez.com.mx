'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Container } from '@/components/container'

interface ProjectLink {
  label: string
  href: string
}

interface Project {
  id: string
  number: string
  tags: string[]
  links?: ProjectLink[]
  image?: string
}

const projects: Project[] = [
  {
    id: 'palacio',
    number: '01',
    tags: ['React Native', 'Expo', 'CI/CD', 'E-commerce'],
  },
  {
    id: 'blackbrulee',
    number: '02',
    tags: ['ERPNext', 'Docker', 'Traefik', 'n8n', 'Self-Hosted'],
  },
  {
    id: 'lithios',
    number: '03',
    tags: ['React Native', 'Next.js', 'TypeScript', 'Full-Stack'],
  },
]

const containerVariants = {
  enter: {},
  center: {
    transition: {
      staggerChildren: 0.07,
    },
  },
  exit: {},
}

const itemVariants = {
  enter: { opacity: 0, y: '110%' },
  center: { opacity: 1, y: '0%' },
  exit: { opacity: 0, y: '-20%' },
}

const imageVariants = {
  enter: { opacity: 0, scale: 0.96 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
}

const itemTransition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const }
const imageTransition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }

export function SelectedWork() {
  const t = useTranslations('selectedWork')
  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const project = projects[index]!

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + projects.length) % projects.length)
  }, [])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % projects.length)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [prev, next])

  function onTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0]!.clientX)
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStart === null) return
    const delta = touchStart - e.changedTouches[0]!.clientX
    if (Math.abs(delta) > 50) {
      if (delta > 0) next()
      else prev()
    }
    setTouchStart(null)
  }

  return (
    <section
      id="work"
      aria-label={t('sectionLabel')}
      className="relative border-t border-hairline py-20"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Container className="flex w-full flex-col gap-14">
        {/* Section label */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-gray-light">
          {t('sectionLabel')}
        </p>

        {/* Project viewer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20"
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Left: text */}
            <motion.div
              className="flex flex-col gap-7"
              variants={containerVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.div variants={itemVariants} transition={itemTransition}>
                <p className="font-serif text-sm tracking-[0.08em] text-sage">
                  {project.number}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} transition={itemTransition}>
                <h2 className="font-serif text-[1.9rem] font-light leading-[1.18] md:text-[2.4rem]">
                  {t(`${project.id}.title`)}
                </h2>
              </motion.div>

              <motion.div variants={itemVariants} transition={itemTransition}>
                <p className="font-serif text-[15px] italic text-stone">
                  {t(`${project.id}.meta`)}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} transition={itemTransition}>
                <p className="max-w-[60ch] text-[15px] leading-relaxed text-stone">
                  {t(`${project.id}.description`)}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} transition={itemTransition}>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="whitespace-nowrap rounded-full bg-sage px-2.5 py-1 text-[10px] uppercase tracking-wider text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {project.links && project.links.length > 0 && (
                <motion.div variants={itemVariants} transition={itemTransition}>
                  <div className="flex gap-6">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-b border-sage pb-0.5 text-xs uppercase tracking-[0.12em] text-ink transition-colors hover:text-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Right: visual */}
            <motion.div
              variants={imageVariants}
              transition={imageTransition}
              className="flex items-center justify-center"
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={t(`${project.id}.title`)}
                  className="h-auto w-full rounded-lg object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-hairline bg-cream-mid"
                >
                  <span className="font-serif text-[7rem] font-light leading-none text-sage/20">
                    {project.number}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-hairline pt-8">
          <button
            onClick={prev}
            aria-label={t('previous')}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-stone transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            {t('previous')}
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Projects">
            {projects.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={i === index}
                aria-label={`Project ${i + 1}: ${t(`${p.id}.title`)}`}
                onClick={() => setIndex(i)}
                className={`h-[3px] rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                  i === index ? 'w-7 bg-sage' : 'w-2.5 bg-hairline hover:bg-stone/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label={t('next')}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-stone transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
          >
            {t('next')}
            <ArrowRight size={13} strokeWidth={1.5} />
          </button>
        </div>
      </Container>
    </section>
  )
}
