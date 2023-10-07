import axios, { AxiosRequestConfig } from 'axios'
import * as process from 'process'

const port = 9000
export const REDIRECT_URI = `http://localhost:${port}`
export const BASE_URI = `${REDIRECT_URI}/api/v2`

function HTTPClient(baseUri = '') {
  const customAxios = axios.create({
    baseURL: BASE_URI,
    withCredentials: true,
  })

  const get = (url: string, body?: any, config?: AxiosRequestConfig) => {
    url = joinUrl(url)
    const queryParams = body ? `?${queryStringify(body)}` : ''
    url = `${url}${queryParams}`
    return customAxios.get(url, config)
  }

  const post = (url: string, body?: any, config?: AxiosRequestConfig) =>
    customAxios.post(joinUrl(url), JSON.stringify(body), {
      ...config,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    })

  const put = (url: string, body?: any, config?: AxiosRequestConfig) =>
    customAxios.put(joinUrl(url), JSON.stringify(body), {
      ...config,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    })

  const putFile = (url: string, body?: any, config?: AxiosRequestConfig) =>
    customAxios.put(joinUrl(url), body, config)

  const del = (url: string, config?: AxiosRequestConfig) =>
    customAxios.delete(joinUrl(url), config)

  const joinUrl = (urlPath: string) =>
    baseUri.includes('https:') ? baseUri + urlPath : baseUri + urlPath

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
