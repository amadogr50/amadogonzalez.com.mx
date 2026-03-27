import { Container } from '@/components/container'
import { getTranslations } from 'next-intl/server'

export async function About() {
  const t = await getTranslations('about')

  return (
    <section id="about">
      <Container className="py-16">
        <p className="text-xs font-extrabold uppercase tracking-widest text-warm-gray-light">
          {t('sectionLabel')}
        </p>
        <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight">
          {t('heading')}
        </h2>
        <div className="mt-8 h-px w-10 bg-sage" />

        <div className="mt-8 max-w-[65ch] text-base leading-[1.85] text-stone">
          <p>
            {t.rich('intro', {
              dropCap: (chunks) => (
                <span className="float-left mr-2 mt-1.5 font-serif text-[64px] font-light leading-[0.75] text-sage">
                  {chunks}
                </span>
              ),
            })}
          </p>
          <p className="mt-6">{t('paragraph2')}</p>
          <p className="mt-6">{t('paragraph3')}</p>
          <p className="mt-6">{t('paragraph4')}</p>
          <p className="mt-6">{t('paragraph5')}</p>
          <p className="mt-6">{t('paragraph6')}</p>
        </div>
      </Container>

      <div className="mt-12 bg-sage py-12">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink/60">
            {t('blockquoteLabel')}
          </p>
          <blockquote className="mt-4 max-w-[560px] font-serif text-[26px] italic leading-[1.35] text-ink">
            {t('blockquote')}
          </blockquote>
        </Container>
      </div>

      <Container className="pt-12 pb-16">
        <h2 className="font-serif text-[28px] font-medium leading-tight">
          {t('beyondHeading')}
        </h2>
        <div className="mt-8 h-px w-10 bg-sage" />

        <div className="mt-8 max-w-[65ch] text-base leading-[1.85] text-stone">
          <p>{t('beyond1')}</p>
          <p className="mt-6">{t('beyond2')}</p>
          <p className="mt-6">{t('beyond3')}</p>
        </div>

        <div className="mt-12 border-t border-hairline" />
      </Container>
    </section>
  )
}
