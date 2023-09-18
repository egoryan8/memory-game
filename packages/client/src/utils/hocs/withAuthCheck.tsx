import React from 'react'

import { Navigate, Route } from 'react-router-dom'
import { routes } from '@/config/routerConfig'
import { AppPath } from '@/types/AppPath'
import { IUserState } from '@/store/features/userSlice'

function withAuthCheck(user: IUserState) {
  const { data, loading } = user
  return routes.map(({ path, element }) => {
    switch (path) {
      case AppPath.LOGIN:
      case AppPath.REGISTER: {
        return (
          <Route
            key={path}
            path={path}
            element={
              !data && !loading ? element : <Navigate to={AppPath.MAIN} />
            }
          />
        )
      }
      default:
        return (
          <Route
            key={path}
            path={path}
            element={
              user && !loading ? element : <Navigate to={AppPath.LOGIN} />
            }
          />
        )
    }
  })
}

export default withAuthCheck
