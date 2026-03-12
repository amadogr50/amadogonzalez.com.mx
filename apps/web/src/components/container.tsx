import { type ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-5xl px-6${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  )
}
