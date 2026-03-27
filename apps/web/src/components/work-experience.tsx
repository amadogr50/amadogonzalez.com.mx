'use client'

import { Container } from '@/components/container'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'

const experiences = [
  {
    company: 'Lithios',
    endDate: 'Present',
    id: 'lithios',
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
    startDate: 'Jan 2021',
  },
  {
    company: 'El Palacio de Hierro',
    endDate: 'May 2025',
    id: 'palacio',
    skills: [
      'React Native',
      'E-Commerce',
      'CI/CD',
      'App Store Deployment',
      'Stakeholder Management',
      'Production Stability',
    ],
    startDate: 'Jun 2023',
  },
  {
    company: 'GrainChain Inc',
    endDate: 'Dec 2020',
    id: 'grainchain',
    skills: [
      'React Native',
      'Blockchain',
      'CI/CD',
      'Performance Optimization',
      'Agriculture Tech',
    ],
    startDate: 'Jan 2020',
  },
  {
    company: 'Alpha Wave Systems',
    endDate: 'Dec 2019',
    id: 'alphawave',
    skills: ['Kotlin', 'Android', 'Mobile Payments', 'CoDi', 'Native Development'],
    startDate: 'Jul 2019',
  },
  {
    company: 'Retraced',
    endDate: 'Dec 2019',
    id: 'retraced',
    skills: ['React', 'Node.js', 'Next.js', 'UI Redesign', 'Supply Chain'],
    startDate: 'Jan 2019',
  },
  {
    company: 'nordicloop',
    endDate: 'Dec 2018',
    id: 'nordicloop',
    skills: ['Kotlin', 'Java', 'Android', 'MVVM', 'Bitcoin', 'Remote'],
    startDate: 'Jan 2018',
  },
  {
    company: 'Resser Tecnologías',
    endDate: 'Dec 2017',
    id: 'resser',
    skills: ['ExtJS', 'C# .NET', 'ERP', 'Fleet Tracking', 'Backend'],
    startDate: 'Jan 2017',
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
  description,
  experience,
  index,
  isExpanded,
  isMobile,
  mode,
  onCollapse,
  onExpand,
  role,
}: {
  description: string
  experience: (typeof experiences)[number]
  index: number
  isExpanded: boolean
  isMobile: boolean
  mode: string
  onCollapse: (index: number) => void
  onExpand: (index: number) => void
  role: string
}) {
  const itemRef = useRef<HTMLDivElement>(null)

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
      className="group relative pl-8 md:pl-10"
      onMouseEnter={() => !isMobile && onExpand(index)}
      onMouseLeave={() => !isMobile && onCollapse(index)}
      ref={itemRef}
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
        <p className="drop-cap mt-3 text-sm leading-relaxed text-stone">
          {description}
        </p>
      </div>

      {/* Divider + skills — always visible */}
      <div>
        <div className="mt-4 h-px w-full bg-sage" />

        <div className="mt-4 flex flex-wrap gap-1.5 pb-1">
          {experience.skills.map((skill, i) => (
            <span
              className="skill-badge whitespace-nowrap rounded-full bg-sage px-2.5 py-1 text-[10px] uppercase tracking-wider text-ink"
              key={skill}
              style={{ '--badge-index': i } as React.CSSProperties}
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
  const [activeIndex, setActiveIndex] = useState<null | number>(null)

  const handleExpand = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const handleCollapse = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : prev))
  }, [])

  return (
    <section id="experience">
      <Container className="py-16">
      <p className="text-xs font-extrabold uppercase tracking-widest text-warm-gray-light">
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
              description={t(`${exp.id}.description`)}
              experience={exp}
              index={i}
              isExpanded={activeIndex === i}
              isMobile={isMobile}
              key={`${exp.company}-${exp.startDate}`}
              mode={t(`${exp.id}.mode`)}
              onCollapse={handleCollapse}
              onExpand={handleExpand}
              role={t(`${exp.id}.role`)}
            />
          ))}
        </div>
      </div>

      {/* LinkedIn CTA */}
      <div className="mt-14 text-center">
        <a
          className="btn-ink"
          href="https://www.linkedin.com/in/amadogr/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="btn-ink-label">{t('viewLinkedIn')}</span>
          <span className="btn-ink-label-hover">{t('viewLinkedIn')}</span>
        </a>
      </div>
      </Container>
    </section>
  )
}
