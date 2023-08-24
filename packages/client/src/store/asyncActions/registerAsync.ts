import useStore from '@/store'
import AuthApi from '@/api/AuthApi'

const registerAsync = () => ({
  registerAsync: (data: IUser) => {
    const state = useStore.getState()
    const { user, fetchUserAsync } = state
    if (user.data) return
    ;(async () => {
      AuthApi.register(data)
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
            default: {
              console.log('REGISTER_FAILED', response)
              return false
            }
          }
        })
        .then(flag => {
          if (flag) fetchUserAsync()
        })
        .catch(e => console.log('REGISTER_FAILED', e.message))
    })()
  },
})

export default registerAsync
