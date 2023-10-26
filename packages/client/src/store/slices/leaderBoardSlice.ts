import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLeaderBoardResults } from '@/store/asyncThunks/leaderboard/getLeaderBoardResults'
import { setLeaderBoardResult } from '@/store/asyncThunks/leaderboard/setLeaderBoardResult'

export interface ILeaderBoardState {
  leaders: ILeaderBoardData[] | null
  oldLeaders: ILeaderBoardData[] | null
  error: string | null
}

const initialState: ILeaderBoardState = {
  leaders: null,
  oldLeaders: null,
  error: null,
}

const leaderBoardSlice = createSlice({
  name: 'leaderBoard',
  initialState,
  reducers: {
    setLeaders: (
      state,
      { payload }: PayloadAction<ILeaderBoardData[] | null>
    ) => {
      state.leaders = payload
    },
    setLeadersError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getLeaderBoardResults.fulfilled, (store, action) => {
      const { payload } = action
      store.oldLeaders = store.leaders
      store.leaders = payload
    })

    builder.addCase(getLeaderBoardResults.rejected, store => {
      store.error = 'Failed to get leaderboard results'
    })

    builder.addCase(setLeaderBoardResult.rejected, (store, action) => {
      const { payload } = action
      store.error = `Failed to set leaderboard results: ${payload}`
    })
  },
})

export const { setLeaders, setLeadersError } = leaderBoardSlice.actions
export const leaderBoardSelector = (state: {
  leaderBoard: ILeaderBoardState
}) => state.leaderBoard.leaders

export const oldLeaderBoardSelector = (state: {
  leaderBoard: ILeaderBoardState
}) => state.leaderBoard.oldLeaders

export default leaderBoardSlice.reducer
