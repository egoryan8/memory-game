import { useState } from 'react'

const useNotification = () => {
  const isSupported = 'Notification' in window && 'permission' in Notification
  const [isGranted, setIsGranted] = useState(
    isSupported && Notification.permission === 'granted'
  )

  const notifyUser = (title: string, body: string): void => {
    if (!isSupported) {
      console.log('Notification API не поддерживается вашим браузером')
      return
    } else if (isGranted) {
      const note = new Notification(title, { body })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const note = new Notification('Спасибо', {
            body: 'Вы будете получать уведомления от MemoryGame',
          })

          setIsGranted(true)
        }
      })
    }
  }

  return { notifyUser, isGranted }
}

export default useNotification
