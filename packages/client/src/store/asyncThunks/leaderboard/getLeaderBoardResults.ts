import { createAsyncThunk } from '@reduxjs/toolkit'
import LeaderBoardApi from '@/api/LeaderBoardApi'

export const getLeaderBoardResults = createAsyncThunk<
  ILeaderBoardData[] | null,
  ILeaderBoardParams
>('leaderboard/getResults', async (params: ILeaderBoardParams) => {
  try {
    const { data } = await LeaderBoardApi.getLeaderBoardResults(params)
    return data.map(
      (item: { data: ILeaderBoardData }) => item.data
    ) as ILeaderBoardData[]
  } catch (e) {
    return null
  }
})
