export const mockInitialState = {
  user: {
    loading: false,
    data: {
      id: 1346934,
      first_name: 'Naruto',
      second_name: 'Uzumaki',
      display_name: 'Naruto',
      login: 'ramenDestroyer',
      avatar: '',
      email: 'naruto@yandex.ru',
      phone: '',
    },
    error: '',
  },
  game: {
    gameCols: 4,
  },
  leaderBoard: {
    leaders: null,
    oldLeaders: null,
    error: null,
  },
  theme: {
    theme: 'dark',
  },
  emoji: {
    emojiList: null,
    error: null,
  },
  giphy: {
    items: [],
    status: 'loading',
    error: null,
    page: 1,
  },
}
