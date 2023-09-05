import App from './App'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import store from '@/store'
import React from 'react'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  act(() => {
    expect(screen.findByText('ВОЙТИ')).toBeDefined()
  })
})
