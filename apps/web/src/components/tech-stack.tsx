import { getTranslations } from 'next-intl/server'

import { Container } from '@/components/container'

const categories = [
  {
    id: 'mobile',
    groups: [
      {
        name: 'Technologies',
        items: ['React Native', 'Expo', 'TypeScript', 'Kotlin', 'iOS / Android'],
      },
      {
        name: 'Performance & Optimization',
        items: [
          'FlashList',
          'Expo Image',
          'Render optimization & memoization',
          'Virtualized lists',
          'Asset optimization',
        ],
      },
    ],
  },
  {
    id: 'frontend',
    groups: [
      {
        name: 'Technologies',
        items: ['React', 'Next.js', 'JavaScript / TypeScript', 'HTML / CSS'],
      },
      {
        name: 'Capabilities',
        items: [
          'Server-side rendering',
          'Component-driven architecture',
          'Image optimization',
        ],
      },
    ],
  },
  {
    id: 'state',
    groups: [
      {
        name: 'Tools',
        items: ['React Context API', 'Zustand', 'React Query', 'REST APIs'],
      },
      {
        name: 'Additional Experience',
        items: ['Redux'],
      },
    ],
  },
  {
    id: 'backend',
    groups: [
      {
        name: 'Technologies',
        items: ['Node.js', 'Express', 'Fastify'],
      },
      {
        name: 'Data Infrastructure',
        items: ['Redis', 'BullMQ'],
      },
    ],
  },
  {
    id: 'devops',
    groups: [
      {
        name: 'CI/CD & Automation',
        items: ['Jenkins', 'Fastlane', 'EAS', 'Custom pipelines'],
      },
      {
        name: 'Infrastructure',
        items: ['Docker', 'Firebase', 'Railway', 'Azure', 'Heroku', 'VPS'],
      },
      {
        name: 'Mobile Distribution',
        items: ['App Store', 'Google Play Store'],
      },
    ],
  },
  {
    id: 'observability',
    groups: [
      {
        name: 'Tools',
        items: ['Sentry', 'Plausible Analytics', 'Google Analytics'],
      },
    ],
  },
  {
    id: 'integrations',
    groups: [
      {
        name: 'Experience With',
        items: [
          'ERP integrations',
          'Operational automation',
          'SMS systems',
          'Cross-platform integrations',
        ],
      },
    ],
  },
  {
    id: 'ai',
    groups: [
      {
        name: 'Tools',
        items: ['Claude', 'ChatGPT', 'Cursor'],
      },
      {
        name: 'Applications',
        items: [
          'Architectures and patterns',
          'Complex debugging',
          'Large-scale refactors',
          'Technical documentation',
          'Rapid prototyping',
        ],
      },
    ],
  },
]

export async function TechStack() {
  const t = await getTranslations('techStack')

  return (
    <section id="stack">
      <Container className="py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-gray-light">
        {t('sectionLabel')}
      </p>
      <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight">
        {t('heading')}
      </h2>
      <div className="mt-8 h-px w-10 bg-sage" />

      <div className="mt-8 max-w-[65ch] space-y-4 text-base leading-[1.85] text-stone">
        <p>{t('intro1')}</p>
        <p>{t('intro2')}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`rounded-lg border border-hairline bg-card-bg p-7 ${
              category.id === 'mobile' ? 'md:col-span-2' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div>
                {t.has(`${category.id}.label`) && (
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sage">
                    {t(`${category.id}.label`)}
                  </p>
                )}
                <h3 className="font-serif text-[18px] font-medium leading-tight text-ink">
                  {t(`${category.id}.title`)}
                </h3>
              </div>
            </div>

            <p className="mt-3 text-sm leading-[1.7] text-stone">{t(`${category.id}.description`)}</p>

            <div className="mt-5 space-y-4">
              {category.groups.map((group) => (
                <div key={group.name}>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-warm-gray-light">
                    {group.name}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="whitespace-nowrap rounded-full bg-sage px-2.5 py-1 text-[10px] uppercase tracking-wider text-ink"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </Container>
    </section>
  )
}
