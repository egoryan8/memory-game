import React, { useEffect, useRef, useState } from 'react'

interface Coordinates {
  x: number
  y: number
}

interface Card {
  position: Coordinates
  color: Colors
  emoji: string
  isOpen: boolean
  isMatched: boolean
}

enum Colors {
  bg = '#23272F',
  closed = '#556075',
  opened = '#35495E',
  green = '#048100',
  red = '#930000',
}

const config = {
  gameSize: 4, // Колличество рядов и колонок
  boxSize: 120, // Размер карточек
  spacing: 15, // Отступы между карточками
  borderRadius: 10, // Скругление углов
}

// Получаем нужное колличество эмодзи в зависимости от config.gameSize
const emojiCounts: { [key: number]: number } = {
  4: 8,
  6: 18,
}
const allEmojis = [
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
  '🍪',
  '🍰',
]
const emojis =
  config.gameSize === 8
    ? allEmojis
    : allEmojis.slice(0, emojiCounts[config.gameSize])

// Отрисовка карточки с анимацией масштабирования
const drawCard = (
  ctx: CanvasRenderingContext2D,
  { x, y }: Coordinates,
  color: Colors,
  scale = 1,
  width = config.boxSize,
  height = config.boxSize
) => {
  ctx.save()
  ctx.translate(x + width / 2, y + height / 2)
  ctx.scale(scale, 1) // Устанавливаем масштаб только по X

  ctx.fillStyle = color
  ctx.beginPath()
  ctx.roundRect(-width / 2, -height / 2, width, height, config.borderRadius)
  ctx.fill()

  ctx.restore()
}

