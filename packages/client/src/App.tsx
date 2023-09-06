import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Spinner } from './components/Spinner/Spinner'
import { Layout } from './components/Layout/Layout'
import { routes } from '@/config/routerConfig'
import withAuthCheck from '@/utils/hocs/withAuthCheck'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import fetchUser from '@/store/asyncActions/auth/fetchUser'
import { useAppSelector } from '@/hooks/useAppSelector'
import { userSelector } from '@/store/features/userSlice'

const routeComponents = routes.map(route => (
  <Route key={route.path} path={route.path} element={route.element} />
))

function App() {
  const user = useAppSelector(userSelector)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!user.data && !user.loading) {
      dispatch(fetchUser())
    }
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
