import { setGameCols } from '@/store/slices/gameSlice'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'

export const useGameCols = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const gameColsCount = localStorage.getItem('gameCols')
    if (gameColsCount) dispatch(setGameCols(parseInt(gameColsCount, 10)))
  }, [])
}
