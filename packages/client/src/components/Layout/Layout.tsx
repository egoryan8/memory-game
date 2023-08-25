import React from 'react'
import { Outlet } from 'react-router-dom'
import RequiredAuth from '@/components/RequiredAuth/RequiredAuth'

interface ILayout {
  children?: JSX.Element
}
export const Layout = ({ children }: ILayout) => (
  <div className="layout">
    <RequiredAuth>
      <>
        {children}
        <Outlet />
      </>
    </RequiredAuth>
  </div>
)
