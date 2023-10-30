import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchTrendingGifs = createAsyncThunk(
  'giphy/fetchTrendingGifs',
  async (searchTerm: string) => {
    const API_URL = 'https://api.giphy.com/v1/gifs/'
    const API_KEY = '3PcGRLW2m1W4qTR6e7U78EyXtFhE37Sg'
    let endpoint = ''

    if (searchTerm) {
      endpoint = `${API_URL}search?api_key=${API_KEY}&q=${searchTerm}&limit=24&rating=Y&lang=en`
    } else {
      endpoint = `${API_URL}trending?api_key=${API_KEY}&limit=24&offset=0&rating=Y&lang=en`
    }

    const { data } = await axios.get(endpoint)

    return data.data
  }
)