// Отображение эмодзи
const drawEmoji = (
  ctx: CanvasRenderingContext2D,
  { x, y }: Coordinates,
  emoji: string,
  scaleX: number,
  scaleY = 1
) => {
  const xCenter = 0
  const yCenter = 0

  ctx.save()
  ctx.translate(x + config.boxSize / 2, y + config.boxSize / 2)
  ctx.scale(scaleX, scaleY)

  ctx.font = `70px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(emoji, xCenter, yCenter)

  ctx.restore()
}

// Кнопка перезапуска
const drawRestartButton = (ctx: CanvasRenderingContext2D) => {
  // Координаты временные. Кнопка потом переедет в сайдбар.
  const x = 177.5
  const y = 250
  const width = 200
  const height = 50
  const xCenter = x + width / 2
  const yCenter = y + height / 2

  ctx.fillStyle = Colors.green

  // Рисование кнопки и скругление углов
  ctx.beginPath()
  ctx.roundRect(x, y, width, height, config.borderRadius)
  ctx.fill()

  // Рисование текста
  ctx.fillStyle = '#ffffff'
  ctx.font = '15px Arial'

  // Установка параметров для центрирования текста
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  ctx.fillText('Начать новую игру', xCenter, yCenter)
}

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [openCards, setOpenCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [initialDisplay, setInitialDisplay] = useState(true)
  let scale = 0.1

  // Функция для запуска иницилизации игры
  const initializeGame = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Получение и установка размеров canvas
    const boardWidth =
      (config.boxSize + config.spacing) * config.gameSize + config.spacing
    const boardHeight =
      (config.boxSize + config.spacing) * config.gameSize + config.spacing

    canvas.width = boardWidth
    canvas.height = boardHeight

    canvas.style.background = Colors.bg

    const allEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    const cards: Card[] = []

    allEmojis.forEach((emoji, index) => {
      const row = Math.floor(index / config.gameSize)
      const col = index % config.gameSize

      const x = col * (config.boxSize + config.spacing) + config.spacing
      const y = row * (config.boxSize + config.spacing) + config.spacing

      const card = {
        position: { x, y },
        color: Colors.opened,
        emoji: emoji,
        isOpen: true,
        isMatched: false,
      }

      drawCard(ctx, card.position, card.color)
      drawEmoji(ctx, card.position, emoji, 1)

      cards.push(card)
    })

    setCards(cards)
  }

  // Иницилизация игры
  useEffect(() => {
    initializeGame()
  }, [])

  // Логика закрытия всех карточек до начала игры
  useEffect(() => {
    if (initialDisplay) {
      setTimeout(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')

        if (ctx) {
          cards.forEach(card => {
            drawCard(ctx, card.position, Colors.closed)
          })
        }

        setCards(prevCards => {
          return prevCards.map(card => ({
            ...card,
            isOpen: false,
          }))
        })

        setInitialDisplay(false) // Завершение начального отображения
      }, 2000)
    }
  }, [initialDisplay, cards])

  // Логика поиска пар
  useEffect(() => {
    if (openCards.length === 2) {
      const [firstIndex, secondIndex] = openCards
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      if (firstCard.emoji === secondCard.emoji) {
        setMatchedPairs(matchedPairs + 1)
        setCards(prevCards => {
          const newCards = [...prevCards]
          newCards[firstIndex].isMatched = true
          newCards[secondIndex].isMatched = true
          return newCards
        })
      } else {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (ctx) {
          drawCard(ctx, firstCard.position, Colors.closed)
          drawCard(ctx, secondCard.position, Colors.closed)
        }
        setCards(prevCards => {
          const newCards = [...prevCards]
          newCards[firstIndex].isOpen = false
          newCards[secondIndex].isOpen = false
          return newCards
        })
      }
      setOpenCards([])
    }
  }, [openCards])

  // Логика завершения игры победой и отображение кнопки перезапуска
  useEffect(() => {
    if (matchedPairs === emojis.length) {
      alert('ПОБЕДА!')
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (ctx) {
        drawRestartButton(ctx)
      }
    }
  }, [matchedPairs])

  // Обработка клика по canvas
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    cards.forEach((card, index) => {
      const { x, y } = card.position

      if (
        mouseX >= x &&
        mouseX <= x + config.boxSize &&
        mouseY >= y &&
        mouseY <= y + config.boxSize
      ) {
        if (card.isMatched || card.isOpen) return

        const animationFrame = () => {
          drawCard(ctx, card.position, Colors.opened, scale)
          drawEmoji(ctx, card.position, card.emoji, scale)

          scale += 0.075

          if (scale <= 1) {
            requestAnimationFrame(animationFrame)
          } else {
            setOpenCards(prevOpenCards => [...prevOpenCards, index])
            setCards(prevCards => {
              const newCards = [...prevCards]
              newCards[index].isOpen = true
              return newCards
            })
          }
        }
        animationFrame()
      }
    })

    // Проверка на нажатие кнопки "Restart"
    // Координаты временные. Кнопка потом переедет в сайдбар.
    const restartX = 177.5
    const restartY = 250
    const restartWidth = 200
    const restartHeight = 50

    if (
      mouseX >= restartX &&
      mouseX <= restartX + restartWidth &&
      mouseY >= restartY &&
      mouseY <= restartY + restartHeight &&
      matchedPairs === emojis.length
    ) {
      // Сбрасываем все состояния к начальным значениям
      setCards([])
      setOpenCards([])
      setMatchedPairs(0)
      setInitialDisplay(true)

      // Заново инициализируем игру
      initializeGame()
    }
  }

  // Отображение курсора над canvas
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const isOverBox = cards.some(card => {
      const { x, y } = card.position
      return (
        mouseX >= x &&
        mouseX <= x + config.boxSize &&
        mouseY >= y &&
        mouseY <= y + config.boxSize &&
        matchedPairs !== emojis.length &&
        !initialDisplay
      )
    })

    // Координаты временные. Кнопка потом переедет в сайдбар.
    const restartButtonX = 177.5
    const restartButtonY = 250
    const restartButtonWidth = 200
    const restartButtonHeight = 50

    const isOverRestartButton =
      mouseX >= restartButtonX &&
      mouseX <= restartButtonX + restartButtonWidth &&
      mouseY >= restartButtonY &&
      mouseY <= restartButtonY + restartButtonHeight

    if (isOverBox || (isOverRestartButton && matchedPairs === emojis.length)) {
      canvas.style.cursor = 'pointer'
    } else {
      canvas.style.cursor = 'default'
    }
  }

  return (
    <main>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      />
    </main>
  )
}

export default Game
