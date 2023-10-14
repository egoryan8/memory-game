import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IThemeState {
  theme: string
}

const initialTheme =
  typeof window !== 'undefined' ? localStorage.getItem('theme') : 'dark'

const initialState: IThemeState = {
  theme: initialTheme ? initialTheme : 'dark',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
