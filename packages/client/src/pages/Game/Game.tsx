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
  return <div>Game</div>
}

export default Game
