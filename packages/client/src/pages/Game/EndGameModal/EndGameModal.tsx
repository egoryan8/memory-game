import s from './EndModal.module.scss'
import Button from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { AppPath } from '@/types/AppPath'

interface EndGameModalProps {
  time: string
  handleRestart: () => void
}

export const EndGameModal = ({ time, handleRestart }: EndGameModalProps) => {
  //todo: Сделать компонент модалки (с возможностью закрывать на эскейп и т. д.)
  const navigate = useNavigate()
  const goToMain = () => {
    navigate(AppPath.MAIN)
  }
  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <div className={s.text}>
          <span>Время игры: </span>
          <span>{time}</span>
        </div>
        {/*<div className={s.text}>*/}
        {/*  <span>Очки: </span>*/}
        {/*  <span>{points}</span>*/}
        {/*</div>*/}
        {/*todo: расширить информацию о завершении игры*/}
        <div className={s.buttons}>
          <Button className={s.button} onClick={handleRestart}>
            Начать заново
          </Button>
          <Button className={s.button} onClick={goToMain} theme="dark">
            Выход
          </Button>
        </div>
      </div>
    </div>
  )
}
