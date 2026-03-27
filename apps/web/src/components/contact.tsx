import { getTranslations } from 'next-intl/server'
import { CVDownloadButton } from './cv-download-button'
import { EmailLinkButton } from './email-link-button'

export async function Contact() {
  const t = await getTranslations('contact')

  return (
    <section className="w-full bg-ink px-6 py-28 text-center md:px-12 md:py-36" id="contact">
      <div className="mx-auto max-w-[600px]">
        <p className="text-xs font-extrabold uppercase tracking-widest text-sage">
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
              <EmailLinkButton
                className="btn-ink ring-1 ring-cream/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                email="hola@amadogonzalez.com.mx"
                label={t('email')}
              />
              </li>
            <li>
              <CVDownloadButton
                className="btn-ink ring-1 ring-cream/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                label={t('downloadCV')}
              />
            </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}
