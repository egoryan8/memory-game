import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthApi from '@/api/AuthApi'

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    const { data } = await AuthApi.logout()
    return data
  } catch (e) {
    return null
  }
})
