import { RootState } from '@/store'
import { setTheme } from '@/store/slices/themeSlice'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import s from './ThemeButton.module.scss'

import sun from './sun.svg'
import moon from './moon.svg'

const Theme = () => {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newTheme))
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
