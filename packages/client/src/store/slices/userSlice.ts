import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { logout } from '@/store/asyncThunks/auth/logout'
import { loadUser } from '@/store/asyncThunks/auth/loadUser'
import { updateAvatar } from '@/store/asyncThunks/user/updateAvatar'
import { updateProfile } from '@/store/asyncThunks/user/updateProfile'
import { oauthLogin } from '@/store/asyncThunks/auth/oauthLogin'

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
    setUserData: (state, { payload }: PayloadAction<IUser | null>) => {
      state.data = payload ? { ...state.data, ...payload } : payload
      state.loading = false
    },
  },
  extraReducers: builder => {
    builder.addCase(logout.fulfilled, store => {
      store.loading = false
      store.data = null
    })
    builder.addCase(oauthLogin.pending, store => {
      store.loading = true
    })
    builder.addCase(loadUser.pending, store => {
      store.loading = true
    })
    builder.addCase(loadUser.rejected, store => {
      store.loading = false
      store.data = null
    })
    builder.addCase(loadUser.fulfilled, (store, action) => {
      const { payload } = action
      store.loading = false
      store.data = payload
    })
    builder.addCase(updateAvatar.fulfilled, (store, action) => {
      const { payload } = action
      store.loading = false
      if (payload) store.data = payload
    })
    builder.addCase(updateProfile.fulfilled, (store, action) => {
      const { payload } = action
      store.loading = false
      if (payload) store.data = payload
    })
  },
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer
export const userSelector = (state: { user: IUserState }) => state.user
