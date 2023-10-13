interface Emoji {
  id: number
  name: string
  icon: string
}

const emojiConfig: IEmojiResult[] = [
  {
    config: {
      userId: 1,
      topicId: 1,
      commentId: 1,
      emojiId: 1,
      emojiName: 'like',
    },
    count: 2,
    isSelected: true,
  },
  {
    config: {
      userId: 1,
      topicId: 1,
      commentId: 2,
      emojiId: 1,
      emojiName: 'like',
    },
    count: 4,
    isSelected: false,
  },
]

export const emojiList: Record<string, Emoji> = {
  like: {
    id: 1,
    name: 'like',
    icon: '👍',
  },
}

export default emojiConfig
