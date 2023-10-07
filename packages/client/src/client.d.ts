import { RootState } from '@/store'

export {}

declare const __SERVER_PORT__: number

declare global {
  interface Window {
    initialState?: RootState
  }
}
