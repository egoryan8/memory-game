import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Spinner } from './components/Spinner/Spinner'
import { Layout } from './components/Layout/Layout'
import withAuthCheck from '@/utils/hocs/withAuthCheck'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import fetchUser from '@/store/asyncActions/auth/fetchUser'
import { useAppSelector } from '@/hooks/useAppSelector'
import { userSelector } from '@/store/features/userSlice'

function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registration successful: ', registration.scope)
        })
        .catch((error: string) => {
          console.log('SW registration failed: ', error)
        })
    })
  }
}

function App() {
  const user = useAppSelector(userSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user.data && !user.loading) {
      dispatch(fetchUser())
    }
  }, [])

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={user.loading ? <Spinner /> : <Layout />}>
            {withAuthCheck(user)}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

startServiceWorker()
export default App
