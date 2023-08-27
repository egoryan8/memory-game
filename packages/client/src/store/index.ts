import { create } from 'zustand'
import loginAsync from '@/store/asyncActions/loginAsync'
import { fetchUserAsync } from '@/store/asyncActions/fetchUserAsync'
import registerAsync from '@/store/asyncActions/registerAsync'
import logoutAsync from '@/store/asyncActions/logoutAsync'
import editProfileAsync from '@/store/asyncActions/editProfileAsync'
import editAvatarAsync from '@/store/asyncActions/editAvatarAsync'
import editPasswordAsync from '@/store/asyncActions/editPasswordAsync'

export interface IState {
  user: IUserState
}
export interface IUserState {
  loading: boolean
  data?: IUser | null
}

export interface IStateActions {
  logout: () => void
  setUser: (user: IState['user']) => void
  loginAsync: (data: ILogin) => void
  logoutAsync: () => void
  registerAsync: (data: IUser) => void
  fetchUserAsync: () => void
  editProfileAsync: (data: IUser) => void
  editAvatarAsync: (data: File) => void
  editPasswordAsync: (data: IPassword) => void
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
  ...editProfileAsync(),
  ...editAvatarAsync(),
  ...editPasswordAsync(),
}))

export default useStore
