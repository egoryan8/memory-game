import useStore from '@/store'
import AuthApi from '@/api/AuthApi'

export const fetchUserAsync = () => ({
  fetchUserAsync: () => {
    const state = useStore.getState()
    const { user, setUser } = state

    if (user.data) return

    setUser({ loading: true })

    ;(async () => {
      AuthApi.getUser()
        .then(async response => {
          return {
            status: response.status,
            body: await response.json(),
          }
        })
        .then(response => {
          switch (response.status) {
            case 200: {
              setUser({
                loading: false,
                data: response.body as unknown as IUser,
              })
              break
            }
            default: {
              setUser({ loading: false })
              console.log('GET_USER_FAILED', response)
            }
          }
        })
        .catch(e => {
          setUser({ loading: false })
          console.log('GET_USER_FAILED', e.message)
        })
    })()
  },
})
