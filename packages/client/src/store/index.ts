import { ThunkAction } from 'redux-thunk'
import { Action, configureStore } from '@reduxjs/toolkit'
import userSliceReducer, { IUserState } from '@/store/slices/userSlice'
import gameSliceReducer, { IGameState } from '@/store/slices/gameSlice'
import leaderBoardReducer, {
  ILeaderBoardState,
} from '@/store/slices/leaderBoardSlice'
import themeReducer, { IThemeState } from '@/store/slices/themeSlice'

const createStore = (
  getUser: () => Promise<any | Response>,
  initialState?: RootState
) => {
  return configureStore({
    reducer: {
      user: userSliceReducer,
      game: gameSliceReducer,
      leaderBoard: leaderBoardReducer,
      theme: themeReducer,
    },
    preloadedState: initialState,
    devTools: process.env.NODE_ENV === 'development',
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: getUser,
        },
      })
    },
  })
}

export interface RootState {
  user: IUserState
  game: IGameState
  leaderBoard: ILeaderBoardState
  theme: IThemeState
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch']
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default createStore
