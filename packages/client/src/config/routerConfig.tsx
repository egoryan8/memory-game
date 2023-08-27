import { AppPath } from '@/types/AppPath'
import React, { lazy } from 'react'

const Error = lazy(() => import('../pages/Error/Error'))
const Forum = lazy(() => import('../pages/Forum/Forum'))
const ForumThread = lazy(() => import('../pages/ForumThread/ForumThread'))
const LeaderBoard = lazy(() => import('../pages/LeaderBoard/LeaderBoard'))
const Game = lazy(() => import('../pages/Game/Game'))
const Login = lazy(() => import('../pages/Login/Login'))
const Register = lazy(() => import('../pages/Register/Register'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const Main = lazy(() => import('../pages/Main/Main'))

export const routes = [
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
