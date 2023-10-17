import { declensionWords } from '@/utils/declensionWords'
import s from './RatingCard.module.scss'
import { useAppSelector } from '@/hooks/useAppSelector'
import { userSelector } from '@/store/slices/userSlice'

interface RatingCardProps {
  place: number
  player: string
  score: number
  userId?: number
  avatar?: string | null
}

const RatingCard = ({
  userId,
  place,
  avatar,
  player,
  score,
}: RatingCardProps) => {
  const user = useAppSelector(userSelector)
  const icons: { [key: number]: string } = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
  }

  return (
    <div
      className={`${s.player} ${
        userId === user.data?.id ? s.currentUser : s.user
      }`}>
      <div className={s.left}>
        <div className={s.position}>{icons[place] || place}</div>
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
    </div>
  )
}

export default RatingCard
