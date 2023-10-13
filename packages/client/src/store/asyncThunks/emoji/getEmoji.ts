import { createAsyncThunk } from '@reduxjs/toolkit'
import EmojiApi from '@/api/EmojiApi'

export const getEmoji = createAsyncThunk<IEmojiResult[] | null, IEmojiParams>(
  'emoji',
  async (params: IEmojiParams) => {
    try {
      const { data } = await EmojiApi.getEmoji(params)
      return data.map(
        (item: { data: IEmojiResult }) => item.data
      ) as IEmojiResult[]
    } catch (e) {
      return null
    }
  }
)
