import React from 'react'
import { Outlet } from 'react-router-dom'

interface ILayout {
  children?: JSX.Element
}
export const Layout = ({ children }: ILayout) => (
  <div className="layout">
    {children}
    <Outlet />
  </div>
)
