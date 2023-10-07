import HTTPClient, { BASE_URI } from '@/utils/HTTPClient'

function OAuthApi() {
  const client = HTTPClient('/oauth/yandex')
  const sendAuthCode = async (code: string, redirectUri: string) =>
    await client.post('', { code, redirect_uri: redirectUri })

  const fetchServiceId = async (redirectUri: string) => {
    try {
      const { data } = await client.get(
        `/service-id?redirect_uri=${redirectUri}`
      )
      return data.service_id
    } catch (error) {
      console.error('Ошибка при получении service_id:', error)
    }
  }

  return Object.freeze({
    sendAuthCode,
    fetchServiceId,
  })
}

export default OAuthApi()
