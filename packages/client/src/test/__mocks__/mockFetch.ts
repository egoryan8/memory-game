import { setupFetchStub } from '@/test/setupFetchStub'

export const mockFetch = () => {
  const response = {
    json: () => Promise.resolve('hey'),
    text: () => Promise.resolve('hey'),
  }
  global.fetch = jest
    .fn()
    .mockImplementation(setupFetchStub(response as unknown as Response))
}
