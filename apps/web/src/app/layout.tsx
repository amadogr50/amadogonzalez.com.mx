import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import React from 'react'

import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://amadogonzalez.dev',
  ),
  title: {
    default: 'Amado González — Software Engineer & Builder',
    template: '%s — amadogonzalez.dev',
  },
  description:
    'Senior mobile and frontend engineer with 8+ years of experience. I build production apps for millions and run the operations of a gastronomic house in Guadalajara. React Native, TypeScript, full-stack.',
  openGraph: {
    title: 'Amado González — Software Engineer & Builder',
    description:
      'Senior mobile and frontend engineer with 8+ years of experience. I build production apps for millions and run the operations of a gastronomic house in Guadalajara.',
    url: 'https://amadogonzalez.dev',
    siteName: 'amadogonzalez.dev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amado González — Software Engineer & Builder',
    description:
      'Senior mobile and frontend engineer. React Native, TypeScript, full-stack.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
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
      </body>
    </html>
  )
}
