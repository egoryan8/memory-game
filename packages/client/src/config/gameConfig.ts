import {
  angular,
  github,
  gitlab,
  js,
  kraken,
  lighthouse,
  react,
  sass,
} from '@/assets/images/logos/index'

export const allIcons = [
  angular,
  github,
  gitlab,
  js,
  kraken,
  lighthouse,
  react,
  sass,
]

const getCardSize = (cols: number) => (cols === 4 ? 120 : 85)
const getRowsSize = (cols: number) => (cols === 4 ? 4 : 6)

export const cols = 4 // 4 | 6 | 10
export const rows = getRowsSize(cols)

enum CardsCount {
  S = 16,
  M = 36,
  L = 60,
}

const iconsCount: Record<CardsCount, number> = {
  [CardsCount.S]: 8,
  [CardsCount.M]: 18,
  [CardsCount.L]: 30,
}

export const getGameConfig = (gameCols: number) => {
  const rows = getRowsSize(gameCols)

  const computedGameConfig = {
    cols: gameCols,
    rows,
    cardSize: getCardSize(gameCols),
    canvasMargin: 100,
    cardMargin: 10,
    borderRadius: 10,
    timerSize: 50,
  }

  const FPS = 60

  // Сумма всех карточек в игре
  const computedTotalGameCards = rows * gameCols

  // Получаем нужное колличество иконок в зависимости от gameConfig.cols * gameConfig.rows
  const computedIconsCount =
    computedTotalGameCards === 60
      ? allIcons
      : allIcons.slice(0, iconsCount[computedTotalGameCards as CardsCount])

  return {
    cols: gameCols,
    gameConfig: computedGameConfig,
    getIconsCount: computedIconsCount,
    rows,
    totalGameCards: computedTotalGameCards,
    FPS,
  }
}
