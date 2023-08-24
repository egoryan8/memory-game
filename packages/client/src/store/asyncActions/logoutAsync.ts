import useStore from '@/store'
import AuthApi from '@/api/AuthApi'

const logoutAsync = () => ({
  logoutAsync: () => {
    const state = useStore.getState()
    const { logout } = state

    ;(async () => {
      AuthApi.logout()
        .then(async response => {
          return {
            status: response.status,
            text: await response.text(),
          }
        })
        .then(response => {
          switch (response.status) {
            case 200:
              logout()
              break
            default: {
              console.log('LOGOUT_FAILED', response)
            }
          }
        })
        .catch(e => console.log('LOGOUT_FAILED', e.message))
    })()
  },
})

export default logoutAsync
