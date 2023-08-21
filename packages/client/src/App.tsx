import * as React from 'react'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { Spinner } from '../components/Spinner/Spinner'

const Error = lazy(() => import('../pages/Error/Error'))
const Forum = lazy(() => import('../pages/Forum/Forum'))
const ForumThread = lazy(() => import('../pages/ForumThread/ForumThread'))
const LeaderBoard = lazy(() => import('../pages/LeaderBoard/LeaderBoard'))
const Game = lazy(() => import('../pages/Game/Game'))
const Login = lazy(() => import('../pages/Login/Login'))
const Register = lazy(() => import('../pages/Register/Register'))
const Profile = lazy(() => import('../pages/Profile/Profile'))

const routes = [
  {
    path: '/',
    element: <Game />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forum',
    element: <Forum />,
  },
  {
    path: '/forum/thread',
    element: <ForumThread />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/leaderboard',
    element: <LeaderBoard />,
  },
  {
    path: '/404',
    element: <Error name="404" text="Упс! Такой страницы нет..." />,
  },
  {
    path: '/500',
    element: (
      <Error
        name="500"
        text="Кажется что-то сломалось. Мы уже работаем над устранением проблемы!"
      />
    ),
  },
]

const routeComponents = routes.map(({ path, element }) => (
  <Route path={path} element={element} />
))

function App() {
  useEffect(() => {
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
        <Routes>{routeComponents}</Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
