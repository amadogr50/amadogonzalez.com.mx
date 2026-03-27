'use client'

import { trackEvent } from '@/lib/analytics'

interface EmailLinkButtonProps {
  label: string
  email: string
  className?: string
}

export function EmailLinkButton({ label, email, className }: EmailLinkButtonProps) {
  const handleClick = () => {
    trackEvent('contact_email_click')
  }

  return (
    <a className={className} href={`mailto:${email}`} onClick={handleClick}>
      <span className="btn-ink-label inline-flex items-center gap-2">{label}</span>
      <span className="btn-ink-label-hover inline-flex items-center gap-2">{label}</span>
    </a>
  )
}
