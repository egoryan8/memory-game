import React, { PureComponent, FC, ReactNode } from 'react'
import { ErrorBoundaryProps, ErrorBoundaryState } from './types'

const ErrorMsg: FC<{ error: Error }> = ({ error }) => {
  return (
    <div>
      <p>Что-то пошло не так...</p>
      <p>{error.message}</p>
    </div>
  )
}

class ErrorBoundary extends PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  render(): ReactNode {
    const { error } = this.state
    const { children, ErrorComponent } = this.props

    if (error) {
      return ErrorComponent ? (
        <ErrorComponent error={error} />
      ) : (
        <ErrorMsg error={error} />
      )
    }

    return children
  }
}

export default ErrorBoundary
