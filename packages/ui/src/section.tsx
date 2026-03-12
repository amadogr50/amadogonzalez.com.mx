import { cn } from './cn'

interface SectionProps {
  children: React.ReactNode
  number?: string
  title?: string
  subtitle?: string
  className?: string
  id?: string
}

export function Section({
  children,
  number,
  title,
  subtitle,
  className,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn('mt-16', className)}>
      {number && (
        <p className="font-serif text-sm font-light tracking-wider text-warm-gray-light">
          {number}
        </p>
      )}
      {title && (
        <h2 className="font-serif text-[30px] font-normal leading-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-2 max-w-[600px] text-sm text-stone">{subtitle}</p>
      )}
      <div className="mt-8 h-px w-10 bg-sage" />
      <div className="mt-8">{children}</div>
    </section>
  )
}
