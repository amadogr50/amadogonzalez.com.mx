import { Container } from '@/components/container'
import { getTranslations } from 'next-intl/server'

const categories = [
  {
    groups: [
      {
        items: ['React Native', 'Expo', 'TypeScript', 'Kotlin', 'iOS / Android'],
        name: 'Technologies',
      },
      {
        items: [
          'FlashList',
          'Expo Image',
          'Render optimization & memoization',
          'Virtualized lists',
          'Asset optimization',
        ],
        name: 'Performance & Optimization',
      },
    ],
    id: 'mobile',
  },
  {
    groups: [
      {
        items: ['React', 'Next.js', 'JavaScript / TypeScript', 'HTML / CSS'],
        name: 'Technologies',
      },
      {
        items: [
          'Server-side rendering',
          'Component-driven architecture',
          'Image optimization',
        ],
        name: 'Capabilities',
      },
    ],
    id: 'frontend',
  },
  {
    groups: [
      {
        items: ['React Context API', 'Zustand', 'React Query', 'REST APIs'],
        name: 'Tools',
      },
      {
        items: ['Redux'],
        name: 'Additional Experience',
      },
    ],
    id: 'state',
  },
  {
    groups: [
      {
        items: ['Node.js', 'Express', 'Fastify'],
        name: 'Technologies',
      },
      {
        items: ['Redis', 'BullMQ'],
        name: 'Data Infrastructure',
      },
    ],
    id: 'backend',
  },
  {
    groups: [
      {
        items: ['Jenkins', 'Fastlane', 'EAS', 'Custom pipelines'],
        name: 'CI/CD & Automation',
      },
      {
        items: ['Docker', 'Firebase', 'Railway', 'Azure', 'Heroku', 'VPS'],
        name: 'Infrastructure',
      },
      {
        items: ['App Store', 'Google Play Store'],
        name: 'Mobile Distribution',
      },
    ],
    id: 'devops',
  },
  {
    groups: [
      {
        items: ['Sentry', 'Plausible Analytics', 'Google Analytics'],
        name: 'Tools',
      },
    ],
    id: 'observability',
  },
  {
    groups: [
      {
        items: [
          'ERP integrations',
          'Operational automation',
          'SMS systems',
          'Cross-platform integrations',
        ],
        name: 'Experience With',
      },
    ],
    id: 'integrations',
  },
  {
    groups: [
      {
        items: ['Claude', 'ChatGPT', 'Cursor'],
        name: 'Tools',
      },
      {
        items: [
          'Architectures and patterns',
          'Complex debugging',
          'Large-scale refactors',
          'Technical documentation',
          'Rapid prototyping',
        ],
        name: 'Applications',
      },
    ],
    id: 'ai',
  },
]

export async function TechStack() {
  const t = await getTranslations('techStack')

  return (
    <section id="stack">
      <Container className="py-16">
      <p className="text-xs font-extrabold uppercase tracking-widest text-warm-gray-light">
        {t('sectionLabel')}
      </p>
      <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight">
        {t('heading')}
      </h2>
      <div className="mt-8 h-px w-10 bg-sage" />

      <div className="mt-8 max-w-[65ch] space-y-4 text-base leading-[1.85] text-stone">
        <p className="drop-cap">{t('intro1')}</p>
        <p>{t('intro2')}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <div
            className={`rounded-lg border border-hairline bg-card-bg p-7 ${
              category.id === 'mobile' ? 'md:col-span-2' : ''
            }`}
            key={category.id}
          >
            <div className="flex items-start gap-3">
              <div>
                {t.has(`${category.id}.label`) && (
                  <p className="mb-1 text-[11px] font-black uppercase tracking-widest text-sage">
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
                        className="whitespace-nowrap rounded-full border border-sage px-2.5 py-1 text-[10px] uppercase tracking-wider text-ink"
                        key={item}
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
