import { useNavigate } from 'react-router-dom'
import { FC, useEffect } from 'react'
import useStore from '@/store'
import { AppPath } from '@/types/AppPath'

interface RequiredAuthProps {
  children: JSX.Element
}

const RequiredAuth: FC<RequiredAuthProps> = ({ children }) => {
  const isAuth = useStore((state: any) => state.isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate(AppPath.LOGIN)
    }
  }, isAuth)

  return children
}

export default RequiredAuth
