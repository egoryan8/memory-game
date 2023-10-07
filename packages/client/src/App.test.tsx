import App from './App'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import createStore from '@/store'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { mockFetch } from '@/test/__mocks__/mockFetch'
import AuthApi from '@/api/AuthApi'
import { BrowserRouter } from 'react-router-dom'
import { mockUser } from '@/test/__mocks__/mockUser'
import { setUserData } from '@/store/slices/userSlice'
import { mockInitialState } from '@/test/__mocks__/mockInitialState'

describe('App test', () => {
  beforeEach(() => mockFetch())
  afterEach(() => (global.fetch = fetch))

  it('Initial test', async () => {
    const store = createStore(AuthApi.getUser)
    act(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      )
    })
    expect(screen.findByText('ВОЙТИ')).toBeDefined()
  })

  it('Check auth action', async () => {
    const store = createStore(AuthApi.getUser, mockInitialState)

    act(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      )
    })

    expect(screen.findByText('ЗАПОМНИ СВОЙ СТЕК')).toBeDefined()
    store.dispatch(setUserData(null))
    expect(screen.findByText('ВОЙТИ')).toBeDefined()
  })
})
