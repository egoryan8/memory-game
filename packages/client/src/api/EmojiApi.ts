import HTTPClient from '@/utils/HTTPClient'

function EmojiApi() {
  const client = HTTPClient('/emoji')

  const getEmoji = async (data: Partial<IEmojiData>) =>
    await client.post('/', data)

  const setEmoji = async (data: Partial<IEmojiData>) =>
    await client.post('/setEmoji', data)

  return Object.freeze({
    getEmoji,
    setEmoji,
  })
}

export default EmojiApi()
