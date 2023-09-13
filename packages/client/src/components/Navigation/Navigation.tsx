import { NavLink } from 'react-router-dom'
import LogoIcon from './logo.svg'
import { navConfig } from '@/config/navConfig'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import logout from '@/store/asyncActions/auth/logout'
import s from './Navigation.module.scss'

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <div className={s.wrapper}>
        <img src={LogoIcon} alt="Logo icon" />
        <ul>
          {navConfig.map(item => (
            <li key={item.path}>
              {item.logo}
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? s.active : '')}>
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
