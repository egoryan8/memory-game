import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getEmoji } from '@/store/asyncThunks/emoji/getEmoji'
import { setEmoji } from '@/store/asyncThunks/emoji/setEmoji'

export interface IEmojiState {
  emojiList: IEmojiResult[] | null
  error: string | null
}

const initialState: IEmojiState = {
  emojiList: null,
  error: null,
}

const emojiSlice = createSlice({
  name: 'emoji',
  initialState,
  reducers: {
    setEmojiList: (
      state,
      { payload }: PayloadAction<IEmojiResult[] | null>
    ) => {
      state.emojiList = payload
    },
    setEmojiError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getEmoji.fulfilled, (store, action) => {
      const { payload } = action
      store.emojiList = payload
    })

    builder.addCase(getEmoji.rejected, (store, action) => {
      const { payload } = action
      store.error = `Failed to get emoji: ${payload}`
    })

    builder.addCase(setEmoji.rejected, (store, action) => {
      const { payload } = action
      store.error = `Failed to set emoji: ${payload}`
    })
  },
})

export const { setEmojiList, setEmojiError } = emojiSlice.actions
export const emojiSelector = (state: { emojiList: IEmojiState }) =>
  state.emojiList
export default emojiSlice.reducer
