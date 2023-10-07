import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthApi from '@/api/AuthApi'
import { loadUser } from '@/store/asyncThunks/auth/loadUser'

export const login = createAsyncThunk<void, ILogin>(
  'user/login',
  async (formData, { dispatch }) => {
    await AuthApi.login(formData)
    dispatch(loadUser())
  }
)
