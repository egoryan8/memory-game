import { createAsyncThunk } from '@reduxjs/toolkit'

export const loadUser = createAsyncThunk<IUser | null>(
  'user/load',
  async (_, thunkApi) => {
    try {
      const getUser = thunkApi.extra as () => Promise<any>
      const response = await getUser()
      return response.data as IUser
    } catch (e) {
      return null
    }
  }
)
