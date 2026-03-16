import { Container } from '@/components/container'
import { getTranslations } from 'next-intl/server'

export async function WritingPreview() {
  const t = await getTranslations('writing')

  return (
    <section id='writing'>
      <Container className="py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-gray-light">
        {t('sectionLabel')}
      </p>
      <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight">
        {t('heading')}
      </h2>
      <p className="mt-3 max-w-[600px] text-sm text-stone">
        {t('description')}
      </p>
      <div className="mt-8 h-px w-10 bg-sage" />

      <div className="mt-8 space-y-4">
        <p className="text-sm italic text-warm-gray-light">
            {t('comingSoon')}
          </p>
      </div>
      </Container>
    </section>
  )
}
