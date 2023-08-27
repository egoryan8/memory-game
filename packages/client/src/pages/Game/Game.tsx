import * as React from 'react'
import s from './Game.module.scss'
import Button from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { AppPath } from '@/types/AppPath'

const Game = () => {
  const navigate = useNavigate()

  const onMainClick = () => {
    navigate(AppPath.MAIN)
  }

  return (
    <main className={s.wrapper}>
      <div className={s.field}>
        <ul className={s.cards}>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
          <li className={s.card}></li>
        </ul>
      </div>
      <div className={s.handlers}>
        <ul className={s.options}>
          <li className={s.option}>
            <span className={s.optionName}>Таймер</span>
            <span className={s.optionValue}>01:00</span>
          </li>
          <li className={s.option}>
            <span className={s.optionName}>Отгадано</span>
            <span className={s.optionValue}>0 из 16</span>
          </li>
          <li className={s.option}>
            <span className={s.optionName}>Очки</span>
            <span className={s.optionValue}>0</span>
          </li>
        </ul>
        <div className={s.buttons}>
          <Button className={s.button}>Поехали!</Button>
          <Button theme="dark" className={s.button} onClick={onMainClick}>
            На главную
          </Button>
        </div>
      </div>
    </main>
  )
}

export default Game
