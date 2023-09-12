import React, { RefObject, useEffect, useRef, useState } from 'react'
import timerIcon from '@/assets/images/timer.svg'
import s from './Game.module.scss'
import Button from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { AppPath } from '@/types/AppPath'
import useFullscreen from '@/hooks/useFullscreen'

interface Coordinates {
  x: number
  y: number
}

// Определение типа для карточки
interface Card {
  position: Coordinates
  width: number
  icon: string
  isOpen: boolean
  isMatched: boolean
}

// Цвета игры
enum Colors {
  main = '#23272F',
  closed = '#556075',
  opened = '#35495E',
  green = '#048100',
  red = '#930000',
}

const getCardSize = (cols: number) => (cols === 4 ? 120 : 100)
const getRowsSize = (cols: number) => (cols === 4 ? 4 : 6)

const cols = 4 // 4 | 6 | 10
const rows = getRowsSize(cols)

const gameConfig = {
  cols, // Количество колонок
  rows, // Количество рядов
  cardSize: getCardSize(cols), // Размер карточек
  canvasMargin: 100,
  cardMargin: 15, // Отступы между карточками
  borderRadius: 10, // Скругление углов
  timerSize: 50,
}

// Ключ - колличекство карточек
// Значение - колличество иконок
const iconsCount: { [key: number]: number } = {
  16: 8,
  36: 18,
  60: 30,
}

const iconSize = {
  4: 70,
  6: 50,
}

// Сумма всех карточек в игре
const totalGameCards = gameConfig.rows * gameConfig.cols

const allIcons = [
  '🍎',
  '🍌',
  '🍒',
  '🍇',
  '🍉',
  '🍍',
  '🍑',
  '🍓',
  '🥕',
  '🥦',
  '🥔',
  '🍅',
  '🌽',
  '🥑',
  '🍆',
  '🍔',
  '🍟',
  '🍕',
  '🌭',
  '🍝',
  '🍜',
  '🍲',
  '🍛',
  '🍣',
  '🍤',
  '🍥',
  '🍦',
  '🍧',
  '🍨',
  '🍩',
]

// Получаем нужное колличество иконок в зависимости от gameConfig.cols * gameConfig.rows
const getIconsCount =
  totalGameCards === 60
    ? allIcons
    : allIcons.slice(0, iconsCount[totalGameCards])

// Слздаем пары иконок и перемешиваем
const gameIcons = [...getIconsCount, ...getIconsCount].sort(
  () => Math.random() - 0.5
)

