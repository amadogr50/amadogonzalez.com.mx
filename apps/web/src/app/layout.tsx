import { env } from '@/env'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import React from 'react'

import './globals.css'

const cormorant = Cormorant_Garamond({
  display: 'swap',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600'],
})

const dmSans = DM_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body>
        {env.NEXT_PUBLIC_UMAMI_URL && env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            src={env.NEXT_PUBLIC_UMAMI_URL}
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  )
}
