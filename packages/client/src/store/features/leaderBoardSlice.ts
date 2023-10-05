import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ILeaderBoardState {
  leaders: ILeaderBoardData[] | null
  error: string | null
}

const initialState: ILeaderBoardState = {
  leaders: null,
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
})

export const { setLeaders, setLeadersError } = leaderBoardSlice.actions
export const leaderBoardSelector = (state: {
  leaderBoardStore: ILeaderBoardState
}) => state.leaderBoardStore
export default leaderBoardSlice.reducer
