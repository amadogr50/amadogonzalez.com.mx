import type { Metadata } from 'next'
import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { routing } from '@/i18n/routing'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { env } from '@/env'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: 'https://amadogonzalez.dev',
      siteName: 'amadogonzalez.dev',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'es')) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}"`,
        }}
      />
      <NextIntlClientProvider messages={messages}>
        <Nav />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              'name': 'Amado González',
              'jobTitle': 'Senior Mobile Engineer',
              'url': 'https://amadogonzalez.dev',
              'sameAs': [
                'https://linkedin.com/in/amadogonzalez',
                'https://github.com/amadogr',
              ],
              'knowsAbout': [
                'React Native',
                'TypeScript',
                'Next.js',
                'Mobile Development',
                'Self-Hosted Infrastructure',
              ],
              'worksFor': {
                '@type': 'Organization',
                'name': 'Lithios Apps',
              },
            }),
          }}
        />
      </NextIntlClientProvider>
    </>
  )
}
