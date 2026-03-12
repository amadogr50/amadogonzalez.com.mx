import { cn } from './cn'

interface HeadingProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
}

export function Heading({ children, as: Component = 'h2', className }: HeadingProps) {
  return (
    <Component className={cn('font-serif font-medium leading-tight', className)}>
      {children}
    </Component>
  )
}

interface BodyProps {
  children: React.ReactNode
  className?: string
}

export function Body({ children, className }: BodyProps) {
  return (
    <p className={cn('font-sans text-base leading-relaxed text-stone', className)}>
      {children}
    </p>
  )
}
