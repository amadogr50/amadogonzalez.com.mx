'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

import { Container } from '@/components/container'

const experiences = [
  {
    role: 'Lead Frontend Developer',
    company: 'Lithios',
    mode: 'Full-time',
    startDate: 'Jan 2021',
    endDate: 'Present',
    description:
      'Served as lead developer on all mobile apps and web platforms delivered, covering the full lifecycle: development, testing, environment configuration, CI/CD pipelines, deployments to app stores, and client account management. Built apps from scratch using cutting-edge frameworks and libraries (React Native, Expo, React, TypeScript), while also maintaining and supporting existing products. Acted as the point of contact for clients, ensuring satisfaction through bug fixes, technical guidance, and ongoing support. Performed code reviews, technical analysis, and mentorship, ensuring high-quality standards across the engineering team. Demonstrated versatility by leading both mobile and web development, consistently adopting latest best practices to deliver scalable, performant, and maintainable products.',
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
    role: 'Lead Engineer',
    company: 'El Palacio de Hierro',
    mode: 'Contract · via BILDIT',
    startDate: 'Jun 2023',
    endDate: 'May 2025',
    description:
      'Acted as lead developer and primary point of contact between BILDIT and El Palacio de Hierro, collaborating directly with stakeholders to align technical solutions with business needs. Owned the full development lifecycle: feature implementation, testing, environment setup, CI/CD, deployments, and long-term support. Maintained and enhanced the flagship e-commerce app post-launch, often serving as the go-to engineer for critical issues, ensuring stability during high-traffic periods. Delivered core product features (shopping cart, product listing, detail views, home) that shaped the customer experience and drove online sales. Provided ongoing support and acted as a reliable problem-solver, strengthening trust with the client and positioning BILDIT as a dependable partner.',
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
    role: 'React Native Developer',
    company: 'GrainChain Inc',
    mode: 'Full-time',
    startDate: 'Jan 2020',
    endDate: 'Dec 2020',
    description:
      'Worked on two mobile products at GrainChain, an agricultural technology company building software to streamline commodity transactions and supply chain processes. Contributed to Trumodity, a blockchain-backed transaction platform that facilitates prompt payment to producers and real-time commodity trading while combating fraud through certification and immutable records. Served as main developer on Seed Audit, a preharvest traceability tool that records and tracks all data from seed to harvest — seed receipts, fertilizers, geofenced crop maps — enabling audits and certification. Built a high-performance bi-directional scroll component handling 500+ items on limited devices through optimized rendering and memoization, used in dynamically constructed certification forms. Drove adoption of CI/CD pipelines for React Native, cutting testing and deployment times significantly. This was my first significant experience with React Native.',
    skills: [
      'React Native',
      'Blockchain',
      'CI/CD',
      'Performance Optimization',
      'Agriculture Tech',
    ],
  },
  {
    role: 'Mobile Developer',
    company: 'Alpha Wave Systems',
    mode: 'Freelance',
    startDate: 'Jul 2019',
    endDate: 'Dec 2019',
    description:
      'Worked within a five-person development team building native mobile applications for two clients. Developed the official Guadalajara Zoo app — an interactive guide featuring ticket purchasing, an interactive map, and visitor information. Built a full-featured mobile banking application for Bansi Bank with transaction history, transfers, and CoDi mobile payment integration, one of the early implementations of Mexico\'s central bank digital payment system. Developed the Zoo app in Kotlin while contributing to the banking application alongside the rest of the team.',
    skills: ['Kotlin', 'Android', 'Mobile Payments', 'CoDi', 'Native Development'],
  },
  {
    role: 'Full Stack Engineer',
    company: 'Retraced',
    mode: 'Full-time',
    startDate: 'Jan 2019',
    endDate: 'Dec 2019',
    description:
      'Sole frontend engineer at Retraced, an AI-first platform for sourcing, product compliance, and supplier lifecycle collaboration focused on the fashion industry. Led a complete visual redesign of their web platform, which helps brands trace their supply chain with ethical and compliance standards. Rebuilt the frontend using React, Node.js, and Next.js, translating design specifications into a polished, production-ready interface while maintaining all existing functionality. Developed CRUD pages and data views across the platform as the only developer responsible for the entire frontend codebase.',
    skills: ['React', 'Node.js', 'Next.js', 'UI Redesign', 'Supply Chain'],
  },
  {
    role: 'Android Developer',
    company: 'nordicloop',
    mode: 'Freelance',
    startDate: 'Jan 2018',
    endDate: 'Dec 2018',
    description:
      'First experience working as a remote contractor for a foreign company, delivering two Android applications for Canadian clients. Built a Bitcoin wallet app using Kotlin and the then-new Android architecture components with MVVM pattern. Developed a local-first marketplace application designed for street vendors, migrating it from a legacy Java codebase with Model-View-Presenter to Kotlin while modernizing the architecture. Worked fully remote from Mexico, managing communication across time zones and delivering both projects independently.',
    skills: ['Kotlin', 'Java', 'Android', 'MVVM', 'Bitcoin', 'Remote'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Resser Tecnologías',
    mode: 'Internship',
    startDate: 'Jan 2017',
    endDate: 'Dec 2017',
    description:
      'First role in professional software development at Resser, a company specializing in commercial fleet tracking software. Worked on internal tools that form the backbone of their infrastructure, including an ERP system connected to the client-facing web platform. Implemented features across the frontend using ExtJS and contributed backend modifications in C# .NET. Built automated payroll functionality involving complex third-party calculations and business logic. Gained foundational experience in full-stack development, working within a large existing codebase and learning to navigate enterprise software patterns.',
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
}: {
  experience: (typeof experiences)[number]
  index: number
  isExpanded: boolean
  onExpand: (index: number) => void
  onCollapse: (index: number) => void
  isMobile: boolean
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
          {experience.role}
        </h3>
        <p className="mt-1 text-[13px] text-stone">
          {experience.company}
          <span className="mx-1.5 text-hairline">·</span>
          {experience.mode}
        </p>
        <p className="mt-0.5 text-[12px] tracking-wide text-warm-gray-light">
          {experience.startDate} – {experience.endDate}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-stone">
          {experience.description}
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
        Work Experience
      </p>
      <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight">
        Where I&apos;ve been
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
          <span className="btn-ink-label">View full profile on LinkedIn</span>
          <span className="btn-ink-label-hover">View full profile on LinkedIn</span>
        </a>
      </div>
      </Container>
    </section>
  )
}
