import { NavLink } from 'react-router-dom'
import Logo from './logo.svg'
import s from './Navigation.module.scss'
import { navConfig } from '@/config/navConfig'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import logout from '@/store/asyncActions/auth/logout'

const Navigation = () => {
  const dispatch = useAppDispatch()
  const handleLogout = () => dispatch(logout())

  return (
    <nav className={s.nav}>
      <div className={s.wrapper}>
        <div>
          <img src={Logo} alt="Logo icon" />
        </div>
        <ul>
          {navConfig.map(item => (
            <li key={item.path}>
              {item.logo}
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? `${s.link} ${s.active}` : s.link
                }>
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
