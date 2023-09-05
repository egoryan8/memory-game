import useStore from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppPath } from '@/types/AppPath'
import { useEffect } from 'react'

export const useAuth = () => {
  const [user] = useStore(s => [s.user])
  const navigate = useNavigate()
  const location = useLocation()
  const routes = Object.values(AppPath) as string[]

  useEffect(() => {
    if (user.loading) return
    if (routes.includes(location.pathname)) {
      switch (location.pathname) {
        case AppPath.LOGIN:
        case AppPath.REGISTER: {
          if (user.data) navigate(AppPath.MAIN)
          break
        }
        default: {
          if (!user.data) navigate(AppPath.LOGIN)
        }
      }
    }
  }, [user, location])

  return { user: user.data, loading: user.loading }
}
