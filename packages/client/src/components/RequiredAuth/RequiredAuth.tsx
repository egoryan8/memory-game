import { useLocation, useNavigate } from 'react-router-dom'
import { FC, useEffect } from 'react'
import useStore from '@/store'
import { AppPath } from '@/types/AppPath'
import { Spinner } from '@/components/Spinner/Spinner'

interface RequiredAuthProps {
  children: JSX.Element
}

const RequiredAuth: FC<RequiredAuthProps> = ({ children }) => {
  const [user] = useStore(s => [s.user])
  const navigate = useNavigate()
  const location = useLocation()
  const routes = Object.values(AppPath) as string[]
  useEffect(() => {
    if (routes.includes(location.pathname)) {
      switch (location.pathname) {
        case AppPath.LOGIN:
        case AppPath.REGISTER: {
          if (user.data) navigate(AppPath.GAME)
          break
        }
        default: {
          if (!user.data) navigate(AppPath.LOGIN)
        }
      }
    }
  }, [user, location])

  return user.loading ? <Spinner /> : children
}

export default RequiredAuth
