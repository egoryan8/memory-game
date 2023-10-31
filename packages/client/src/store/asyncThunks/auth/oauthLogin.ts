import { createAsyncThunk } from '@reduxjs/toolkit'
import { loadUser } from '@/store/asyncThunks/auth/loadUser'
import OAuthApi from '@/api/OAuthApi'

export interface IOAuthLogin {
  authCode: string
  redirectUri: string
}
export const oauthLogin = createAsyncThunk<void, IOAuthLogin>(
  'user/oauthLogin',
  async ({ authCode }, { dispatch }) => {
    await OAuthApi.sendAuthCode(authCode)
    dispatch(loadUser())
  }
)
