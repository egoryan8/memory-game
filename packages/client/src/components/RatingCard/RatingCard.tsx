import { declensionWords } from '@/utils/declensionWords'
import s from './RatingCard.module.scss'

interface RatingCardProps {
  isUser: boolean
  position: string
  player: string
  score: number
}

const RatingCard = ({ isUser, position, player, score }: RatingCardProps) => {
  return (
    <li className={`${s.player} ${isUser && s.user}`}>
      <div className={s.left}>
        <div className={s.position}>{position}</div>
        <div className={s.avatar}>{player[0]}</div>
        <div>{player}</div>
      </div>
      <div className={s.score}>
        {declensionWords(score, ['очко', 'очка', 'очков'])}
      </div>
    </li>
  )
}

export default RatingCard
