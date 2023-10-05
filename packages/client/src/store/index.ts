import { ThunkAction } from 'redux-thunk'
import { Action, configureStore } from '@reduxjs/toolkit'
import userSliceReducer from '@/store/features/userSlice'
import gameSliceReducer from '@/store/features/gameSlice'
import leaderBoardReducer from '@/store/features/leaderBoardSlice'

const store = configureStore({
  reducer: {
    userStore: userSliceReducer,
    gameStore: gameSliceReducer,
    leaderBoardStore: leaderBoardReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
