import { getTranslations } from 'next-intl/server'

export async function Contact() {
  const t = await getTranslations('contact')

  return (
    <section id="contact" className="w-full bg-ink px-6 py-28 text-center md:px-12 md:py-36">
      <div className="mx-auto max-w-[600px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">
          {t('sectionLabel')}
        </p>

        <h2 className="mt-4 font-serif text-[36px] font-light leading-tight text-cream md:text-[44px]">
          {t('heading')}
        </h2>

        <div className="mx-auto mt-8 h-px w-10 bg-sage/40" />

        <p className="mx-auto mt-8 max-w-[480px] text-[15px] leading-relaxed text-warm-gray-light">
          {t('description1')}
        </p>
        <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-relaxed text-warm-gray-light">
          {t('description2')}
        </p>

        <nav aria-label="Contact links">
          <ul className="mt-12 flex flex-wrap justify-center gap-4">
            <li>
              <a
                href="mailto:hola@amadogonzalez.com.mx"
                className="btn-ink ring-1 ring-cream/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span className="btn-ink-label inline-flex items-center gap-2">
                  {t('email')}
                </span>
                <span className="btn-ink-label-hover inline-flex items-center gap-2">
                  {t('email')}
                </span>
              </a>
              </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}
