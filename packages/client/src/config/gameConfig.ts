import {
  angular,
  bootstrap,
  css,
  docker,
  eslint,
  figma,
  git,
  github,
  gitlab,
  go,
  graphql,
  html,
  jest,
  js,
  laravel,
  mui,
  node,
  npm,
  nuxt,
  python,
  prettier,
  pug,
  react,
  redux,
  sass,
  ts,
  vite,
  vue,
  webpack,
  yarn,
} from '@/assets/images'

export const allIcons = [
  angular,
  bootstrap,
  css,
  docker,
  eslint,
  figma,
  git,
  github,
  gitlab,
  go,
  graphql,
  html,
  jest,
  js,
  laravel,
  mui,
  node,
  npm,
  nuxt,
  python,
  prettier,
  pug,
  react,
  redux,
  sass,
  ts,
  vite,
  vue,
  webpack,
  yarn,
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

export const randomSortedIcons = () => allIcons.sort(() => Math.random() - 0.5)

export const getGameConfig = (gameCols: number) => {
  const rows = getRowsSize(gameCols)

  const cardSize = getCardSize(gameCols)

  const computedGameConfig = {
    cols: gameCols,
    rows,
    cardSize,
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
      ? randomSortedIcons()
      : randomSortedIcons().slice(
          0,
          iconsCount[computedTotalGameCards as CardsCount]
        )

  return {
    cols: gameCols,
    gameConfig: computedGameConfig,
    icons: computedIconsCount,
    rows,
    totalGameCards: computedTotalGameCards,
    FPS,
    cardSize,
  }
}
