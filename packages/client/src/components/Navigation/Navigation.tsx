import ThemeButton from '@/components/ThemeButton/ThemeButton'
import { NavLink } from 'react-router-dom'
import { navConfig } from '@/config/navConfig'
import s from './Navigation.module.scss'
import Logo from '@/components/Logo/Logo'

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <div className={s.wrapper}>
        <div className={s.logoBlock}>
          <Logo />
        </div>
        <div className={s.control}>
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
          <ThemeButton />
        </div>
      </div>
    </nav>
  )
}

export default Navigation
