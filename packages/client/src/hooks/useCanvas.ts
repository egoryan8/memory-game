import { RefObject } from 'react'
import { getGameConfig } from '@/config/gameConfig'

interface Coordinates {
  x: number
  y: number
}

export interface Card {
  position: Coordinates
  width: number
  fileName: string
  icon: HTMLImageElement
  isOpen: boolean
  isMatched: boolean
  isClicked: boolean
}

// Цвета игры
enum Colors {
  main = '#23272F',
  closed = '#556075',
  opened = '#323844',
  shadow = 'rgba(0,0,0,0.35)',
  red = '#930000',
}

export const useCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  minutes: string,
  seconds: string,
  gameCols: number
) => {
  const { cols, gameConfig, icons, rows, totalGameCards, FPS, cardSize } =
    getGameConfig(gameCols)

  const getCanvasContext = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    return { canvas, context }
  }

  let firstAnimationId: number | null = null
  let secondAnimationId: number | null = null

  const calculateCardPositions = (): Card[] => {
    const { canvas } = getCanvasContext(canvasRef)

    const totalWidth =
      gameConfig.cols * (gameConfig.cardSize + gameConfig.cardMargin)
    const totalHeight =
      gameConfig.rows * (gameConfig.cardSize + gameConfig.cardMargin)

    const canvasWidth = totalWidth + gameConfig.cardMargin
    const canvasHeight = totalHeight + gameConfig.cardMargin

    if (canvas) {
      canvas.width = canvasWidth
      canvas.height = canvasHeight
    }

    const startX = gameConfig.cardMargin
    const startY = gameConfig.cardMargin

    const iconSort = () => icons.sort(() => Math.random() - 0.5)

    // Создаем пары иконок и перемешиваем
    const gameIcons = [...iconSort(), ...iconSort()].sort(
      () => Math.random() - 0.5
    )

    return gameIcons.map((icon, index) => {
      const leftBorder = Math.floor(index / gameConfig.cols)
      const rightBorder = index % gameConfig.cols
      const fileName = icon.substring(icon.lastIndexOf('/') + 1)
      const logo = new Image()
      logo.src = icon

      return {
        position: {
          x:
            startX +
            rightBorder * (gameConfig.cardSize + gameConfig.cardMargin),
          y:
            startY + leftBorder * (gameConfig.cardSize + gameConfig.cardMargin),
        },
        width: gameConfig.cardSize,
        fileName: fileName,
        icon: logo,
        isOpen: false,
        isMatched: false,
        isClicked: false,
      }
    })
  }

  const drawCard = (card: Card) => {
    const { context } = getCanvasContext(canvasRef)
    if (!context) return

    const halfWidth = card.width / 2
    const centerX = card.position.x + gameConfig.cardSize / 2
    const centerY = card.position.y + gameConfig.cardSize / 2

    context.fillStyle = Colors.shadow

    context.beginPath()
    context.roundRect(
      centerX - halfWidth,
      centerY - gameConfig.cardSize / 2 + 5,
      card.width,
      gameConfig.cardSize,
      gameConfig.borderRadius
    )
    context.fill()

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

    // Рисуем иконку, если карточка открыта
    if (card.isOpen) {
      const scale = card.width / gameConfig.cardSize
      context.save()
      context.translate(centerX, centerY)
      context.scale(scale, 1)

      let iconWidth = card.icon.width
      let iconHeight = card.icon.height

      // Если cols > 4, изменяем размер изображения
      if (cols > 4) {
        iconWidth = iconWidth / 2
        iconHeight = iconHeight / 2
      } else {
        iconWidth = iconWidth / 1.5
        iconHeight = iconHeight / 1.5
      }

      // Вычисляем смещение для центрирования иконки
      const iconOffsetX = -iconWidth / 2
      const iconOffsetY = -iconHeight / 2

      // Риуем иконку
      context.drawImage(
        card.icon,
        iconOffsetX,
        iconOffsetY,
        iconWidth,
        iconHeight
      )
      context.restore()
    }
  }

  const initializeGame = (cards: Card[]) => {
    const { canvas, context } = getCanvasContext(canvasRef)
    if (!canvas || !context) return

    context.clearRect(0, 0, canvas.width, canvas.height)

    // Рисуем фон для игры
    context.fillStyle = Colors.main
    context.beginPath()
    context.roundRect(0, 0, canvas.width, canvas.height, [
      gameConfig.borderRadius,
      gameConfig.borderRadius,
      0,
      0,
    ])
    context.fill()

    // Рисуем карточки
    cards.forEach(card => drawCard(card))

    // Рисуем таймер
    // drawTimer()
  }

  const animationStep = cardSize === 120 ? 15 : 10

  const animateSquare = (card: Card, expand = false) => {
    const { context } = getCanvasContext(canvasRef)
    if (!context) return

    card.isClicked = true

    const animate = () => {
      const step = expand ? animationStep : -animationStep // Увеличиваем или уменьшаем ширину карточки на каждом кадре
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
        gameConfig.cardSize + 5
      )

      card.width = newWidth
      drawCard(card)

      if (newWidth >= gameConfig.cardSize || newWidth <= 0) {
        if (newWidth <= 0) {
          card.isOpen = !card.isOpen
          animateSquare(card, true)
        }

        if (newWidth === gameConfig.cardSize && card.isClicked)
          card.isClicked = false

        return // Завершаем анимацию
      }

      setTimeout(() => {
        firstAnimationId = requestAnimationFrame(animate)
      }, 1000 / FPS)
    }

    setTimeout(() => {
      secondAnimationId = requestAnimationFrame(animate)
    }, 1000 / FPS)
  }

  return {
    animateSquare,
    calculateCardPositions,
    initializeGame,
    totalGameCards,
    rows,
    cols,
    gameConfig,
    getCanvasContext,
    firstAnimationId,
    secondAnimationId,
  }
}
