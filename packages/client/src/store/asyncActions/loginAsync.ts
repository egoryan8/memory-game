import useStore from '@/store'
import AuthApi from '@/api/AuthApi'

const loginAsync = () => {
  return {
    loginAsync: async (data: ILogin) => {
      const state = useStore.getState()
      const { user, fetchUserAsync } = state
      let flag = false
      if (user.data) return

      try {
        const response = await AuthApi.login(data)
        const text = await response.text()

        switch (response.status) {
          case 200:
            flag = true
            break
          case 400:
            flag = text.includes('User already in system')
            break
          default:
            console.log('LOGIN_FAILED', response)
            flag = false
        }
      } catch (e) {
        console.log('LOGIN_FAILED', (e as Error).message)
      } finally {
        if (flag) fetchUserAsync()
      }
    },
  }
}

export default loginAsync
