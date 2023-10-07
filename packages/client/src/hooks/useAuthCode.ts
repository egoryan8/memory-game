import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { oauthLogin } from '@/store/asyncThunks/auth/oauthLogin'
import { REDIRECT_URI } from '@/utils/HTTPClient'

const getAuthCode = () => new URLSearchParams(location.search).get('code')
export const useAuthCode = () => {
  const [authCode, setAuthCode] = useState(getAuthCode())
  const dispatch = useAppDispatch()

  useEffect(() => {
    const code = getAuthCode()
    if (code) {
      setAuthCode(code)
      dispatch(oauthLogin({ authCode: code, redirectUri: REDIRECT_URI }))
    }
  }, [])

  return { authCode }
}
