import { fetchTrendingGifs } from '@/store/asyncThunks/giphy/fetchTrendingGifs'
import { loadMoreGifs } from '@/store/asyncThunks/giphy/loadMoreGifs'
import { createSlice } from '@reduxjs/toolkit'

export interface IGiphyState {
  items: IGiphyData[] | []
  status: string
  error: null
  page: number
}

const initialState: IGiphyState = {
  items: [],
  status: 'loading',
  error: null,
  page: 1,
}

const giphySlice = createSlice({
  name: 'giphy',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTrendingGifs.pending, state => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchTrendingGifs.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchTrendingGifs.rejected, state => {
      state.status = 'error'
      state.items = []
    })

    builder.addCase(loadMoreGifs.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(loadMoreGifs.fulfilled, (state, action) => {
      state.items = [...state.items, ...action.payload]
      state.page = state.page + 1
      state.status = 'success'
    })
    builder.addCase(loadMoreGifs.rejected, state => {
      state.status = 'error'
      state.items = []
    })
  },
})

export const giphySelector = (state: { giphy: IGiphyState }) => state.giphy
export default giphySlice.reducer
