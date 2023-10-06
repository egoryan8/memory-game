import { AxiosResponse } from 'axios'

export const setupFetchStub = (data: AxiosResponse) => (url: string) =>
  new Promise(resolve => resolve(data))
declare const __SERVER_PORT__: number
