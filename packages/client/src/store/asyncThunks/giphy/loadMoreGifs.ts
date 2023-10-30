import { RootState } from '@/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loadMoreGifs = createAsyncThunk(
  'giphy/loadMoreGifs',
  async (searchTerm: string, thunkAPI) => {
    const API_URL = 'https://api.giphy.com/v1/gifs/'
    const API_KEY = '3PcGRLW2m1W4qTR6e7U78EyXtFhE37Sg'
    let endpoint = ''

    const state = thunkAPI.getState() as RootState
    const page = state.giphy.page

    if (searchTerm) {
      endpoint = `${API_URL}search?q=${searchTerm}&api_key=${API_KEY}&limit=24&offset=${
        page * 24
      }&rating=Y&lang=en`
    } else {
      endpoint = `${API_URL}trending?api_key=${API_KEY}&limit=24&offset=${
        page * 24
      }&rating=Y&lang=en`
    }

    const { data } = await axios.get(endpoint)

    return data.data
  }
)
