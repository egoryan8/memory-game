import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthApi from '@/api/AuthApi'
import { loadUser } from '@/store/asyncThunks/auth/loadUser'

export const register = createAsyncThunk<void, IUser>(
  'user/register',
  async (formData, { dispatch }) => {
    await AuthApi.register(formData)
    dispatch(loadUser())
  }
)
