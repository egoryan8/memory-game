const allIcons = [
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
]

const getCardSize = (cols: number) => (cols === 4 ? 120 : 100)
const getRowsSize = (cols: number) => (cols === 4 ? 4 : 6)

export const cols = 4 // 4 | 6 | 10
export const rows = getRowsSize(cols)

export const gameConfig = {
  cols, // Количество колонок
  rows, // Количество рядов
  cardSize: getCardSize(cols), // Размер карточек
  canvasMargin: 100,
  cardMargin: 15, // Отступы между карточками
  borderRadius: 10, // Скругление углов
  timerSize: 50,
}

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

export const iconSize = {
  4: 70,
  6: 50,
}

// Сумма всех карточек в игре
export const totalGameCards: CardsCount = gameConfig.rows * gameConfig.cols

// Получаем нужное колличество иконок в зависимости от gameConfig.cols * gameConfig.rows
export const getIconsCount =
  totalGameCards === 60
    ? allIcons
    : allIcons.slice(0, iconsCount[totalGameCards])

export const FPS = 60
