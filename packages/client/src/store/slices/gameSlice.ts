import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IGameState {
  gameCols: number
}

const initialState: IGameState = {
  gameCols: 4,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameCols: (state, action: PayloadAction<number>) => {
      state.gameCols = action.payload
    },
  },
})

export const { setGameCols } = gameSlice.actions
export default gameSlice.reducer
