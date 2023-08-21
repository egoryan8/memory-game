import { ComponentType, ReactNode } from 'react'

export interface ErrorBoundaryProps {
  children: ReactNode
  ErrorComponent?: ComponentType<{ error: Error }>
}

export interface ErrorBoundaryState {
  error: Error | null
}
