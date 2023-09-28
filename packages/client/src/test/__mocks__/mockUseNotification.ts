import useNotification from '@/hooks/useNotification'

export const mockUseNotification = () => {
  const mockedUseNotification = useNotification as jest.Mock

  mockedUseNotification.mockImplementation(() => {
    // Здесь вы можете вернуть любые значения или функции, которые вам нужны для тестирования
    return {
      notifyUser: jest.fn(),
      isGranted: true,
    }
  })
}
