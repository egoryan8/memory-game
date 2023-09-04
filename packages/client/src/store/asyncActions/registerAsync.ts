import useStore from '@/store'
import AuthApi from '@/api/AuthApi'

const registerAsync = () => {
  return {
    registerAsync: async (data: IUser) => {
      const state = useStore.getState()
      const { user, fetchUserAsync } = state
      let flag = false
      if (user.data) return

      try {
        const response = await AuthApi.register(data)

        switch (response.status) {
          case 200:
            flag = true
            break
          default:
            console.log('REGISTER_FAILED', response)
            flag = false
            break
        }
      } catch (e) {
        console.log('REGISTER_FAILED', (e as Error).message)
      } finally {
        if (flag) fetchUserAsync()
      }
    },
  }
}

export default registerAsync
