import App from './App'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '@/store'
import React from 'react'
import { setUserData } from '@/store/features/userSlice'
import { mockUser } from '@/test/__mocks__/mockUser'
import { act } from 'react-dom/test-utils'
import { mockFetch } from '@/test/__mocks__/mockFetch'

describe('App test', () => {
  beforeEach(() => mockFetch())
  afterEach(() => (global.fetch = fetch))

  it('Initial test', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(screen.findByText('ВОЙТИ')).toBeDefined()
  })

  it('Check auth action', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      )
      store.dispatch(setUserData(mockUser as IUser))
    })

    expect(screen.findByText('ЗАПОМНИ СВОЙ СТЕК')).toBeDefined()
    store.dispatch(setUserData(null))
    expect(screen.findByText('ВОЙТИ')).toBeDefined()
  })
})
