import React, { FC } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Spinner } from '@/components/Spinner/Spinner'
interface RequiredAuthProps {
  children: JSX.Element
}
function withAuthCheck(Component: React.ComponentType) {
  const RequiredAuth: FC<RequiredAuthProps> = ({ children }) => {
    const { loading } = useAuth()
    return loading ? <Spinner /> : children
  }

  return (
    <RequiredAuth>
      <Component />
    </RequiredAuth>
  )
}

export default withAuthCheck
