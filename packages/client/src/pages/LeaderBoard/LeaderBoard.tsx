import Navigation from '@/components/Navigation/Navigation'
import RatingCard from '@/components/RatingCard/RatingCard'
import leadersConfig from '@/config/leadersConfig'
import s from './LeaderBoard.module.scss'

const LeaderBoard = () => {
  const bestPlayers = leadersConfig.map(leader => {
    const { id, isUser, player, position, score } = leader

    return (
      <RatingCard
        key={id}
        isUser={isUser}
        player={player}
        position={position}
        score={score}
      />
    )
  })

  return (
    <div className={s.page}>
      <Navigation />
      <div className={s.leaderboard}>
        <h1 className={s.title}>Лучшие игроки</h1>
        <ul>{bestPlayers}</ul>
      </div>
    </div>
  )
}

export default LeaderBoard
