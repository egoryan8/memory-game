import React, { useState, useEffect, FC } from 'react'
import { allIcons } from '@/config/gameConfig'
import defaultLogo from '@/assets/images/default-logo-white.svg'

const LogoFlipper: FC = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [backLogo, setBackLogo] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [shake, setShake] = useState<boolean>(false)

  const handleClick = () => {
    if (isFlipped) return
    const randomIndex: number = Math.floor(Math.random() * allIcons.length)
    setBackLogo(allIcons[randomIndex])
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
    let shakeTimer: NodeJS.Timeout

    if (!isHovered && !isFlipped) {
      shakeTimer = setInterval(() => {
        setShake(true)
        setTimeout(() => setShake(false), 2500)
      }, 10000)
    }

    return () => clearInterval(shakeTimer)
  }, [isHovered, isFlipped])

  return (
    <div className="logo-container">
      <div
        className={`logo-flipper ${isFlipped && 'flipped'}`}
        onClick={handleClick}>
        <div
          className={`logo-front ${shake && 'shake'}`}
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
