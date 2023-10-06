import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthApi from '@/api/AuthApi'
import { loadUser } from '@/store/asyncThunks/auth/loadUser'
import OAuthApi from '@/api/OAuthApi'
export interface IOAuthLogin {
  authCode: string
  redirectUri: string
}
export const oauthLogin = createAsyncThunk<void, IOAuthLogin>(
  'user/oauthLogin',
  async ({ authCode, redirectUri }, { dispatch }) => {
    const response = await OAuthApi.sendAuthCode(authCode, redirectUri)
    dispatch(loadUser())
  }
)
