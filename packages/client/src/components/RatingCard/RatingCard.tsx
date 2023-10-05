import { declensionWords } from '@/utils/declensionWords'
import s from './RatingCard.module.scss'

interface RatingCardProps {
  player: string
  score: number
  avatar?: string | null
}

const RatingCard = ({ avatar, player, score }: RatingCardProps) => {
  return (
    <li className={`${s.player} ${s.user}`}>
      <div className={s.left}>
        <div className={s.position}>✫</div>
        {avatar ? (
          <img src={avatar} className={s.avatar} alt={player} />
        ) : (
          <div className={s.avatar}>{player[0]}</div>
        )}
        <div>{player}</div>
      </div>
      <div className={s.score}>
        {declensionWords(score, ['очко', 'очка', 'очков'])}
      </div>
    </li>
  )
}

export default RatingCard
