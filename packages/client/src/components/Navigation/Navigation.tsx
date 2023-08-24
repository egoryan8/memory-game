import Button from '@/components/Button/Button'
import { NavLink } from 'react-router-dom'
import { ReactComponent as ExitIcon } from './exit.svg'
import s from './Navigation.module.scss'

const navList = [
  { id: 1, heading: 'Играть', href: '/new-game' },
  { id: 2, heading: 'форум', href: '/forum' },
  { id: 3, heading: 'таблица лидеров', href: '/leaderboard' },
]

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <div className={s.logo}>Лого</div>
      <ul>
        {navList.map(({ id, heading, href }) => (
          <li key={id}>
            <NavLink
              to={href}
              className={({ isActive }) => (isActive ? s.active : '')}>
              {heading}
            </NavLink>
          </li>
        ))}
        <li>
          <Button className={s.btnExit}>
            <ExitIcon />
            выйти
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
