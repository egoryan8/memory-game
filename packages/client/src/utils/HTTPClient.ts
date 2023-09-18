export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const BASE_URI = 'https://ya-praktikum.tech/api/v2'
type HTTPMethod = (
  url: string,
  options?: Partial<RequestInit>
) => Promise<Response>

export type HTTPClientT = ReturnType<typeof HTTPClient>
function HTTPClient(baseUri = '') {
  const get: HTTPMethod = (url, options = {}) => {
    return fetchWithRetry(url, { ...options, method: METHOD.GET })
  }

  const post: HTTPMethod = (url, options = {}) =>
    fetchWithRetry(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(options.body),
      method: METHOD.POST,
    })

  const put: HTTPMethod = (url, options = {}) =>
    fetchWithRetry(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(options.body),
      method: METHOD.PUT,
    })

  const putFile: HTTPMethod = (url, options = {}) =>
    fetchWithRetry(url, {
      ...options,
      headers: {
        ...options.headers,
      },
      method: METHOD.PUT,
    })

  const del: HTTPMethod = (url, options = {}) =>
    fetchWithRetry(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      method: METHOD.DELETE,
    })

  const fetchWithRetry = (
    urlPath: string,
    options: Partial<RequestInit>
  ): Promise<Response> => {
    urlPath = baseUri.includes('https:')
      ? baseUri + urlPath
      : BASE_URI + baseUri + urlPath
    if (options.method === METHOD.GET) {
      const queryParams = options.body ? `?${queryStringify(options.body)}` : ''
      urlPath = `${urlPath}${queryParams}`
    }
    return fetch(urlPath, {
      credentials: 'include',
      mode: 'cors',
      ...options,
    })
  }

  return Object.freeze({
    get,
    post,
    put,
    putFile,
    delete: del,
  })
}

export default HTTPClient

export const queryStringify = (data: BodyInit) => {
  const params: string[] = []

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        params.push(
          `${encodeURIComponent(key)}[${i}]=${encodeURIComponent(value[i])}`
        )
      }
    } else if (typeof value === 'object' && value !== null) {
      const subParams = Object.keys(value)
      for (const subParam of subParams) {
        const val = queryStringify(value)
        params.push(
          `${encodeURIComponent(key)}[${subParam}]${
            val.includes('=') ? val.slice(1) : val
          }`
        )
      }
    } else {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }
  return params.join('&')
}
