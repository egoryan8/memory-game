import React, { useEffect, useRef } from 'react'

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
}

const config = {
  gameSize: 4,
  restSize: 50,
  boxSize: 120,
  spacing: 15,
  borderRadius: 10,
}

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

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rows: Card[][] = []
    const cards: Card[] = []

    // Получение и установка размеров canvas
    const boardWidth =
      (config.boxSize + config.spacing) * config.gameSize + config.spacing
    const boardHeight =
      (config.boxSize + config.spacing) * config.gameSize + config.spacing

    canvas.width = boardWidth
    canvas.height = boardHeight

    for (let row = 0; row < config.gameSize; row++) {
      const columns: Card[] = []
      for (let col = 0; col < config.gameSize; col++) {
        const x = col * (config.boxSize + config.spacing) + config.spacing
        const y = row * (config.boxSize + config.spacing) + config.spacing
        const card = { position: { x, y }, color: Colors.yellow }

        columns.push(card)
        cards.push(card)
      }
      rows.push(columns)
    }

    // Отрисовка поля с карточками в начальном состоянии
    rows.forEach(row => {
      row.forEach(({ position: { x, y } }) => {
        drawCard(ctx, { x, y }, Colors.grey)
      })
    })

    // Обработка клика по canvas
    canvas.onmousedown = event => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left - config.spacing
      const mouseY = event.clientY - rect.top - config.spacing

      const card = cards.find(item => {
        const checkX =
          mouseX >= item.position.x &&
          mouseX <= item.position.x + config.boxSize
        const checkY =
          mouseY >= item.position.y &&
          mouseY <= item.position.y + config.boxSize

        return checkX && checkY
      })

      if (card) {
        ctx.clearRect(
          card.position.x,
          card.position.y,
          config.boxSize,
          config.boxSize
        )
        drawCard(ctx, card.position, card.color)
      }
    }
  }, [canvasRef])

  return (
    <main>
      <canvas ref={canvasRef} />
    </main>
  )
}

export default Game
