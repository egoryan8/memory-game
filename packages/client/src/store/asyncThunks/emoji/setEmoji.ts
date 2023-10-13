import { createAsyncThunk } from '@reduxjs/toolkit'
import { getEmoji } from '@/store/asyncThunks/emoji/getEmoji'
import { EmojiApi } from '@/api/EmojiApi'

export const setEmoji = createAsyncThunk<any, IEmojiData>(
  'setEmoji',
  async (formData: IEmojiData, { dispatch }) => {
    try {
      await EmojiApi.setEmoji({ ...formData })
      dispatch(
        getEmoji({
          userId: formData.userId,
          topicId: formData.topicId,
          commentId: formData.commentId,
        })
      )
    } catch (e) {
      return `${e}`
    }
  }
)
