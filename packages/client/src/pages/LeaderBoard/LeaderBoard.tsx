import RatingCard from '@/components/RatingCard/RatingCard'
import s from './LeaderBoard.module.scss'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import React, { useEffect } from 'react'
import { BASE_URI } from '@/utils/HTTPClient'
import { leaderBoardSelector } from '@/store/slices/leaderBoardSlice'
import { getLeaderBoardResults } from '@/store/asyncThunks/leaderboard/getLeaderBoardResults'

export const leaderBoardParams = {
  ratingFieldName: 'codeHuntersMemoryGameScore',
  cursor: 0,
  limit: 100,
}

const LeaderBoard: React.FC = () => {
  const leaderList = useAppSelector(leaderBoardSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getLeaderBoardResults(leaderBoardParams))
  }, [])

  const bestPlayers = (leaderList || []).map((leader, index) => {
    const { userData, codeHuntersMemoryGameScore } = leader

    return (
      <RatingCard
        key={userData.id}
        userId={userData.id}
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
    <div className="page">
      <div className="content-wrapper">
        <h1>ТОП-100 игроков</h1>
        <div className={s.container}>{bestPlayers}</div>
      </div>
    </div>
  )
}

export default LeaderBoard
