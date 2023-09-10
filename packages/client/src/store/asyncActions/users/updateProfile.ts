import UserApi from '@/api/UserApi'
import { AppThunk } from '@/store'
import {
  setUserData,
  setUserError,
  setUserLoading,
} from '@/store/features/userSlice'

const updateProfile =
  (formData: IUser): AppThunk =>
  async dispatch => {
    try {
      const response = await UserApi.editProfile(formData)
      if (response.status === 200) {
        const userData = await response.json()
        dispatch(setUserData(userData))
      } else {
        const text = await response.text()
        dispatch(setUserError(`EDIT_PROFILE_FAILED: ${text}`))
      }
    } catch (error) {
      dispatch(setUserLoading(false))
      console.error('An error occurred:', error)
    }
  }

export default updateProfile
