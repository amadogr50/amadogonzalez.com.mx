import { cn } from './cn'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  className?: string
}

export function Link({ children, className, ...props }: LinkProps) {
  return (
    <a
      className={cn(
        'border-b border-sage pb-0.5 text-ink transition-colors hover:text-sage',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
