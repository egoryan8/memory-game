import UserApi from '@/api/UserApi'

const editPasswordAsync = () => ({
  editPasswordAsync: async (data: IPassword) => {
    try {
      const response = await UserApi.editPassword(data)

      if (response.status === 200) {
        return true
      } else {
        console.log('EDIT_PASSWORD_FAILED', response)
        return false
      }
    } catch (error) {
      console.error('An error occurred:', error)
      return false
    }
  },
})

export default editPasswordAsync
