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
    image: '/images/projects/palacio.jpg',
    links: [
      {
        href: 'https://play.google.com/store/apps/details?id=com.eph.superapp',
        label: 'Google Play',
      },
      {
        href: 'https://apps.apple.com/co/app/el-palacio-de-hierro/id6449685817',
        label: 'App Store',
      },
    ],
    number: '01',
    tags: ['React Native', 'Expo', 'CI/CD', 'E-commerce'],
  },
  {
    id: 'blackbrulee',
    image: '/images/projects/blackbrulee.jpg',
    number: '02',
    tags: ['ERPNext', 'Docker', 'Traefik', 'n8n', 'Self-Hosted'],
  },
  {
    id: 'lithios',
    image: '/images/projects/lithios.jpg',
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
      className="border-hairline relative border-t py-20"
      id="work"
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
    >
      <Container className="flex w-full flex-col gap-14">
        {/* Section label */}
        <p className="text-warm-gray-light text-xs font-extrabold tracking-widest uppercase">
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
                <p className="text-sage font-serif font-extrabold text-3xl tracking-wider">
                  {project.number}
                </p>
              </motion.div>

              <motion.div transition={itemTransition} variants={itemVariants}>
                <h2 className="font-serif text-[1.9rem] leading-[1.18] font-light md:text-[2.4rem]">
                  {t(`${project.id}.title`)}
                </h2>
              </motion.div>

              <motion.div transition={itemTransition} variants={itemVariants}>
                <p className="text-stone font-serif text-[15px] italic">
                  {t(`${project.id}.meta`)}
                </p>
              </motion.div>

              <motion.div transition={itemTransition} variants={itemVariants}>
                <p className="drop-cap text-stone max-w-[60ch] text-[15px] leading-relaxed">
                  {t(`${project.id}.description`)}
                </p>
              </motion.div>

              <motion.div transition={itemTransition} variants={itemVariants}>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      className="bg-sage text-ink rounded-full px-2.5 py-1 text-[10px] tracking-wider whitespace-nowrap uppercase"
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
                        className="border-sage text-ink hover:text-sage focus-visible:ring-sage border-b pb-0.5 text-xs tracking-[0.12em] uppercase transition-colors focus-visible:ring-2 focus-visible:outline-none"
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
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <img
                    alt={t(`${project.id}.title`)}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    src={project.image}
                  />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="border-hairline bg-cream-mid flex aspect-[4/3] w-full items-center justify-center rounded-lg border"
                >
                  <span className="text-sage/20 font-serif text-[7rem] leading-none font-light">
                    {project.number}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="border-hairline flex items-center justify-between border-t pt-8">
          <button
            aria-label={t('previous')}
            className="text-stone hover:text-ink focus-visible:ring-sage flex items-center gap-2 text-xs tracking-[0.12em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            onClick={prev}
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            {t('previous')}
          </button>

          <div
            aria-label="Projects"
            className="flex items-center gap-2"
            role="tablist"
          >
            {projects.map((p, i) => (
              <button
                aria-label={`Project ${i + 1}: ${t(`${p.id}.title`)}`}
                aria-selected={i === index}
                className={`focus-visible:ring-sage h-[3px] rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:outline-none ${
                  i === index
                    ? 'bg-sage w-7'
                    : 'bg-hairline hover:bg-stone/40 w-2.5'
                }`}
                key={p.id}
                onClick={() => setIndex(i)}
                role="tab"
              />
            ))}
          </div>

          <button
            aria-label={t('next')}
            className="text-stone hover:text-ink focus-visible:ring-sage flex items-center gap-2 text-xs tracking-[0.12em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
