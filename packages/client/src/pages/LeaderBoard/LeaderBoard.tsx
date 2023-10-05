import Navigation from '@/components/Navigation/Navigation'
import RatingCard from '@/components/RatingCard/RatingCard'
import s from './LeaderBoard.module.scss'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import React, { useEffect } from 'react'
import getLeaderBoardResults from '@/store/asyncActions/leaderboard/getLeaderBoardResults'
import { BASE_URI } from '@/utils/HTTPClient'

const LeaderBoard: React.FC = () => {
  const leaderList = useAppSelector(state => state.leaderBoardStore.leaders)
  const dispatch = useAppDispatch()

  console.log(leaderList)

  useEffect(() => {
    const params = {
      ratingFieldName: 'codeHuntersMemoryGameScore',
      cursor: 0,
      limit: 1000,
    }

    ;(async () => {
      await dispatch(getLeaderBoardResults(params))
    })()
  }, [])

  const bestPlayers = (leaderList || []).map((leader, index) => {
    const { userData, codeHuntersMemoryGameScore } = leader

    return (
      <RatingCard
        key={userData.id}
        place={index + 1}
        player={userData.display_name || userData.first_name}
        avatar={
          userData.avatar ? `${BASE_URI}/resources${userData.avatar}` : null
        }
        score={codeHuntersMemoryGameScore}
      />
    )
  })

  return (
    <div className={s.page}>
      <Navigation />
      <div className={s.leaderboard}>
        <h1 className={s.title}>Рейтинг игроков</h1>
        <ul>{bestPlayers}</ul>
      </div>
    </div>
  )
}

export default LeaderBoard
