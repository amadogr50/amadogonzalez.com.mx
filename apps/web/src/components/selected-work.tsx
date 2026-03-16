'use client'

import { Container } from '@/components/container'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'

interface ProjectLink {
  href: string
  label: string
}

interface Project {
  id: string
  image?: string
  links?: ProjectLink[]
  number: string
  tags: string[]
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
  center: {
    transition: {
      staggerChildren: 0.07,
    },
  },
  enter: {},
  exit: {},
}

const itemVariants = {
  center: { opacity: 1, y: '0%' },
  enter: { opacity: 0, y: '110%' },
  exit: { opacity: 0, y: '-20%' },
}

const imageVariants = {
  center: { opacity: 1, scale: 1 },
  enter: { opacity: 0, scale: 0.96 },
  exit: { opacity: 0, scale: 1.02 },
}

const itemTransition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const }
const imageTransition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }

export function SelectedWork() {
  const t = useTranslations('selectedWork')
  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<null | number>(null)

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
      aria-label={t('sectionLabel')}
      className="relative border-t border-hairline py-20"
      id="work"
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
    >
      <Container className="flex w-full flex-col gap-14">
        {/* Section label */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-gray-light">
          {t('sectionLabel')}
        </p>

        {/* Project viewer */}
        <AnimatePresence mode="wait">
          <motion.div
            animate="center"
            className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20"
            exit="exit"
            initial="enter"
            key={project.id}
          >
            {/* Left: text */}
            <motion.div
              animate="center"
              className="flex flex-col gap-7"
              exit="exit"
              initial="enter"
              variants={containerVariants}
            >
              <motion.div transition={itemTransition} variants={itemVariants}>
                <p className="font-serif text-sm tracking-[0.08em] text-sage">
                  {project.number}
                </p>
              </motion.div>

              <motion.div transition={itemTransition} variants={itemVariants}>
                <h2 className="font-serif text-[1.9rem] font-light leading-[1.18] md:text-[2.4rem]">
                  {t(`${project.id}.title`)}
                </h2>
              </motion.div>

              <motion.div transition={itemTransition} variants={itemVariants}>
                <p className="font-serif text-[15px] italic text-stone">
                  {t(`${project.id}.meta`)}
                </p>
              </motion.div>

              <motion.div transition={itemTransition} variants={itemVariants}>
                <p className="max-w-[60ch] text-[15px] leading-relaxed text-stone">
                  {t(`${project.id}.description`)}
                </p>
              </motion.div>

              <motion.div transition={itemTransition} variants={itemVariants}>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      className="whitespace-nowrap rounded-full bg-sage px-2.5 py-1 text-[10px] uppercase tracking-wider text-ink"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {project.links && project.links.length > 0 && (
                <motion.div transition={itemTransition} variants={itemVariants}>
                  <div className="flex gap-6">
                    {project.links.map((link) => (
                      <a
                        className="border-b border-sage pb-0.5 text-xs uppercase tracking-[0.12em] text-ink transition-colors hover:text-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                        href={link.href}
                        key={link.label}
                        rel="noopener noreferrer"
                        target="_blank"
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
              className="flex items-center justify-center"
              transition={imageTransition}
              variants={imageVariants}
            >
              {project.image ? (
                <img
                  alt={t(`${project.id}.title`)}
                  className="h-auto w-full rounded-lg object-cover"
                  src={project.image}
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
            aria-label={t('previous')}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-stone transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
            onClick={prev}
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            {t('previous')}
          </button>

          <div aria-label="Projects" className="flex items-center gap-2" role="tablist">
            {projects.map((p, i) => (
              <button
                aria-label={`Project ${i + 1}: ${t(`${p.id}.title`)}`}
                aria-selected={i === index}
                className={`h-[3px] rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                  i === index ? 'w-7 bg-sage' : 'w-2.5 bg-hairline hover:bg-stone/40'
                }`}
                key={p.id}
                onClick={() => setIndex(i)}
                role="tab"
              />
            ))}
          </div>

          <button
            aria-label={t('next')}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-stone transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
            onClick={next}
          >
            {t('next')}
            <ArrowRight size={13} strokeWidth={1.5} />
          </button>
        </div>
      </Container>
    </section>
  )
}
