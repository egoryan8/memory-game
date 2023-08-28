import UserApi from '@/api/UserApi'

const editProfileAsync = () => ({
  editProfileAsync: async (data: IUser) => {
    try {
      const response = await UserApi.editProfile(data)

      if (response.status === 200) {
        return true
      } else {
        console.log('EDIT_PROFILE_FAILED', response)
        return false
      }
    } catch (error) {
      console.error('An error occurred:', error)
      return false
    }
  },
})

export default editProfileAsync
