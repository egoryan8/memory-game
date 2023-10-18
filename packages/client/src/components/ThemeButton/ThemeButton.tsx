import { RootState } from '@/store'
import { setTheme } from '@/store/slices/themeSlice'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import s from './ThemeButton.module.scss'

import sun from './sun.svg'
import moon from './moon.svg'

const Theme = () => {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const userId = useSelector((state: RootState) => state.user.data?.id)
  const dispatch = useDispatch()

  const getUser = async () => {
    const url = 'http://localhost:9000/api/user-theme/'
    const response = await fetch(`${url}?user_id=${userId}`, { method: 'GET' })
    return await response.json()
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUser()

      if (res) {
        dispatch(setTheme(res))
      }
    }

    fetchData()
  }, [])

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    const data = {
      theme: newTheme,
      user_id: userId,
    }

    const response = await fetch('http://localhost:9000/api/user-theme/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })

    const res = await response.json()
    dispatch(setTheme(res.themeInstance.theme))
  }

  return (
    <button
      className={s.themeButton}
      onClick={toggleTheme}
      title="light & dark"
      aria-label="auto"
      aria-live="polite">
      {theme === 'dark' ? (
        <img src={sun} alt="Sun icon" />
      ) : (
        <img src={moon} alt="Moom icon" />
      )}
    </button>
  )
}

export default Theme
