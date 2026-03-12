import Link from 'next/link'

import { Container } from '@/components/container'

const credentialItems = [
  '8+ years in production software',
  '20+ shipped mobile apps',
  '10+ web platforms'
]

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--color-sage-wash),transparent_70%)]" />
      <Container className="relative">
        <h1 className="font-serif text-[52px] font-light tracking-[0.01em]">
          Amado González
        </h1>
        <p className="mt-3 font-serif text-[21px] italic text-stone">
          Lead Mobile &amp; Product Engineer
        </p>
        <p className="mx-auto mt-5 max-w-[520px] text-sm leading-relaxed text-warm-gray-light">
          I build mobile products with React Native — from architecture to
          production — and design the systems that keep them running at scale.
          My work spans apps used by hundreds of thousands of people and the
          operational infrastructure behind a real gastronomic business.
        </p>
        <p className="mt-5 text-xs tracking-wide text-ink/70">
          {credentialItems.map((item, i) => (
            <span key={item}>
              {item}
              {i < credentialItems.length - 1 && (
                <span className="mx-2 opacity-40">·</span>
              )}
            </span>
          ))}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          {[
            { href: '#work', label: 'View Selected Work' },
            { href: '#contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="btn-ink">
              <span className="btn-ink-label">{label}</span>
              <span className="btn-ink-label-hover">{label}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
