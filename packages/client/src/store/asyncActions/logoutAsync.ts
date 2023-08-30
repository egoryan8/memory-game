import useStore from '@/store'
import AuthApi from '@/api/AuthApi'

const logoutAsync = () => {
  return {
    logoutAsync: async () => {
      const state = useStore.getState()
      const { logout } = state

      try {
        const response = await AuthApi.logout()
        const text = await response.text()

        switch (response.status) {
          case 200:
            logout()
            break
          default:
            console.log('LOGOUT_FAILED', response)
        }
      } catch (e) {
        console.log('LOGOUT_FAILED', (e as Error).message)
      }
    },
  }
}

export default logoutAsync
