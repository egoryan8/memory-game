import UserApi from '@/api/UserApi'
import useStore from '@/store'

const editAvatarAsync = {
  editAvatarAsync: async (data: File) => {
    try {
      const response = await UserApi.editAvatar(data)

      if (response.status === 200) {
        const userData = await response.json()
        useStore.setState(state => ({
          user: {
            ...state.user,
            data: userData,
          },
        }))
        return true
      } else {
        console.log('EDIT_AVATAR_FAILED', response)
        return false
      }
    } catch (error) {
      console.error('An error occurred:', error)
      return false
    }
  },
}

export default editAvatarAsync
