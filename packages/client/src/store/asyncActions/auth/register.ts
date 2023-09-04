import AuthApi from '@/api/AuthApi'
import { AppThunk } from '@/store'
import { setUserError } from '@/store/features/userSlice'
import fetchUser from '@/store/asyncActions/auth/fetchUser'

const register =
  (formData: IUser): AppThunk =>
  async dispatch => {
    try {
      const response = await AuthApi.register(formData)

      if (response.status === 200) {
        dispatch(fetchUser())
      } else {
        const text = await response.text()
        dispatch(setUserError(`REGISTER_FAILED: ${text}`))
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

export default register
