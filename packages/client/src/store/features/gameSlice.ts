import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IGameState {
  gameCols: number
}

const initialGameCols =
  typeof window !== 'undefined' ? localStorage.getItem('gameCols') : false

const initialState: IGameState = {
  gameCols: initialGameCols ? parseInt(initialGameCols, 10) : 4,
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
