import { create } from 'zustand'
import loginAsync from '@/store/asyncActions/loginAsync'
import { fetchUserAsync } from '@/store/asyncActions/fetchUserAsync'
import registerAsync from '@/store/asyncActions/registerAsync'
import logoutAsync from '@/store/asyncActions/logoutAsync'

interface IState {
  user: IUserState
}
interface IUserState {
  loading: boolean
  data?: IUser | null
}

interface IStateActions {
  logout: () => void
  setUser: (user: IState['user']) => void
  loginAsync: (data: ILogin) => void
  logoutAsync: () => void
  registerAsync: (data: IUser) => void
  fetchUserAsync: () => void
}

const useStore = create<IState & IStateActions>()(set => ({
  user: {
    loading: false,
    data: null,
  },
  logout: () =>
    set(() => ({
      user: { loading: false, data: null },
    })),
  setUser: userState => set(() => ({ user: userState })),
  ...loginAsync(),
  ...logoutAsync(),
  ...registerAsync(),
  ...fetchUserAsync(),
}))

export default useStore
