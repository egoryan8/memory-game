import { act, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '@/store'
import App from '@/App'
import { setUserData } from '@/store/features/userSlice'
import { mockUser } from '@/test/__mocks__/mockUser'
import React from 'react'
import { mockUseCanvas } from '@/test/__mocks__/mockUseCanvas'
import { mockFetch } from '@/test/__mocks__/mockFetch'

jest.mock('@/hooks/useCanvas')

describe('Main test', () => {
  beforeEach(() => {
    mockUseCanvas()
    mockFetch()
  })

  afterEach(() => (global.fetch = fetch))

  it('The Play button should be active when the game mode is selected and lead to the game page when clicked', async () => {
    let mode: HTMLElement
    let startGame: HTMLElement
    let exit: HTMLElement

    act(() => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      )
      store.dispatch(setUserData(mockUser as IUser))
    })
    // Проверяем доступность кнопки перехода к игре при выборе режимов
    for (const gameMode of ['4X4', '6X6', '6X10']) {
      mode = await screen.findByText(gameMode)
      startGame = screen.getAllByText('Играть').at(1) as HTMLElement
      expect(mode).toBeDefined()
      act(() => {
        mode.click()
        startGame.click()
      })
      // Проверяем, что мы на странице с игрой, саму кнопку не нажимаем, так как будет задействован canvas
      // который замокан
      expect(screen.findByText('ПОЕХАЛИ!')).toBeDefined()
      // Возвращаемся на главную страницу
      exit = await screen.findByText('Выход')
      exit.click()
    }
  })
})
