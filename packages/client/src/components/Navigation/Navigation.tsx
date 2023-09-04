import Button from '@/components/Button/Button'
import { NavLink } from 'react-router-dom'
import ExitIcon from './exit.svg'
import s from './Navigation.module.scss'
import { navConfig } from '@/config/navConfig'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import logout from '@/store/asyncActions/auth/logout'

const Navigation = () => {
  const dispatch = useAppDispatch()

  return (
    <nav className={s.nav}>
      <div className={s.logo}>Лого</div>
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
      <Button className={s.btnExit} onClick={() => dispatch(logout())}>
        <img src={ExitIcon} alt="Exit icon" />
        выйти
      </Button>
    </nav>
  )
}

export default Navigation
