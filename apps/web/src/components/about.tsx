import { Container } from '@/components/container'

export function About() {
  return (
    <section id="about">
      <Container className="py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-gray-light">
          About
        </p>
        <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight">
          Code, craft, and things that endure
        </h2>
        <div className="mt-8 h-px w-10 bg-sage" />

        <div className="mt-8 max-w-[65ch] text-base leading-[1.85] text-stone">
          <p>
            <span className="float-left mr-2 mt-1.5 font-serif text-[64px] font-light leading-[0.75] text-sage">
              I
            </span>{' '}
            see code as both a craft and a language for building systems that people interact with every day. Good engineering is not only about solving problems — it's about turning ideas into reliable products that work under real conditions.
          </p>
          <p className="mt-6">
            I'm a Lead React Native Engineer with 8+ years of experience building and shipping production mobile and web applications across startups and enterprise environments. Over the course of my career I've delivered 20+ mobile applications and more than 10 web platforms, many of them used daily by hundreds of thousands of users.
          </p>
          <p className="mt-6">
            Most recently, I served as Lead React Native Engineer for the El Palacio de Hierro mobile app, one of Mexico's leading luxury retail platforms. In that role I owned the mobile architecture and engineering lifecycle end-to-end — including CI/CD pipelines, App Store and Play Store deployments, production monitoring, and feature development supporting thousands of daily users.
          </p>
          <p className="mt-6">
            Earlier in my career at Lithios, I built and shipped ten production applications across mobile and web, working directly with clients from early requirements through launch and long-term support.
          </p>
          <p className="mt-6">
            My core expertise is React Native and the modern TypeScript ecosystem, but my work often extends beyond mobile. I design and build complete systems — connecting applications with APIs, infrastructure, analytics, and operational tools — ensuring that products are not only functional, but reliable and scalable in production.
          </p>
          <p className="mt-6">
            I do my best work when I can take ownership of a system from architecture to deployment and long-term stability.
          </p>
        </div>
      </Container>

      <div className="mt-12 bg-sage py-12">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink/60">
            About
          </p>
          <blockquote className="mt-4 max-w-[560px] font-serif text-[26px] italic leading-[1.35] text-ink">
            Whether in code or culture, I care about building things that endure
            and inspire.
          </blockquote>
        </Container>
      </div>

      <Container className="pt-12 pb-16">
        <h2 className="font-serif text-[28px] font-medium leading-tight">
          Beyond software
        </h2>
        <div className="mt-8 h-px w-10 bg-sage" />

        <div className="mt-8 max-w-[65ch] text-base leading-[1.85] text-stone">
          <p>
            Outside of engineering, I am a co-founder of Black Brûlée, a gastronomic house in Guadalajara focused on intentional hospitality and culinary craft.
          </p>
          <p className="mt-6">
            I built the digital and operational backbone of the business — selecting and deploying our ERP system (ERPNext), self-hosting it on a VPS with Docker and Traefik, and building integrations that connect WhatsApp and Instagram to automated order workflows. I also manage systems for costs, inventory, and production across multiple operational areas.
          </p>
          <p className="mt-6">
            Running a business has sharpened how I think about software: every system must survive contact with real people, real constraints, and real deadlines.
          </p>
        </div>

        <div className="mt-12 border-t border-hairline" />
      </Container>
    </section>
  )
}
