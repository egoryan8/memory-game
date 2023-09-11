import Button from '@/components/Button/Button'
import { NavLink } from 'react-router-dom'
import ExitIcon from './icons/exit.svg'
import LogoIcon from './logo.svg'
import { navConfig } from '@/config/navConfig'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import logout from '@/store/asyncActions/auth/logout'
import s from './Navigation.module.scss'

const Navigation = () => {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className={s.nav}>
      <img src={LogoIcon} alt="Logo icon" />
      <ul>
        {navConfig.map(item => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? s.active : '')}>
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
      <Button className={s.btnExit} onClick={handleLogout}>
        <img src={ExitIcon} alt="Exit icon" />
        выйти
      </Button>
    </nav>
  )
}

export default Navigation
