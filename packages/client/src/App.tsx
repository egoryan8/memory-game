import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Spinner } from './components/Spinner/Spinner'
import { Layout } from './components/Layout/Layout'
import useStore from './store'
import { routes } from '@/config/routerConfig'
import withAuthCheck from '@/utils/withAuthCheck'

const routeComponents = routes.map(route => (
  <Route key={route.path} path={route.path} element={route.element} />
))

function App() {
  const [fetchUserAsync] = useStore(s => [s.fetchUserAsync])
  useEffect(() => {
    fetchUserAsync()
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={withAuthCheck(Layout)}>{routeComponents}</Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
