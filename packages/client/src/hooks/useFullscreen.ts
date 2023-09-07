import { RefObject, useEffect, useRef, useState } from 'react'

declare global {
  interface Document {
    webkitFullscreenElement?: Element
    mozFullScreenElement?: Element
    msFullscreenElement?: Element
  }

  interface HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>
    mozRequestFullScreen?: () => Promise<void>
    msRequestFullscreen?: () => Promise<void>
  }
}

const getFullscreenElementProp = () => {
  if (typeof document.fullscreenElement !== 'undefined') {
    return 'fullscreenElement'
  } else if (typeof document.webkitFullscreenElement !== 'undefined') {
    return 'webkitFullscreenElement'
  } else if (typeof document.mozFullScreenElement !== 'undefined') {
    return 'mozFullScreenElement'
  } else if (typeof document.msFullscreenElement !== 'undefined') {
    return 'msFullscreenElement'
  } else {
    throw new Error(
      'property fullscreenElement is not supported by this browser'
    )
  }
}

const getRequestFullscreenProp = (element: HTMLElement) => {
  if (typeof element.requestFullscreen === 'function') {
    return element.requestFullscreen()
  } else if (typeof element.webkitRequestFullscreen === 'function') {
    return element.webkitRequestFullscreen()
  } else if (typeof element.mozRequestFullScreen === 'function') {
    return element.mozRequestFullScreen()
  } else if (typeof element.msRequestFullscreen === 'function') {
    return element.msRequestFullscreen()
  } else {
    throw new Error(
      'method requestFullscreen() is not supported by this browser'
    )
  }
}

const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const ref = useRef(null) as RefObject<HTMLElement>

  const enter = async () => {
    try {
      const elem = ref.current || document.body

      if (document[getFullscreenElementProp()]) {
        await document.exitFullscreen()
        setIsFullscreen(false)
      } else if (elem) {
        await getRequestFullscreenProp(elem)
      }
    } catch (error) {
      console.log('Error entering fullscreen:', error)
    }
  }

  const exit = async () => {
    try {
      await document.exitFullscreen()
      setIsFullscreen(false)
    } catch (error) {
      console.log('Error exiting fullscreen:', error)
    }
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document[getFullscreenElementProp()]))
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [])

  return { isFullscreen, ref, enter, exit }
}

export default useFullscreen
