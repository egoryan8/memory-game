import { create, createStore } from 'zustand'

interface IState {
  isAuth: boolean
  loading: boolean
}

interface IStateActions {
  login: (isAuth: IState['isAuth']) => void
  logout: (isAuth: IState['isAuth']) => void
}

const useStore = create<IState & IStateActions>()(set => ({
  isAuth: false,
  loading: false,
  login: isAuth => set(() => ({ isAuth: isAuth })),
  logout: () => set(() => ({ isAuth: false })),
}))

export default useStore
