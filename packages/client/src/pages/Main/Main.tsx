import s from './Main.module.scss'
import Navigation from '@/components/Navigation/Navigation'
import Button from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { AppPath } from '@/types/AppPath'

const Main = () => {
  const navigate = useNavigate()

  const handlePlayClick = () => {
    navigate(AppPath.GAME)
  }

  return (
    <div className={s.wrapper}>
      <Navigation />
      <main className={s.content}>
        <div className={s.textWrapper}>
          <h1 className={s.mainTitle}>Запомни свой стек</h1>
          <p className={s.subtitle}>
            {' '}
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit...
          </p>
        </div>
        <div className={s.levelWrapper}>
          <h2 className={s.pickLevelTitle}>Выбрать сложность:</h2>
          <ul className={s.levels}>
            <li className={s.level}>
              <input id="easy" name="levels" type="radio" className={s.radio} />
              <label htmlFor="easy" className={s.levelText}>
                Легко
              </label>
            </li>
            <li className={s.level}>
              <input id="hard" name="levels" type="radio" className={s.radio} />
              <label htmlFor="hard" className={s.levelText}>
                Сложно
              </label>
            </li>
            <li className={s.level}>
              <input
                id="veryHard"
                name="levels"
                type="radio"
                className={s.radio}
              />
              <label htmlFor="veryHard" className={s.levelText}>
                Очень сложно
              </label>
            </li>
          </ul>
          <Button onClick={handlePlayClick} className={s.button}>
            Играть
          </Button>
        </div>
      </main>
    </div>
  )
}

export default Main
