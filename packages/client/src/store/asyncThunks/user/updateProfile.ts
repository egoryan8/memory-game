import { createAsyncThunk } from '@reduxjs/toolkit'
import UserApi from '@/api/UserApi'

export const updateProfile = createAsyncThunk<IUser | null, IUser>(
  'user/updateProfile',
  async formData => {
    try {
      const { data } = await UserApi.editProfile(formData)
      return data as IUser
    } catch (e) {
      return null
    }
  }
)
