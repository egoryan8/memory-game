import HTTPClient, { HTTPClientT, METHOD } from './HTTPClient'
import { setupFetchStub } from '@/test/setupFetchStub'

describe('HTTPClient', () => {
  let client: HTTPClientT

  beforeEach(() => {
    client = HTTPClient()
  })

  afterEach(() => {
    global.fetch = fetch
    jest.restoreAllMocks()
  })

  it('should send a GET request', async () => {
    const response = { data: 'Response data' }
    global.fetch = jest
      .fn()
      .mockImplementation(setupFetchStub(response as unknown as Response))

    const result = await client.get('/endpoint')

    expect(result).toEqual(response)
    expect(fetch).toHaveBeenCalledWith(
      'https://ya-praktikum.tech/api/v2/endpoint',
      {
        credentials: 'include',
        mode: 'cors',
        method: METHOD.GET,
      }
    )
  })

  it('should send a POST request', async () => {
    const response = { data: 'Response data' }
    global.fetch = jest
      .fn()
      .mockImplementation(setupFetchStub(response as unknown as Response))

    const body = { name: 'John', age: 30 }
    const result = await client.post('/endpoint', { body: body as never })

    expect(result).toEqual(response)
    expect(fetch).toHaveBeenCalledWith(
      'https://ya-praktikum.tech/api/v2/endpoint',
      {
        credentials: 'include',
        mode: 'cors',
        method: METHOD.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
  })

  it('should send a PUT request', async () => {
    const response = { data: 'Response data' }
    global.fetch = jest
      .fn()
      .mockImplementation(setupFetchStub(response as unknown as Response))

    const body = { name: 'John', age: 30 }
    const result = await client.put('/endpoint', { body: body as never })

    expect(result).toEqual(response)
    expect(fetch).toHaveBeenCalledWith(
      'https://ya-praktikum.tech/api/v2/endpoint',
      {
        credentials: 'include',
        mode: 'cors',
        method: METHOD.PUT,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
  })

  it('should send a PUT request without JSON body', async () => {
    const response = { data: 'Response data' }
    global.fetch = jest
      .fn()
      .mockImplementation(setupFetchStub(response as unknown as Response))

    const result = await client.putFile('/endpoint')

    expect(result).toEqual(response)
    expect(fetch).toHaveBeenCalledWith(
      'https://ya-praktikum.tech/api/v2/endpoint',
      {
        credentials: 'include',
        mode: 'cors',
        method: METHOD.PUT,
        headers: {},
      }
    )
  })

  it('should send a DELETE request', async () => {
    const response = { data: 'Response data' }
    global.fetch = jest
      .fn()
      .mockImplementation(setupFetchStub(response as unknown as Response))

    const result = await client.delete('/endpoint')

    expect(result).toEqual(response)
    expect(fetch).toHaveBeenCalledWith(
      'https://ya-praktikum.tech/api/v2/endpoint',
      {
        credentials: 'include',
        mode: 'cors',
        method: METHOD.DELETE,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  })
})
