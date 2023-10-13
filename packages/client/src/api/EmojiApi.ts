import HTTPClient from '@/utils/HTTPClient'

const client = HTTPClient('/emoji')

const getEmoji = async (data: Partial<IEmojiData>) =>
  await client.post('/', data)

const setEmoji = async (data: Partial<IEmojiData>) =>
  await client.post('/setEmoji', data)

export const EmojiApi = {
  getEmoji,
  setEmoji,
} as const
