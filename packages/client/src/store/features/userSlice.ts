import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface IUserState {
  loading?: boolean
  data?: IUser | null
  error?: string
}
const initialState: IUserState = {
  loading: false,
  data: null,
  error: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },

    setUserError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },

    setUserData: (state, { payload }: PayloadAction<IUser | null>) => {
      state.data = payload ? { ...state.data, ...payload } : payload
    },
  },
})

export const { setUserLoading, setUserError, setUserData } = userSlice.actions
export default userSlice.reducer
export const userSelector = (state: { userStore: IUserState }) =>
  state.userStore
