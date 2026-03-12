import { cn } from './cn'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Container({
  children,
  className,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={cn('mx-auto max-w-content px-6 md:px-12', className)}>
      {children}
    </Component>
  )
}
