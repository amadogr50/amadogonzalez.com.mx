import { Container } from '@/components/container'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

export async function Hero() {
  const t = await getTranslations('hero')

  const credentialItems = [
    t('credential1'),
    t('credential2'),
    t('credential3'),
  ]

  return (
    <section className="relative overflow-hidden py-24 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--color-sage-wash),transparent_70%)]" />
      <Container className="relative">
        <h1 className="font-serif text-[52px] font-light tracking-[0.01em]">
          {t('title')}
        </h1>
        <p className="mt-3 font-serif text-[21px] italic text-stone">
          {t('subtitle')}
        </p>
        <p className="drop-cap mx-auto mt-5 max-w-[520px] text-sm leading-relaxed text-warm-gray-light">
          {t('description')}
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
            { href: '#work' as const, label: t('viewWork') },
            { href: '#contact' as const, label: t('contactCta') },
          ].map(({ href, label }) => (
            <Link className="btn-ink" href={href} key={href}>
              <span className="btn-ink-label">{label}</span>
              <span className="btn-ink-label-hover">{label}</span>
            </Link>
          ))}
          <a className="btn-ink" download href="/cv.pdf">
            <span className="btn-ink-label">{t('downloadCV')}</span>
            <span className="btn-ink-label-hover">{t('downloadCV')}</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
