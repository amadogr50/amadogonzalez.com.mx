import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
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
      <body>{children}</body>
    </html>
  )
}
