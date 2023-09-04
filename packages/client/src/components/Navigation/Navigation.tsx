import Button from '@/components/Button/Button'
import { NavLink } from 'react-router-dom'
import ExitIcon from './exit.svg'
import s from './Navigation.module.scss'
import useStore from '@/store'
import { navConfig } from '@/config/navConfig'

const Navigation = () => {
  const [logoutAsync] = useStore(s => [s.logoutAsync])
  const handleClick = () => {
    logoutAsync()
  }

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
      <Button className={s.btnExit} onClick={handleClick}>
        <img src={ExitIcon} alt="ExitIcon" />
        выйти
      </Button>
    </nav>
  )
}

export default Navigation
