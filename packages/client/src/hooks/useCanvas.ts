import { RefObject } from 'react'
import timerIcon from '../assets/images/timer.svg'
import {
  cols,
  gameConfig,
  getIconsCount,
  iconSize,
  rows,
  totalGameCards,
} from '@/config/gameConfig'

interface Coordinates {
  x: number
  y: number
}

export interface Card {
  position: Coordinates
  width: number
  icon: string
  isOpen: boolean
  isMatched: boolean
}

// Цвета игры
enum Colors {
  main = '#1F252D',
  closed = '#556075',
  opened = '#35495E',
  green = '#048100',
  red = '#930000',
}

export const useCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  minutes: string,
  seconds: string,
  setIsClickDisabled: (val: boolean) => void
) => {
  const getCanvasContext = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    return { canvas, context }
  }

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

    // Создаем пары иконок и перемешиваем
    const gameIcons = [...getIconsCount, ...getIconsCount].sort(
      () => Math.random() - 0.5
    )

    return gameIcons.map((icon, index) => {
      const leftBorder = Math.floor(index / gameConfig.cols)
      const rightBorder = index % gameConfig.cols

      return {
        position: {
          x:
            startX +
            rightBorder * (gameConfig.cardSize + gameConfig.cardMargin),
          y:
            startY + leftBorder * (gameConfig.cardSize + gameConfig.cardMargin),
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

  const initializeGame = (cards: Card[]) => {
    const { canvas, context } = getCanvasContext(canvasRef)
    if (!canvas || !context) return

    context.clearRect(0, 0, canvas.width, canvas.height)

    // Рисуем иконку timerIcon
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
    cards.forEach(card => drawCard(card))

    // Рисуем таймер
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

      if (newWidth >= gameConfig.cardSize || newWidth <= 0) {
        if (newWidth <= 0) {
          card.isOpen = !card.isOpen
          animateSquare(card, true)
        }
        // setIsClickDisabled(false)
        return // Завершаем анимацию
      }

      requestAnimationFrame(animate)
    }

    // setIsClickDisabled(true) // Запрещаем клик в начале анимации
    requestAnimationFrame(animate)
  }

  return {
    animateSquare,
    calculateCardPositions,
    initializeGame,
    drawTimer,
    totalGameCards,
    rows,
    cols,
    gameConfig,
    getCanvasContext,
  }
}
