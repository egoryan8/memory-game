import React, { useEffect, useRef } from 'react'

interface CellPosition {
  x: number
  y: number
}

function CanvasBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cellSize = 120 // Размер каждой ячейки
    const spacing = 15 // Отступ между ячейками
    const borderRadius = 10 // Радиус закругления углов
    const totalCells = 4 // Количество ячеек

    // Вычисляем размеры доски
    const boardWidth = (cellSize + spacing) * totalCells + spacing
    const boardHeight = (cellSize + spacing) * totalCells + spacing

    // Устанавливаем размер холста
    canvas.width = boardWidth
    canvas.height = boardHeight

    // Создаем массив позиций ячеек
    const cellPositions: CellPosition[][] = []

    // Создаем массив позиций ячеек
    for (let row = 0; row < totalCells; row++) {
      const rowPositions: CellPosition[] = []
      for (let col = 0; col < totalCells; col++) {
        const x = col * (cellSize + spacing) + spacing // Добавляем отступы пикселей слева
        const y = row * (cellSize + spacing) + spacing // Добавляем отступы пикселей сверху
        rowPositions.push({ x, y })
      }
      cellPositions.push(rowPositions)
    }

    // Рисуем каждую ячейку
    cellPositions.forEach(row => {
      row.forEach(({ x, y }) => {
        ctx.fillStyle = 'lightgray'
        ctx.beginPath()
        ctx.moveTo(x + borderRadius, y)
        ctx.lineTo(x + cellSize - borderRadius, y)
        ctx.arcTo(x + cellSize, y, x + cellSize, y + borderRadius, borderRadius)
        ctx.lineTo(x + cellSize, y + cellSize - borderRadius)
        ctx.arcTo(
          x + cellSize,
          y + cellSize,
          x + cellSize - borderRadius,
          y + cellSize,
          borderRadius
        )
        ctx.lineTo(x + borderRadius, y + cellSize)
        ctx.arcTo(x, y + cellSize, x, y + cellSize - borderRadius, borderRadius)
        ctx.lineTo(x, y + borderRadius)
        ctx.arcTo(x, y, x + borderRadius, y, borderRadius)
        ctx.closePath()
        ctx.fill()
      })
    })
  }, [canvasRef])

  return <canvas ref={canvasRef} style={{ border: '2px solid black' }} />
}

export default CanvasBoard
