import UserApi from '@/api/UserApi'
import { AppThunk } from '@/store'
import { setUserError } from '@/store/features/userSlice'

const editPassword =
  (formData: IPassword): AppThunk =>
  async dispatch => {
    try {
      const response = await UserApi.editPassword(formData)

      if (response.status !== 200) {
        const text = await response.text()
        dispatch(setUserError('EDIT_PASSWORD_FAILED: ' + text))
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

export default editPassword
