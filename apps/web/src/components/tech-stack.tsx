import { Container } from '@/components/container'

const categories = [
  {
    id: 'mobile',
    label: 'Core Expertise',
    title: 'Mobile Development',
    description:
      'Development of scalable, high-performance, and maintainable mobile applications used in production by thousands of users.',
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
    label: null,
    title: 'Frontend & Web',
    description:
      'Building modern web applications and internal platforms with a strong product-focused approach.',
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
    label: null,
    title: 'State Management & Data Flow',
    description:
      'State architectures focused on simplicity, performance, and maintainability.',
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
    label: null,
    title: 'Backend & APIs',
    description:
      'Building lightweight and efficient backend services within the JavaScript ecosystem.',
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
    label: null,
    title: 'DevOps & Deployments',
    description:
      'Experience managing the full development and deployment lifecycle, from development to production.',
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
    label: null,
    title: 'Observability & Analytics',
    description:
      'Implementation of tools to monitor application stability, errors, and product usage.',
    groups: [
      {
        name: 'Tools',
        items: ['Sentry', 'Plausible Analytics', 'Google Analytics'],
      },
    ],
  },
  {
    id: 'integrations',
    label: null,
    title: 'Systems Integration',
    description:
      'Connecting technology with real business operations through integrations and process automation.',
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
    label: null,
    title: 'AI-Assisted Development',
    description:
      'I integrate artificial intelligence tools into my development workflow to accelerate technical analysis, iteration, and problem-solving, while maintaining architectural control and human review.',
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

export function TechStack() {
  return (
    <section id="stack">
      <Container className="py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-gray-light">
        Tech Stack
      </p>
      <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight">
        Overview
      </h2>
      <div className="mt-8 h-px w-10 bg-sage" />

      <div className="mt-8 max-w-[65ch] space-y-4 text-base leading-[1.85] text-stone">
        <p>
          My technical focus goes beyond interface development. Throughout my career I
          have designed and built mobile applications, web platforms, and full
          production systems, connecting mobile clients, backend services, cloud
          infrastructure, and business tools.
        </p>

        <p>
          While my main specialization is mobile development with React Native, I also
          work on system architecture, backend, DevOps, and integrations—building
          complete solutions from initial idea to production operation.
        </p>
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
                {category.label && (
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sage">
                    {category.label}
                  </p>
                )}
                <h3 className="font-serif text-[18px] font-medium leading-tight text-ink">
                  {category.title}
                </h3>
              </div>
            </div>

            <p className="mt-3 text-sm leading-[1.7] text-stone">{category.description}</p>

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
