import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Spinner } from '@/components/Spinner/Spinner'
import styles from './Layout.module.scss'
import { useGameCols } from '@/hooks/useGameCols'
import Navigation from '@/components/Navigation/Navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface ILayout {
  children?: JSX.Element
}

export const Layout = ({ children }: ILayout) => {
  const userId = useSelector((state: RootState) => state.user.data?.id)
  const location = useLocation()

  const [isLoaded, setIsLoaded] = useState(false)

  const pathToExclude = ['/game']
  const pathToAdd = ['/login', '/register']

  useGameCols()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className={styles.layout}>
        <Spinner />
      </div>
    )
  }

  return (
    <div className={styles.layout}>
      {userId && !pathToExclude.includes(location.pathname) && <Navigation />}
      {pathToAdd.includes(location.pathname) && (
        <div className={styles.copyright}>© 2023 CodeHunters</div>
      )}
      {children}
      <Outlet />
    </div>
  )
}
