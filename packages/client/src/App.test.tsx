import App from './App'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  //render(<App />)
  act(() => {
    expect(screen.findByText('ВОЙТИ')).toBeDefined()
  })
})
