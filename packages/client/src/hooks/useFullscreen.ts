import { RefObject, useEffect, useRef, useState } from 'react'

const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const ref = useRef(null) as RefObject<HTMLDivElement>

  const enter = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      })
    } else if (ref.current) {
      ref.current.requestFullscreen().then(() => {
        setIsFullscreen(true)
      })
    } else {
      document.body.requestFullscreen().then(() => {
        setIsFullscreen(true)
      })
    }
  }

  const exit = () => {
    document.exitFullscreen().then(() => {
      setIsFullscreen(false)
    })
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [])

  return { isFullscreen, ref, enter, exit }
}

export default useFullscreen
