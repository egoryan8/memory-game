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
      {navConfig.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          // className={s.pushable}
          className={({ isActive }) =>
            isActive ? `${s.pushable} ${s.activeLink}` : s.pushable
          }>
          <span className={s.shadow}></span>
          <span className={s.edge}></span>
          <span className={s.front}>{item.text}</span>
        </NavLink>
      ))}
      <Button className={s.btnExit} onClick={handleLogout}>
        <img src={ExitIcon} alt="Exit icon" />
      </Button>
    </nav>
  )
}

export default Navigation
