import { useCanvas } from '@/hooks/useCanvas'
export const mockUseCanvas = () => {
  const mockedUseCanvas = useCanvas as jest.Mock
  mockedUseCanvas.mockImplementation(() => {
    // Здесь вы можете вернуть любые значения или функции, которые вам нужны для тестирования
    return {
      animateSquare: jest.fn(),
      calculateCardPositions: jest.fn(),
      initializeGame: jest.fn(),
      drawTimer: jest.fn(),
      getCanvasContext: jest.fn(),
    }
  })
}
