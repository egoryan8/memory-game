import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Spinner } from './components/Spinner/Spinner'
import { AppPath } from './types/AppPath'
import { Layout } from './components/Layout/Layout'
import useStore from './store'

const Error = lazy(() => import('./pages/Error/Error'))
const Forum = lazy(() => import('./pages/Forum/Forum'))
const ForumThread = lazy(() => import('./pages/ForumThread/ForumThread'))
const LeaderBoard = lazy(() => import('./pages/LeaderBoard/LeaderBoard'))
const Game = lazy(() => import('./pages/Game/Game'))
const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const Main = lazy(() => import('./pages/Main/Main'))
const ChangePassword = lazy(
  () => import('./pages/ChangePassword/ChangePassword')
)

const routes = [
  {
    path: AppPath.MAIN,
    element: <Main />,
  },
  {
    path: AppPath.GAME,
    element: <Game />,
  },
  {
    path: AppPath.LOGIN,
    element: <Login />,
  },
  {
    path: AppPath.REGISTER,
    element: <Register />,
  },
  {
    path: AppPath.FORUM,
    element: <Forum />,
  },
  {
    path: AppPath.THREAD,
    element: <ForumThread />,
  },
  {
    path: AppPath.PROFILE,
    element: <Profile />,
  },
  {
    path: AppPath.CHANGE_PASS,
    element: <ChangePassword />,
  },
  {
    path: AppPath.LEADERBOARD,
    element: <LeaderBoard />,
  },
  {
    path: '/*',
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
          <Route element={<Layout />}>{routeComponents}</Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
