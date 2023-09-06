import AuthApi from '@/api/AuthApi'
import { AppThunk } from '@/store'
import { setUserData, setUserError } from '@/store/features/userSlice'

const logout = (): AppThunk => async dispatch => {
  try {
    const response = await AuthApi.logout()
    if (response.status === 200) {
      dispatch(setUserData(null))
    } else {
      const text = await response.text()
      dispatch(setUserError(`LOGIN_FAILED: ${text}`))
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

export default logout
