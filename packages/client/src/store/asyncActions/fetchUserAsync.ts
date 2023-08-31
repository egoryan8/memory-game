import useStore from '@/store'
import AuthApi from '@/api/AuthApi'

const fetchUserAsync = () => {
  return {
    fetchUserAsync: async () => {
      const state = useStore.getState()
      const { user, setUser } = state

      if (user.data) return

      setUser({ loading: true })

      try {
        const response = await AuthApi.getUser()
        const data = await response.json()

        switch (response.status) {
          case 200: {
            setUser({
              loading: false,
              data: data as IUser,
            })
            break
          }
          default: {
            setUser({ loading: false })
            console.log('GET_USER_FAILED', response)
          }
        }
      } catch (e) {
        setUser({ loading: false })
        console.log('GET_USER_FAILED', (e as Error).message)
      }
    },
  }
}

export default fetchUserAsync
