import React, { useEffect, useRef, useState } from 'react'

interface Coordinates {
  x: number
  y: number
}

enum Colors {
  grey = 'lightgray',
  yellow = '#FFDB8B',
}

interface Card {
  position: Coordinates
  color: Colors
  emoji: string
  isOpen: boolean
  isMatched: boolean
}

const config = {
  gameSize: 4,
  boxSize: 120,
  spacing: 15,
  borderRadius: 10,
}

const emojis = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍍', '🍑', '🍓']

// Функция отрисовки карточки
const drawCard = (
  ctx: CanvasRenderingContext2D,
  { x, y }: Coordinates,
  color: Colors
) => {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x + config.borderRadius, y)
  ctx.lineTo(x + config.boxSize - config.borderRadius, y)
  ctx.arcTo(
    x + config.boxSize,
    y,
    x + config.boxSize,
    y + config.borderRadius,
    config.borderRadius
  )
  ctx.lineTo(x + config.boxSize, y + config.boxSize - config.borderRadius)
  ctx.arcTo(
    x + config.boxSize,
    y + config.boxSize,
    x + config.boxSize - config.borderRadius,
    y + config.boxSize,
    config.borderRadius
  )
  ctx.lineTo(x + config.borderRadius, y + config.boxSize)
  ctx.arcTo(
    x,
    y + config.boxSize,
    x,
    y + config.boxSize - config.borderRadius,
    config.borderRadius
  )
  ctx.lineTo(x, y + config.borderRadius)
  ctx.arcTo(x, y, x + config.borderRadius, y, config.borderRadius)
  ctx.closePath()
  ctx.fill()
}

const drawEmoji = (
  ctx: CanvasRenderingContext2D,
  { x, y }: Coordinates,
  emoji: string
) => {
  ctx.font = '40px Arial'
  ctx.fillText(emoji, x + 40, y + 80)
}

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [openCards, setOpenCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [initialDisplay, setInitialDisplay] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rows: Card[][] = []

    // Получение и установка размеров canvas
    const boardWidth =
      (config.boxSize + config.spacing) * config.gameSize + config.spacing
    const boardHeight =
      (config.boxSize + config.spacing) * config.gameSize + config.spacing

    canvas.width = boardWidth
    canvas.height = boardHeight

    const allEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5)

    allEmojis.forEach((emoji, index) => {
      const row = Math.floor(index / config.gameSize)
      const col = index % config.gameSize

      const x = col * (config.boxSize + config.spacing) + config.spacing
      const y = row * (config.boxSize + config.spacing) + config.spacing

      const card = {
        position: { x, y },
        color: Colors.grey,
        emoji: emoji,
        isOpen: true,
        isMatched: false,
      }

      drawCard(ctx, card.position, card.color)
      drawEmoji(ctx, card.position, emoji)

      if (!rows[row]) {
        rows[row] = []
      }

      rows[row].push(card)
    })

    setCards(rows.flat())
  }, [canvasRef])

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
        setTimeout(() => {
          const canvas = canvasRef.current
          const ctx = canvas?.getContext('2d')
          if (ctx) {
            drawCard(ctx, firstCard.position, Colors.grey)
            drawCard(ctx, secondCard.position, Colors.grey)
          }
          setCards(prevCards => {
            const newCards = [...prevCards]
            newCards[firstIndex].isOpen = false
            newCards[secondIndex].isOpen = false
            return newCards
          })
        }, 1000)
      }
      setOpenCards([])
    }
  }, [openCards])

  useEffect(() => {
    if (initialDisplay) {
      setTimeout(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (ctx) {
          cards.forEach(card => {
            if (!card.isMatched) {
              drawCard(ctx, card.position, Colors.grey) // Закрыть карточку на холсте
            }
          })
        }

        // Закрытие всех карточек и их перерисовка
        setCards(prevCards => {
          return prevCards.map(card => ({
            ...card,
            isOpen: false,
          }))
        })

        setInitialDisplay(false) // Завершение начального отображения
      }, 1000)
    }
  }, [initialDisplay, cards])

  useEffect(() => {
    if (matchedPairs === emojis.length) {
      alert('ПОБЕДА!')
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

        drawCard(ctx, card.position, Colors.yellow)
        drawEmoji(ctx, card.position, card.emoji)

        setOpenCards(prevOpenCards => [...prevOpenCards, index])
        setCards(prevCards => {
          const newCards = [...prevCards]
          newCards[index].isOpen = true
          return newCards
        })
      }
    })
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    let isOverBox = false

    cards.forEach(card => {
      const { x, y } = card.position
      if (
        mouseX >= x &&
        mouseX <= x + config.boxSize &&
        mouseY >= y &&
        mouseY <= y + config.boxSize
      ) {
        isOverBox = true
      }
    })

    if (isOverBox) {
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
