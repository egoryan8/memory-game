import React, { useEffect, useRef, useState } from 'react'
import compressScreen from '@/assets/images/fs-compress-icon.svg'
import expandScreen from '@/assets/images/fs-expand-icon.svg'
import Button from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { AppPath } from '@/types/AppPath'
import useFullscreen from '@/hooks/useFullscreen'
import style from './Game.module.scss'
import { Card, useCanvas } from '@/hooks/useCanvas'

const Game: React.FC = () => {
  const navigate = useNavigate()
  const fullscreen = useFullscreen()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [isClickDisabled, setIsClickDisabled] = useState<boolean>(true)
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [openCards, setOpenCards] = useState<number[]>([])
  const [timer, setTimer] = useState<number>(0)
  const [startTimer, setStartTimer] = useState<boolean>(false)
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false)
  const [shouldRestartGame, setShouldRestartGame] = useState<boolean>(false)
  const [count, setCount] = useState<number>(3)
  const [startCount, setStartCount] = useState<boolean>(false)
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
    drawTimer,
    rows,
    cols,
    getCanvasContext,
    gameConfig,
  } = useCanvas(canvasRef, minutes, seconds, setIsClickDisabled)

  const onMainClick = () => navigate(AppPath.MAIN)

  // Обработка клика по canvas
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { canvas } = getCanvasContext(canvasRef)
    if (!canvas || isClickDisabled) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    cards.forEach((card, index) => {
      const { x, y } = card.position

      if (
        mouseX >= x &&
        mouseX <= x + gameConfig.cardSize &&
        mouseY >= y &&
        mouseY <= y + gameConfig.cardSize
      ) {
        if (card.isMatched || card.isOpen) return
        setIsClickDisabled(true)
        setOpenCards(prevOpenCards => [...prevOpenCards, index])
        animateSquare(card)
      }
    })
  }

  const flipCards = (cards: Card[]) => {
    cards.forEach(card => animateSquare(card))
  }

  const handleStartGame = () => {
    flipCards(cards)
    setStartCount(true)
    setTimeout(() => {
      flipCards(cards)
      setIsClickDisabled(false)
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
    setIsClickDisabled(true)
    setIsGameEnded(false)
    setShouldRestartGame(true)
  }

  useEffect(() => {
    if (canvasRef.current) {
      setCards(calculateCardPositions())
      initializeGame(calculateCardPositions())
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

  useEffect(() => {
    drawTimer()
  }, [timer])

  // Логика поиска пар
  useEffect(() => {
    if (openCards.length === 2) {
      const [firstIndex, secondIndex] = openCards
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      if (firstCard.icon === secondCard.icon) {
        setMatchedPairs(matchedPairs + 1)
        setPoints(point => point + 2)
        setCards(prevCards => {
          const newCards = [...prevCards]
          newCards[firstIndex].isMatched = true
          newCards[secondIndex].isMatched = true
          return newCards
        })
      } else {
        // Закрываем неправильных карточек
        if (points !== 0) setPoints(point => point - 1)
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
      setTimeout(() => {
        flipCards(cards)
      }, 1000)
    }
  }, [matchedPairs])

  return (
    <main className={style.wrapper}>
      <div className={style.field}>
        {isGameEnded && (
          <div className={style.endGame}>
            <div>Победа 🎊</div>
          </div>
        )}
        <canvas ref={canvasRef} onClick={handleCanvasClick} />
      </div>
      <div className={style.handlers}>
        <ul className={style.options}>
          <li className={style.option}>
            <span className={style.optionName}>Отгадано</span>
            <span className={style.optionValue}>
              {matchedPairs * 2} из {cols * rows}
            </span>
          </li>
          <li className={style.option}>
            <span className={style.optionName}>Очки</span>
            <span className={style.optionValue}>{Math.round(points)}</span>
          </li>
          <li className={style.option}>
            <span className={style.optionName}>Попыток всего</span>
            <span className={style.optionValue}>{attempts}</span>
          </li>
          <li className={style.option}>
            <span className={style.optionName}>Ошибок</span>
            <span className={style.optionValue}>{misses}</span>
          </li>
        </ul>
        <div className={style.buttons}>
          {!startTimer && !isGameEnded && (
            <Button
              className={style.button}
              onClick={handleStartGame}
              disabled={startCount}>
              {startCount ? count : 'Поехали!'}
            </Button>
          )}
          {isGameEnded && (
            <Button className={style.restartButton} onClick={handleRestartGame}>
              Начать заново
            </Button>
          )}
          <Button theme="dark" className={style.button} onClick={onMainClick}>
            Выход
          </Button>
        </div>
      </div>
      {!fullscreen.isFullscreen ? (
        <button className={style['resize-button']} onClick={fullscreen.enter}>
          <img src={expandScreen} alt="expand-icon" />
        </button>
      ) : (
        <button className={style['resize-button']} onClick={fullscreen.exit}>
          <img src={compressScreen} alt="compress-icon" />
        </button>
      )}
    </main>
  )
}

export default Game
