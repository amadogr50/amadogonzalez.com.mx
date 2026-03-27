'use client'

import { trackEvent } from '@/lib/analytics'

interface CVDownloadButtonProps {
  label: string
  className?: string
}

export function CVDownloadButton({ label, className }: CVDownloadButtonProps) {
  const handleDownload = () => {
    trackEvent('download_cv')
  }

  return (
    <a className={className} download href="/cv.pdf" onClick={handleDownload}>
      <span className="btn-ink-label">{label}</span>
      <span className="btn-ink-label-hover">{label}</span>
    </a>
  )
}
