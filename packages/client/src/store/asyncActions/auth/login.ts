import AuthApi from '@/api/AuthApi'
import { AppThunk } from '@/store'
import { setUserError } from '@/store/features/userSlice'
import fetchUser from '@/store/asyncActions/auth/fetchUser'

const login =
  (formData: ILogin): AppThunk =>
  async dispatch => {
    try {
      const response = await AuthApi.login(formData)
      const text = await response.text()
      if (
        response.status === 200 ||
        (response.status === 400 && text.includes('User already in system'))
      ) {
        dispatch(fetchUser())
      } else {
        dispatch(setUserError(`LOGIN_FAILED: ${response}`))
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

export default login
