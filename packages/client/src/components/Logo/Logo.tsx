import React, { useState, useEffect } from 'react'
import { randomSortedIcons } from '@/config/gameConfig'
import defaultLogo from '@/assets/images/other/default-logo-white.svg'
import style from './Logo.module.scss'

interface logoProps {
  logo?: boolean
  letter?: string
  big?: boolean
}

const LogoFlipper: React.FC<logoProps> = ({
  logo = true,
  letter = null,
  big = false,
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [backLogo, setBackLogo] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleClick = () => {
    if (isFlipped) return

    const randomIndex: number = Math.floor(
      Math.random() * randomSortedIcons().length
    )
    setBackLogo(randomSortedIcons()[randomIndex])
    setIsFlipped(true)
  }
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isFlipped) {
      timer = setTimeout(() => setIsFlipped(false), 3000)
    }

    return () => clearTimeout(timer)
  }, [isFlipped])

  useEffect(() => {
    let showTimer: NodeJS.Timeout

    if (!isHovered && !isFlipped && !logo) {
      const randomInterval = Math.floor(Math.random() * (30000 - 10000) + 5000)
      showTimer = setInterval(() => handleClick(), randomInterval)
    }

    return () => clearInterval(showTimer)
  }, [isHovered, isFlipped])

  return (
    <div
      className={`${logo ? style.logoContainer : style.noLogo} ${
        big && style.big
      }`}>
      <div
        className={`${style.logoFlipper} ${isFlipped && style.flipped}`}
        onClick={handleClick}>
        <div
          className={style.logoFront}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          {logo ? <img src={defaultLogo} alt="Front logo" /> : letter}
        </div>
        <div className={style.logoBack}>
          {backLogo && <img src={backLogo} alt="Back logo" />}
        </div>
      </div>
      {logo && 'Memory game'}
    </div>
  )
}

export default LogoFlipper
