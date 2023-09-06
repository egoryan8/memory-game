import UserApi from '@/api/UserApi'
import { AppThunk } from '@/store'
import { setUserData, setUserError } from '@/store/features/userSlice'

const editAvatar =
  (formData: File): AppThunk =>
  async dispatch => {
    try {
      const response = await UserApi.editAvatar(formData)

      if (response.status === 200) {
        const userData = await response.json()
        dispatch(setUserData(userData))
      } else {
        const text = await response.text()
        dispatch(setUserError(`CHANGE_AVATAR_FAILED: ${text}`))
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

export default editAvatar
