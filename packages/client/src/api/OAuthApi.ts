import HTTPClient, { REDIRECT_URI } from '@/utils/HTTPClient'

function OAuthApi() {
  const client = HTTPClient('/oauth/yandex')
  const sendAuthCode = async (code: string) =>
    await client.post('', { code, redirect_uri: REDIRECT_URI })

  const fetchServiceId = async () => {
    try {
      const { data } = await client.get(
        `/service-id?redirect_uri=${REDIRECT_URI}`
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
