interface Leader {
  id: number
  position: string
  player: string
  score: number
  isUser: boolean
  avatar: string | null
}

const leadersConfig: Leader[] = [
  {
    id: 1,
    position: '✫',
    player: 'Егор',
    score: 153,
    isUser: false,
    avatar: null,
  },
  {
    id: 2,
    position: '✫',
    player: 'Gregor',
    score: 120,
    isUser: false,
    avatar: null,
  },
  {
    id: 3,
    position: '✫',
    player: 'Practicum Ya',
    score: 41,
    isUser: true,
    avatar: null,
  },
  {
    id: 4,
    position: '4',
    player: 'Tailler',
    score: 32,
    isUser: false,
    avatar: null,
  },
]

export default leadersConfig
