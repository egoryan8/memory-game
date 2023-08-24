import useStore from '@/store'
import AuthApi from '@/api/AuthApi'

const loginAsync = () => ({
  loginAsync: (data: ILogin) => {
    const state = useStore.getState()
    const { user, fetchUserAsync } = state
    if (user.data) return
    ;(async () => {
      AuthApi.login(data)
        .then(async response => {
          return {
            status: response.status,
            text: await response.text(),
          }
        })
        .then(response => {
          switch (response.status) {
            case 200:
              return true
            case 400:
              return response.text.includes('User already in system')
            default: {
              console.log('LOGIN_FAILED', response)
              return false
            }
          }
        })
        .then(flag => {
          if (flag) fetchUserAsync()
        })
        .catch(e => console.log('LOGIN_FAILED', e.message))
    })()
  },
})

export default loginAsync
