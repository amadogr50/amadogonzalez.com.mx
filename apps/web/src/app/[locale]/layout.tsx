import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Nav } from '@/components/nav'
import { env } from '@/env'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import React from 'react'

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
    description: t('description'),
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    openGraph: {
      description: t('ogDescription'),
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      siteName: 'amadogonzalez.dev',
      title: t('ogTitle'),
      type: 'website',
      url: 'https://amadogonzalez.dev',
    },
    robots: {
      follow: true,
      index: true,
    },
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    twitter: {
      card: 'summary_large_image',
      description: t('twitterDescription'),
      title: t('twitterTitle'),
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              'jobTitle': 'Senior Mobile Engineer',
              'knowsAbout': [
                'React Native',
                'TypeScript',
                'Next.js',
                'Mobile Development',
                'Self-Hosted Infrastructure',
              ],
              'name': 'Amado González',
              'sameAs': [
                'https://linkedin.com/in/amadogonzalez',
                'https://github.com/amadogr',
              ],
              'url': 'https://amadogonzalez.dev',
              'worksFor': {
                '@type': 'Organization',
                'name': 'Lithios Apps',
              },
            }),
          }}
          type="application/ld+json"
        />
      </NextIntlClientProvider>
    </>
  )
}
