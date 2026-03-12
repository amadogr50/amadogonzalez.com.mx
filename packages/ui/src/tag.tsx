import { cn } from './cn'

interface TagProps {
  children: React.ReactNode
  variant?: 'outline' | 'filled'
  className?: string
}

export function Tag({ children, variant = 'filled', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider',
        variant === 'outline' && 'border border-sage-dark text-sage',
        variant === 'filled' && 'bg-sage text-ink',
        className,
      )}
    >
      {children}
    </span>
  )
}
