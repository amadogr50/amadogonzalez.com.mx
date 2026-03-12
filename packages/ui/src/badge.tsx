import { cn } from './cn'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded bg-sage px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-ink',
        className,
      )}
    >
      {children}
    </span>
  )
}
