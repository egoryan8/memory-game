import React, { useState, useEffect, FC } from 'react'
import { randomSortedIcons } from '@/config/gameConfig'
import defaultLogo from '@/assets/images/other/default-logo-white.svg'

const LogoFlipper: FC = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [backLogo, setBackLogo] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleClick = () => {
    if (isFlipped) return

    const randomIndex: number = Math.floor(
      Math.random() * randomSortedIcons.length
    )
    setBackLogo(randomSortedIcons[randomIndex])
    setIsFlipped(true)
  }
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isFlipped) {
      timer = setTimeout(() => setIsFlipped(false), 2000)
    }

    return () => clearTimeout(timer)
  }, [isFlipped])

  useEffect(() => {
    let showTimer: NodeJS.Timeout

    if (!isHovered && !isFlipped) {
      showTimer = setInterval(() => handleClick(), 15000)
    }

    return () => clearInterval(showTimer)
  }, [isHovered, isFlipped])

  return (
    <div className="logo-container">
      <div
        className={`logo-flipper ${isFlipped && 'flipped'}`}
        onClick={handleClick}>
        <div
          className="logo-front"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <img src={defaultLogo} alt="Front logo" />
        </div>
        <div className="logo-back">
          {backLogo && <img src={backLogo} alt="Back logo" />}
        </div>
      </div>
      Memory game
    </div>
  )
}

export default LogoFlipper
