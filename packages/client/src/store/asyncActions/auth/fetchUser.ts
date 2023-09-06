import AuthApi from '@/api/AuthApi'
import { AppThunk } from '@/store'
import {
  setUserData,
  setUserError,
  setUserLoading,
} from '@/store/features/userSlice'

const fetchUser = (): AppThunk => async dispatch => {
  dispatch(setUserLoading(true))

  try {
    const response = await AuthApi.getUser()

    if (response.status === 200) {
      const data = await response.json()
      dispatch(setUserData(data as IUser))
    } else {
      const text = await response.text()
      dispatch(setUserError(`GET_USER_FAILED: ${text}`))
    }
  } catch (error) {
    console.error('An error occurred:', error)
  } finally {
    dispatch(setUserLoading(false))
  }
}

export default fetchUser
