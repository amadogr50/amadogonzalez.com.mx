const categories = [
  {
    id: 'mobile',
    label: 'Core Expertise',
    title: 'Mobile Development',
    description:
      'Desarrollo de aplicaciones móviles escalables, performantes y mantenibles, utilizadas en producción por miles de usuarios.',
    groups: [
      {
        name: 'Tecnologías',
        items: ['React Native', 'Expo', 'TypeScript', 'Kotlin', 'iOS / Android'],
      },
      {
        name: 'Performance & Optimización',
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
      'Construcción de aplicaciones web modernas y plataformas internas orientadas a producto.',
    groups: [
      {
        name: 'Tecnologías',
        items: ['React', 'Next.js', 'JavaScript / TypeScript', 'HTML / CSS'],
      },
      {
        name: 'Capacidades',
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
      'Arquitecturas de estado enfocadas en simplicidad, rendimiento y mantenibilidad.',
    groups: [
      {
        name: 'Herramientas',
        items: ['React Context API', 'Zustand', 'React Query', 'REST APIs'],
      },
      {
        name: 'Experiencia adicional',
        items: ['Redux'],
      },
    ],
  },
  {
    id: 'backend',
    label: null,
    title: 'Backend & APIs',
    description:
      'Construcción de servicios backend ligeros y eficientes dentro del ecosistema JavaScript.',
    groups: [
      {
        name: 'Tecnologías',
        items: ['Node.js', 'Express', 'Fastify'],
      },
      {
        name: 'Infraestructura de datos',
        items: ['Redis', 'BullMQ'],
      },
    ],
  },
  {
    id: 'devops',
    label: null,
    title: 'DevOps & Deployments',
    description:
      'Experiencia gestionando el ciclo completo de desarrollo y despliegue, desde desarrollo hasta producción.',
    groups: [
      {
        name: 'CI/CD y automatización',
        items: ['Jenkins', 'Fastlane', 'EAS', 'Pipelines personalizados'],
      },
      {
        name: 'Infraestructura',
        items: ['Docker', 'Firebase', 'Railway', 'Azure', 'Heroku', 'VPS'],
      },
      {
        name: 'Distribución móvil',
        items: ['App Store', 'Google Play Store'],
      },
    ],
  },
  {
    id: 'observability',
    label: null,
    title: 'Observability & Analytics',
    description:
      'Implementación de herramientas para monitorear estabilidad, errores y uso del producto.',
    groups: [
      {
        name: 'Herramientas',
        items: ['Sentry', 'Plausible Analytics', 'Google Analytics'],
      },
    ],
  },
  {
    id: 'integrations',
    label: null,
    title: 'Systems Integration',
    description:
      'Conectando tecnología con operaciones reales de negocio mediante integraciones y automatización de procesos.',
    groups: [
      {
        name: 'Experiencia con',
        items: [
          'Integraciones ERP',
          'Automatización operativa',
          'Sistemas SMS',
          'Integraciones entre plataformas',
        ],
      },
    ],
  },
  {
    id: 'ai',
    label: null,
    title: 'AI-Assisted Development',
    description:
      'Integro herramientas de inteligencia artificial en mi flujo de desarrollo para acelerar análisis técnico, iteración y resolución de problemas, manteniendo control arquitectónico y revisión humana.',
    groups: [
      {
        name: 'Herramientas',
        items: ['Claude', 'ChatGPT', 'Cursor'],
      },
      {
        name: 'Aplicaciones',
        items: [
          'Arquitecturas y patrones',
          'Debugging complejo',
          'Refactors grandes',
          'Documentación técnica',
          'Prototipos rápidos',
        ],
      },
    ],
  },
]

import { Container } from '@/components/container'

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
          Mi enfoque técnico va más allá del desarrollo de interfaces. A lo largo de mi carrera he
          diseñado y construido aplicaciones móviles, plataformas web y sistemas completos en
          producción, conectando clientes móviles, servicios backend, infraestructura cloud y
          herramientas de negocio.
        </p>
        <p>
          Aunque mi especialidad es el desarrollo móvil con React Native, también trabajo en
          arquitectura de sistemas, backend, DevOps e integraciones, construyendo soluciones
          completas desde la idea hasta su operación en producción.
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
