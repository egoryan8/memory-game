import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

const Error = React.lazy(() => import('../pages/Error/Error'))
const Forum = React.lazy(() => import('../pages/Forum/Forum'))
const ForumThread = React.lazy(() => import('../pages/ForumThread/ForumThread'))
const LeaderBoard = React.lazy(() => import('../pages/LeaderBoard/LeaderBoard'))
const Game = React.lazy(() => import('../pages/Game/Game'))
const Login = React.lazy(() => import('../pages/Login/Login'))
const Register = React.lazy(() => import('../pages/Register/Register'))
const Profile = React.lazy(() => import('../pages/Profile/Profile'))

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
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/thread" element={<ForumThread />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route
          path="/500"
          element={
            <Error
              name="500"
              text="Кажется что-то сломалось.
            Мы уже работаем над устранением проблемы!"
            />
          }
        />
        <Route
          path="*"
          element={<Error name="404" text="Упс! Такой страницы нет..." />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
