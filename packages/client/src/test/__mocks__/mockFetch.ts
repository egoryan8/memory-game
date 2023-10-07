import { setupFetchStub } from '@/test/setupFetchStub'
import { AxiosResponse } from 'axios'

export const mockFetch = () => {
  const response = {
    json: () => Promise.resolve('hey'),
    text: () => Promise.resolve('hey'),
  }
  global.fetch = jest
    .fn()
    .mockImplementation(setupFetchStub(response as unknown as AxiosResponse))
}
