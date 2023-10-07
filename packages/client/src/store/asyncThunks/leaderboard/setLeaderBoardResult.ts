import { createAsyncThunk } from '@reduxjs/toolkit'
import UserApi from '@/api/UserApi'
import LeaderBoardApi from '@/api/LeaderBoardApi'
import { getLeaderBoardResults } from '@/store/asyncThunks/leaderboard/getLeaderBoardResults'
import { leaderBoardParams } from '@/pages/LeaderBoard/LeaderBoard'

export const setLeaderBoardResult = createAsyncThunk<any, ILeaderBoardData>(
  'leaderboard/setResult',
  async (formData: ILeaderBoardData, { dispatch }) => {
    try {
      await LeaderBoardApi.setLeaderBoardResult({
        data: { ...formData },
        ratingFieldName: 'codeHuntersMemoryGameScore',
      })
      dispatch(getLeaderBoardResults(leaderBoardParams))
    } catch (e) {
      return `${e}`
    }
  }
)