const Game: React.FC = () => {
  const navigate = useNavigate()
  const fullscreen = useFullscreen()
  const onMainClick = () => {
    navigate(AppPath.MAIN)
  }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [startGame, setStartGame] = useState<boolean>(false)
  const [cards, setCards] = useState<Card[]>([])
  const [isClickDisabled, setIsClickDisabled] = useState<boolean>(true)
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [openCards, setOpenCards] = useState<number[]>([])
  const [timer, setTimer] = useState<number>(0)
  const [startTimer, setStartTimer] = useState<boolean>(false)

  const getCanvasContext = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    return { canvas, context }
  }

  const minutes = `${Math.floor(timer / 60)}`.padStart(2, '0')
  const seconds = `${timer % 60}`.padStart(2, '0')

  const calculateCardPositions = (): Card[] => {
    const { canvas } = getCanvasContext(canvasRef)

    const totalWidth =
      gameConfig.cols * (gameConfig.cardSize + gameConfig.cardMargin) -
      gameConfig.cardMargin
    const totalHeight =
      gameConfig.rows * (gameConfig.cardSize + gameConfig.cardMargin) -
      gameConfig.cardMargin

    const canvasWidth = totalWidth + 2 * gameConfig.canvasMargin
    const canvasHeight = totalHeight + 2 * gameConfig.canvasMargin

    if (canvas) {
      canvas.width = canvasWidth
      canvas.height = canvasHeight
    }

    const startX = gameConfig.canvasMargin
    const startY = gameConfig.canvasMargin

    return gameIcons.map((icon, index) => {
      const i = Math.floor(index / gameConfig.cols)
      const j = index % gameConfig.cols

      return {
        position: {
          x: startX + j * (gameConfig.cardSize + gameConfig.cardMargin),
          y: startY + i * (gameConfig.cardSize + gameConfig.cardMargin),
        },
        width: gameConfig.cardSize,
        icon,
        isOpen: false,
        isMatched: false,
      }
    })
  }

  const drawCard = (card: Card) => {
    const { context } = getCanvasContext(canvasRef)
    if (!context) return

    const halfWidth = card.width / 2
    const centerX = card.position.x + gameConfig.cardSize / 2
    const centerY = card.position.y + gameConfig.cardSize / 2

    context.fillStyle = card.isOpen ? Colors.opened : Colors.closed
    context.beginPath()
    context.roundRect(
      centerX - halfWidth,
      centerY - gameConfig.cardSize / 2,
      card.width,
      gameConfig.cardSize,
      gameConfig.borderRadius
    )
    context.fill()

    // Рисуем иконку если карточка открыта
    if (card.isOpen) {
      const scale = card.width / gameConfig.cardSize
      context.save()
      context.translate(centerX, centerY)
      context.scale(scale, 1)

      context.font = `${iconSize[rows]}px Arial`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = Colors.main
      context.fillText(card.icon, 0, 0)

      context.restore()
    }
  }

  const drawTimer = () => {
    const { canvas, context } = getCanvasContext(canvasRef)
    if (!canvas || !context) return

    const timerHeight = 30

    // Очищаем область, где находится таймер
    context.clearRect(0, gameConfig.timerSize, canvas.width, timerHeight)

    context.font = '20px Arial'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = Colors.main
    context.fillText(`${minutes}:${seconds}`, canvas.width / 2, timerHeight * 2)
  }

  // Кнопка перезапуска
  const drawRestartButton = () => {
    const { canvas, context } = getCanvasContext(canvasRef)
    if (!canvas || !context) return

    const width = 200
    const height = 50
    const x = canvas.width / 2 - width / 2
    const y = canvas.height - gameConfig.canvasMargin / 2
    const xCenter = x + width / 2
    const yCenter = y + height / 2

    context.fillStyle = Colors.green

    // Рисование кнопки
    context.beginPath()
    context.roundRect(x, y, width, height, gameConfig.borderRadius)
    context.fill()

    context.fillStyle = '#ffffff'
    context.font = '15px Arial'
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    context.fillText('Начать новую игру 🔄', xCenter, yCenter)
  }

  const initializeGame = () => {
    const { canvas, context } = getCanvasContext(canvasRef)
    if (!canvas || !context) return

    context.clearRect(0, 0, canvas.width, canvas.height)

    // Вывод иконки timerIcon
    const timerImage = new Image()
    timerImage.src = timerIcon
    timerImage.onload = () => {
      const iconX = canvas.width / 2 - timerImage.width / 2
      const iconY = gameConfig.cardMargin

      context.drawImage(timerImage, iconX, iconY)
    }

    // Рисуем фон для игры
    context.fillStyle = Colors.main
    context.beginPath()
    context.roundRect(
      gameConfig.canvasMargin - gameConfig.cardMargin,
      gameConfig.canvasMargin - gameConfig.cardMargin,
      canvas.width - gameConfig.canvasMargin * 2 + gameConfig.cardMargin * 2,
      canvas.height - gameConfig.canvasMargin * 2 + gameConfig.cardMargin * 2,
      gameConfig.borderRadius
    )
    context.fill()

    // Рисуем карточки
    cards.forEach(card => {
      animateSquare(card)
    })

    setStartGame(true)
    drawTimer()
  }

  const animateSquare = (card: Card, expand = false) => {
    const { context } = getCanvasContext(canvasRef)
    if (!context) return

    const animate = () => {
      const step = expand ? 10 : -10 // Увеличиваем или уменьшаем ширину карточки на каждом кадре
      const newWidth = card.width + step

      context.clearRect(
        card.position.x,
        card.position.y,
        gameConfig.cardSize,
        gameConfig.cardSize
      )
      context.fillStyle = Colors.main
      context.fillRect(
        card.position.x,
        card.position.y,
        gameConfig.cardSize,
        gameConfig.cardSize
      )

      card.width = newWidth

      drawCard(card)

      if (newWidth >= gameConfig.cardSize) {
        clearInterval(animationInterval)
      }

      if (newWidth <= 0) {
        clearInterval(animationInterval)
        card.isOpen = !card.isOpen
        animateSquare(card, true)
      }
    }
    const animationInterval = setInterval(animate, 20)
  }

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

        setOpenCards(prevOpenCards => [...prevOpenCards, index])
        animateSquare(card)
      }
    })

    // Проверка на нажатие кнопки "Restart"
    const restartWidth = 200
    const restartHeight = 50
    const restartX = canvas.width / 2 - restartWidth / 2
    const restartY = canvas.height - gameConfig.canvasMargin / 2

    if (
      mouseX >= restartX &&
      mouseX <= restartX + restartWidth &&
      mouseY >= restartY &&
      mouseY <= restartY + restartHeight &&
      matchedPairs === totalGameCards / 2
    ) {
      console.log('RESTART')

      // Сбрасываем все состояния к начальным значениям
      setCards([])
      setOpenCards([])
      setMatchedPairs(0)
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      setCards(calculateCardPositions())
    }
  }, [])

  // Запускаем игру и закрываем все карточи через 3 секунды после начала
  useEffect(() => {
    initializeGame()

    setTimeout(() => {
      const newCards = cards.map(card => {
        animateSquare(card)
        return {
          ...card,
          isOpen: false,
        }
      })
      setCards(newCards)
      setIsClickDisabled(false)
      setStartTimer(true)
    }, 3000)
  }, [startGame])

  useEffect(() => {
    if (!startTimer) return

    // Запускаем таймер
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
        setCards(prevCards => {
          const newCards = [...prevCards]
          newCards[firstIndex].isMatched = true
          newCards[secondIndex].isMatched = true
          return newCards
        })
      } else {
        // Закрываем неправильных карточек
        setTimeout(() => {
          animateSquare(firstCard)
          animateSquare(secondCard)
        }, 1000)
      }
      setOpenCards([])
    }
  }, [openCards])

  // Логика завершения игры победой и отображение кнопки перезапуска
  useEffect(() => {
    if (matchedPairs === totalGameCards / 2) {
      setStartTimer(false)
      alert(`🎉🎉🎉 ПОБЕДА 🎉🎉🎉 Время игры: ${minutes}:${seconds}`)
      setTimer(0)
      drawRestartButton()
    }
  }, [matchedPairs])

  return (
    <main className={s.wrapper}>
      <div className={s.field}>
        <canvas ref={canvasRef} onClick={handleCanvasClick} />
      </div>
      <div className={s.handlers}>
        <ul className={s.options}>
          <li className={s.option}>
            <span className={s.optionName}>Таймер</span>
            <span className={s.optionValue}>01:00</span>
          </li>
          <li className={s.option}>
            <span className={s.optionName}>Отгадано</span>
            <span className={s.optionValue}>0 из 16</span>
          </li>
          <li className={s.option}>
            <span className={s.optionName}>Очки</span>
            <span className={s.optionValue}>0</span>
          </li>
        </ul>
        <div className={s.buttons}>
          <Button className={s.button}>Поехали!</Button>
          <Button theme="dark" className={s.button} onClick={onMainClick}>
            На главную
          </Button>
        </div>
      </div>
      {!fullscreen.isFullscreen ? (
        <button className={s['resize-button']} onClick={fullscreen.enter}>
          Open
        </button>
      ) : (
        <button className={s['resize-button']} onClick={fullscreen.exit}>
          Exit
        </button>
      )}
    </main>
  )
}

export default Game
