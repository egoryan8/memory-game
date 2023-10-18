import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Spinner } from '@/components/Spinner/Spinner'
import styles from './Layout.module.scss'
import { useGameCols } from '@/hooks/useGameCols'

interface ILayout {
  children?: JSX.Element
}

export const Layout = ({ children }: ILayout) => {
  useGameCols()
  const [isLoaded, setIsLoaded] = useState(false)
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
      {children}
      <Outlet />
    </div>
  )
}
