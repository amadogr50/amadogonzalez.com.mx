import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('notFound')

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-content flex-col items-center justify-center px-6 text-center md:px-12">
      <h1 className="font-serif text-[52px] font-light text-sage">{t('title')}</h1>
      <p className="mt-4 text-base text-stone">{t('description')}</p>
      <Link
        className="mt-8 border-b border-sage pb-0.5 text-xs uppercase tracking-[0.12em] text-ink transition-colors hover:text-sage"
        href="/"
      >
        {t('backHome')}
      </Link>
    </div>
  )
}
