import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { routes } from '@/config/routerConfig'
import RequiredAuth from '@/components/RequiredAuth/RequiredAuth'

const routeComponents = routes.map(route => (
  <Route
    key={route.path}
    path={route.path}
    element={<RequiredAuth>{route.element}</RequiredAuth>}
  />
))

function startServiceWorker() {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registration successful: ', registration.scope)
        })
        .catch((error: string) => {
          console.log('SW registration failed: ', error)
        })
    }
  })
}

function App() {
  useEffect(() => {
    startServiceWorker()
  }, [])

  return (
    <Routes>
      <Route element={<Layout />}>{routeComponents}</Route>
    </Routes>
  )
}

export default App
