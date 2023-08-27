import React, { FC, useEffect, useRef } from 'react'
import s from './Game.module.scss'

const gameConfig = {
  gameSize: 4,
  restSize: 50,
}

const Game: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    canvasCtxRef.current = canvas.getContext('2d')
    const ctx = canvasCtxRef.current

    if (!ctx) {
      return
    }

    const render = () => {
      for (let i = 0; i < gameConfig.gameSize * 2; i + 2) {
        const x = i % gameConfig.gameSize
        const y = (i - x) / gameConfig.gameSize
        ctx.fillRect(
          x * gameConfig.restSize,
          y * gameConfig.restSize,
          gameConfig.restSize,
          gameConfig.restSize
        )
      }
    }
    render()
  }, [])

  return (
    <main className={s.wrapper}>
      <canvas className={s.field} ref={canvasRef} id="canvas" />
    </main>
  )
}

export default Game
