import App from './App'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '@/store'
import React from 'react'
import { setUserData } from '@/store/features/userSlice'
import { mockUser } from '@/test/__mocks__/mockUser'
import { act } from 'react-dom/test-utils'
import { mockFetch } from '@/test/__mocks__/mockFetch'
import { BrowserRouter } from 'react-router-dom'

describe('App test', () => {
  beforeEach(() => mockFetch())
  afterEach(() => (global.fetch = fetch))

  it('Initial test', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.findByText('ВОЙТИ')).toBeDefined()
  })

  it('Check auth action', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      )
      store.dispatch(setUserData(mockUser as IUser))
    })

    expect(screen.findByText('ЗАПОМНИ СВОЙ СТЕК')).toBeDefined()
    store.dispatch(setUserData(null))
    expect(screen.findByText('ВОЙТИ')).toBeDefined()
  })
})
