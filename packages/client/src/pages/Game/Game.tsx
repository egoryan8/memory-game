import React, { useEffect, useRef, useState } from 'react'
import compressScreen from '@/assets/images/other/fs-compress-icon.svg'
import expandScreen from '@/assets/images/other/fs-expand-icon.svg'
import logOut from '@/assets/images/other/logout.svg'
import Button from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { AppPath } from '@/types/AppPath'
import useFullscreen from '@/hooks/useFullscreen'
import style from './Game.module.scss'
import { Card, useCanvas } from '@/hooks/useCanvas'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { userSelector } from '@/store/slices/userSlice'
import { setLeaderBoardResult } from '@/store/asyncThunks/leaderboard/setLeaderBoardResult'

const Game: React.FC = () => {
  const navigate = useNavigate()
  const fullscreen = useFullscreen()
  const user = useAppSelector(userSelector)

  const gameCols = useSelector((state: RootState) => state.game.gameCols)
  const dispatch = useAppDispatch()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [openCards, setOpenCards] = useState<number[]>([])
  const [timer, setTimer] = useState<number>(0)
  const [startCount, setStartCount] = useState<boolean>(false)
  const [startTimer, setStartTimer] = useState<boolean>(false)
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false)
  const [shouldRestartGame, setShouldRestartGame] = useState<boolean>(false)
  const [count, setCount] = useState<number>(3)
  const [attempts, setAttempts] = useState<number>(0)
  const [misses, setMisses] = useState<number>(0)
  const [points, setPoints] = useState<number>(0)
  const minutes = `${Math.floor(timer / 60)}`.padStart(2, '0')
  const seconds = `${timer % 60}`.padStart(2, '0')
  const {
    animateSquare,
    calculateCardPositions,
    totalGameCards,
    initializeGame,
    rows,
    cols,
    getCanvasContext,
    gameConfig,
    secondAnimationId,
    firstAnimationId,
  } = useCanvas(canvasRef, minutes, seconds, gameCols)

  const onMainClick = () => {
    navigate(AppPath.MAIN)
    fullscreen.isFullscreen && fullscreen.exit()
  }

  // Определение позиции мыши
  const getMousePosition = (
    event: React.MouseEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    return { mouseX, mouseY }
  }

  // Определение позиции мыши в рамках карточки
  const isMouseOverCard = (
    card: Card,
    mouseX: number,
    mouseY: number,
    cardSize: number
  ) => {
    const { x, y } = card.position
    return (
      mouseX >= x &&
      mouseX <= x + cardSize &&
      mouseY >= y &&
      mouseY <= y + cardSize
    )
  }

  // Обработка клика по canvas
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { canvas } = getCanvasContext(canvasRef)
    if (!canvas || !startTimer) return

    const { mouseX, mouseY } = getMousePosition(event, canvas)

    cards.forEach((card, index) => {
      if (isMouseOverCard(card, mouseX, mouseY, gameConfig.cardSize)) {
        if (card.isMatched || card.isOpen || card.isClicked) return

        setOpenCards(prevOpenCards => [...prevOpenCards, index])
        animateSquare(card)
      }
    })
  }

  // Отображение курсора
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { mouseX, mouseY } = getMousePosition(event, canvas)

    const isOverBox = cards.some(card => {
      if (!timer || card.isMatched || card.isOpen || card.isClicked) return

      return isMouseOverCard(card, mouseX, mouseY, gameConfig.cardSize)
    })

    canvas.style.cursor = isOverBox ? 'pointer' : 'default'
  }

  const flipCards = (cards: Card[]) => {
    cards.forEach(card => animateSquare(card))
  }

  const handleStartGame = () => {
    flipCards(cards)
    setStartCount(true)
    setTimeout(() => {
      flipCards(cards)
      setStartTimer(true)
    }, 3000)
  }

  const handleRestartGame = () => {
    setStartCount(true)
    setCards(calculateCardPositions())
    initializeGame(calculateCardPositions())
    setTimer(0)
    setMatchedPairs(0)
    setMisses(0)
    setAttempts(0)
    setPoints(0)
    setIsGameEnded(false)
    setShouldRestartGame(true)
  }

  useEffect(() => {
    if (canvasRef.current) {
      setCards(calculateCardPositions())
      initializeGame(calculateCardPositions())
    }
    return () => {
      if (firstAnimationId) cancelAnimationFrame(firstAnimationId)
      if (secondAnimationId) cancelAnimationFrame(secondAnimationId)
    }
  }, [])

  // Отсчет до начала игры
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null // указываем тип явно

    if (startCount && count > 0) {
      timerId = setTimeout(() => {
        setCount(prev => prev - 1)
      }, 1000)
    }

    if (count === 0) {
      setStartCount(false)
      setCount(3)
    }

    // Функция очистки
    return () => {
      if (timerId) {
        clearTimeout(timerId) // очищаем таймер при размонтировании или при изменении зависимостей
      }
    }
  }, [startCount, count])

  // Перезапуск игры
  useEffect(() => {
    if (shouldRestartGame) {
      handleStartGame() // Вызываем handleStartGame только после того, как cards обновятся
      setShouldRestartGame(false) // Сбрасываем флаг перезапуска игры
    }
  }, [cards])

  // Запускаем таймер
  useEffect(() => {
    if (!startTimer) return

    const timerId = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1)
    }, 1000)

    return () => clearInterval(timerId) // Очистка таймера при размонтировании компонента
  }, [startTimer])

  // Логика поиска пар
  useEffect(() => {
    if (openCards.length === 2) {
      const [firstIndex, secondIndex] = openCards
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      if (firstCard.fileName === secondCard.fileName) {
        setMatchedPairs(matchedPairs + 1)
        setPoints(point => point + 50)
        setCards(prevCards => {
          const newCards = [...prevCards]
          newCards[firstIndex].isMatched = true
          newCards[secondIndex].isMatched = true
          return newCards
        })
      } else {
        // Закрываем неправильных карточек
        if (points !== 0) setPoints(point => point - gameCols)
        setMisses(miss => miss + 1)
        setTimeout(() => {
          animateSquare(firstCard)
          animateSquare(secondCard)
        }, 1000)
      }
      setOpenCards([])
      setAttempts(prev => prev + 1)
    }
  }, [openCards])

  // Логика завершения игры победой и отображение кнопки перезапуска
  useEffect(() => {
    if (matchedPairs === totalGameCards / 2) {
      setCards([])
      setStartTimer(false)
      setIsGameEnded(true)

      let gameResult = points

      if (attempts === matchedPairs) gameResult = gameResult - timer + 100
      else gameResult = gameResult - timer

      setPoints(gameResult)

      if (user.data) {
        dispatch(
          setLeaderBoardResult({
            userData: user.data,
            codeHuntersMemoryGameScore: Math.round(gameResult),
          })
        )
      }

      setTimeout(() => {
        flipCards(cards)
      }, 1000)
    }
  }, [matchedPairs])

  return (
    <>
      <main className={style.wrapper}>
        <div className={style.field}>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
          />
          <div className={style.points}>
            <ul className={style.options}>
              <li className={style.option}>
                <span className={style.optionName}>Отгадано</span>
                <span className={style.optionValue}>
                  {matchedPairs * 2} из {cols * rows}
                </span>
              </li>
              <li className={style.option}>
                <span className={style.optionName}>Попыток</span>
                <span className={style.optionValue}>{attempts}</span>
              </li>
              <li className={style.option}>
                <span className={style.optionName}>Ошибок</span>
                <span className={style.optionValue}>{misses}</span>
              </li>
            </ul>
          </div>
          <div className={style.footer}>
            <div className={style.buttons}>
              {!fullscreen.isFullscreen ? (
                <Button className={style.iconButton} onClick={fullscreen.enter}>
                  <img src={expandScreen} alt="expand-icon" />
                </Button>
              ) : (
                <Button className={style.iconButton} onClick={fullscreen.exit}>
                  <img src={compressScreen} alt="compress-icon" />
                </Button>
              )}
              {!startTimer && !isGameEnded && (
                <Button
                  className={style.launchButton}
                  onClick={handleStartGame}
                  disabled={startCount}>
                  {startCount ? count : 'Начать'}
                </Button>
              )}
              {startTimer && !isGameEnded && (
                <span className={style.timer}>{minutes + ':' + seconds}</span>
              )}
              {isGameEnded && (
                <Button
                  className={style.launchButton}
                  onClick={handleRestartGame}>
                  Повторить
                </Button>
              )}
              <Button className={style.iconButton} onClick={onMainClick}>
                <span style={{ display: 'none' }}>Выход</span>
                <img src={logOut} alt="logout-icon" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      {isGameEnded && (
        <div className={style.endGame}>
          <p>ОЧКИ: {Math.round(points)}</p>
          <p>ВРЕМЯ: {minutes + ':' + seconds}</p>
          {attempts === matchedPairs && <span>Идеально!</span>}
        </div>
      )}
    </>
  )
}

export default Game
