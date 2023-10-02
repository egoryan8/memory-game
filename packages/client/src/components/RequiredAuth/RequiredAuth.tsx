import { useAppSelector } from '@/hooks/useAppSelector'
import { userSelector } from '@/store/features/userSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { AppPath } from '@/types/AppPath'
import React, { Suspense, useEffect } from 'react'
import { Spinner } from '@/components/Spinner/Spinner'

export const RequiredAuth = ({ children }: { children: JSX.Element }) => {
  const { loading, data } = useAppSelector(userSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!data && !loading) {
      navigate(AppPath.LOGIN)
    } else if (data && !loading) {
      switch (window.location.pathname) {
        case AppPath.LOGIN:
        case AppPath.REGISTER:
          navigate(AppPath.MAIN)
      }
    }
  }, [data, loading])

  if (loading) return <Spinner />

  return <Suspense fallback={<Spinner />}>{children}</Suspense>
}
