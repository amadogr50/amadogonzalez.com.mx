'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'

import { Container } from '@/components/container'

const experiences = [
  {
    id: 'lithios',
    company: 'Lithios',
    startDate: 'Jan 2021',
    endDate: 'Present',
    skills: [
      'React Native',
      'Expo',
      'React',
      'TypeScript',
      'Next.js',
      'CI/CD',
      'Code Review',
      'Mentorship',
    ],
  },
  {
    id: 'palacio',
    company: 'El Palacio de Hierro',
    startDate: 'Jun 2023',
    endDate: 'May 2025',
    skills: [
      'React Native',
      'E-Commerce',
      'CI/CD',
      'App Store Deployment',
      'Stakeholder Management',
      'Production Stability',
    ],
  },
  {
    id: 'grainchain',
    company: 'GrainChain Inc',
    startDate: 'Jan 2020',
    endDate: 'Dec 2020',
    skills: [
      'React Native',
      'Blockchain',
      'CI/CD',
      'Performance Optimization',
      'Agriculture Tech',
    ],
  },
  {
    id: 'alphawave',
    company: 'Alpha Wave Systems',
    startDate: 'Jul 2019',
    endDate: 'Dec 2019',
    skills: ['Kotlin', 'Android', 'Mobile Payments', 'CoDi', 'Native Development'],
  },
  {
    id: 'retraced',
    company: 'Retraced',
    startDate: 'Jan 2019',
    endDate: 'Dec 2019',
    skills: ['React', 'Node.js', 'Next.js', 'UI Redesign', 'Supply Chain'],
  },
  {
    id: 'nordicloop',
    company: 'nordicloop',
    startDate: 'Jan 2018',
    endDate: 'Dec 2018',
    skills: ['Kotlin', 'Java', 'Android', 'MVVM', 'Bitcoin', 'Remote'],
  },
  {
    id: 'resser',
    company: 'Resser Tecnologías',
    startDate: 'Jan 2017',
    endDate: 'Dec 2017',
    skills: ['ExtJS', 'C# .NET', 'ERP', 'Fleet Tracking', 'Backend'],
  },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    setIsMobile(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isMobile
}

function ExperienceItem({
  experience,
  index,
  isExpanded,
  onExpand,
  onCollapse,
  isMobile,
  role,
  mode,
  description,
}: {
  experience: (typeof experiences)[number]
  index: number
  isExpanded: boolean
  onExpand: (index: number) => void
  onCollapse: (index: number) => void
  isMobile: boolean
  role: string
  mode: string
  description: string
}) {
  const [contentHeight, setContentHeight] = useState(0)
  const expandedRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (expandedRef.current) {
      setContentHeight(expandedRef.current.scrollHeight)
    }
  }, [isExpanded])

  useEffect(() => {
    if (!isMobile || !itemRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onExpand(index)
        } else {
          onCollapse(index)
        }
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
    )
    observer.observe(itemRef.current)
    return () => observer.disconnect()
  }, [isMobile, index, onExpand, onCollapse])

  return (
    <div
      ref={itemRef}
      className="group relative pl-8 md:pl-10"
      onMouseEnter={() => !isMobile && onExpand(index)}
      onMouseLeave={() => !isMobile && onCollapse(index)}
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-[6px] size-2.5 rounded-full border-2 border-sage bg-cream transition-colors duration-300"
        style={{
          backgroundColor: isExpanded ? '#A3B5A6' : '#FAF8F5',
        }}
      />

      {/* Always visible content */}
      <div className="cursor-default">
        <h3 className="font-serif text-xl font-medium leading-tight text-ink">
          {role}
        </h3>
        <p className="mt-1 text-[13px] text-stone">
          {experience.company}
          <span className="mx-1.5 text-hairline">·</span>
          {mode}
        </p>
        <p className="mt-0.5 text-[12px] tracking-wide text-warm-gray-light">
          {experience.startDate} – {experience.endDate}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-stone">
          {description}
        </p>
      </div>

      {/* Expanded content — divider + skills */}
      <div
        ref={expandedRef}
        className="overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : '0px',
        }}
      >
        {/* Divider — animates width left-to-right */}
        <div
          className="mt-4 h-px bg-sage transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: isExpanded ? '100%' : '0%',
            transitionDelay: isExpanded ? '150ms' : '0ms',
          }}
        />

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-1.5 pb-1">
          {experience.skills.map((skill, i) => (
            <span
              key={skill}
              className="whitespace-nowrap rounded-full bg-sage px-2.5 py-1 text-[10px] uppercase tracking-wider text-ink transition-all duration-300"
              style={{
                transitionDelay: isExpanded ? `${200 + i * 50}ms` : '0ms',
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function WorkExperience() {
  const t = useTranslations('workExperience')
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleExpand = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const handleCollapse = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : prev))
  }, [])

  return (
    <section id="experience">
      <Container className="py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-gray-light">
        {t('sectionLabel')}
      </p>
      <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight">
        {t('heading')}
      </h2>
      <div className="mt-8 h-px w-10 bg-sage" />

      {/* Timeline */}
      <div className="relative mt-10">
        {/* Vertical timeline line */}
        <div className="absolute left-[4px] top-0 h-full w-px bg-hairline" />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <ExperienceItem
              key={`${exp.company}-${exp.startDate}`}
              experience={exp}
              index={i}
              isExpanded={activeIndex === i}
              onExpand={handleExpand}
              onCollapse={handleCollapse}
              isMobile={isMobile}
              role={t(`${exp.id}.role`)}
              mode={t(`${exp.id}.mode`)}
              description={t(`${exp.id}.description`)}
            />
          ))}
        </div>
      </div>

      {/* LinkedIn CTA */}
      <div className="mt-14 text-center">
        <a
          href="https://www.linkedin.com/in/amadogr/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ink"
        >
          <span className="btn-ink-label">{t('viewLinkedIn')}</span>
          <span className="btn-ink-label-hover">{t('viewLinkedIn')}</span>
        </a>
      </div>
      </Container>
    </section>
  )
}
