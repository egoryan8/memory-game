import { createAsyncThunk } from '@reduxjs/toolkit'
import UserApi from '@/api/UserApi'

export const updateAvatar = createAsyncThunk<IUser | null, File>(
  'user/updateAvatar',
  async (formData: File) => {
    try {
      const { data } = await UserApi.editAvatar(formData)
      return data as IUser
    } catch (e) {
      return null
    }
  }
)
