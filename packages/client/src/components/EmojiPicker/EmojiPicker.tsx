import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import style from '@/components/EmojiPicker/EmojiPicker.module.scss'
import emojiPickerIcon from '@/components/EmojiPicker/emojiPicker.svg'
import { useAppSelector } from '@/hooks/useAppSelector'
import { userSelector } from '@/store/slices/userSlice'
import { Like } from 'server/models/forum/like'

interface EmojiPickerProps {
  commentId?: number
  replyId?: number
  topicId?: string
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  topicId = null,
  commentId = null,
  replyId = null,
}) => {
  // const [hoveredEmoji, setHoveredEmoji] = useState<string>('')
  // const [showUsers, setShowUsers] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [emojis, setEmojis] = useState<Like[]>([])
  const emojiPickerRef = useRef<HTMLDivElement | null>(null)
  const user = useAppSelector(userSelector)

  const popularEmojis = [
    '😀',
    '😂',
    '👍',
    '👎',
    '🙌',
    '👏',
    '🤔',
    '😎',
    '🤩',
    '😭',
    '🥳',
    '🌟',
    '💯',
    '🔥',
    '🎉',
    '🚀',
    '🤑',
    '😈',
    '🤡',
    '💩',
    '👻️',
    '👽',
    '👾',
    '🤖',
  ]

  const emojiListToggle = useCallback(() => setIsOpen(!isOpen), [isOpen])

  const existingEmoji = (emoji: string) =>
    emojis.find(item => item.emoji === emoji && item.user_id === user.data?.id)

  const emojiMap = useMemo(() => {
    const emojiMapData: { [emoji: string]: Like[] } = {}

    emojis.forEach(item => {
      const { emoji, user_id } = item

      if (!emoji || !user_id) return

      emojiMapData[emoji]
        ? emojiMapData[emoji].push(item)
        : (emojiMapData[emoji] = [item])
    })

    return emojiMapData
  }, [emojis])

  const getEmojisData = async () => {
    const pathIdMap: { [key: string]: number | string | null } = {
      reply: replyId,
      comment: commentId,
      topic: topicId,
    }

    const selectedPath = Object.keys(pathIdMap).find(
      path => pathIdMap[path] !== null
    )
    const id = selectedPath && pathIdMap[selectedPath]

    const api = `http://localhost:9000/api/likes/${selectedPath}/${id}`

    try {
      const responseLikes = await fetch(api)
      const jsonLikes = await responseLikes.json()
      setEmojis(jsonLikes.likes)
    } catch (error) {
      console.error('Ошибка при получении лайков:', error)
    }
  }

  const sendEmojiRequest = async (action: string, emoji: string) => {
    const data = {
      topic_id: topicId,
      comment_id: commentId,
      reply_id: replyId,
      emoji,
    }

    try {
      const response = await fetch(
        `http://localhost:9000/api/likes/${action}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (response.ok) {
        getEmojisData()
      } else {
        console.error('Не удалось выполнить операцию')
      }
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  const addEmojiHandler = async (emoji: string) => {
    existingEmoji(emoji)
      ? await removerEmojiHandler(emoji)
      : await sendEmojiRequest('add', emoji)

    setIsOpen(false)
  }

  const removerEmojiHandler = async (emoji: string) => {
    await sendEmojiRequest('remove', emoji)
  }

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!topicId && !replyId && !commentId) return

    getEmojisData()
  }, [topicId, commentId, replyId])

  return (
    <div className={style.selectedEmojiWrapper}>
      {emojis.length
        ? Object.entries(emojiMap).map(([emoji, ids], index) => {
            return (
              <div
                // onMouseEnter={() => {
                //   setShowUsers(true)
                //   setHoveredEmoji(emoji)
                // }}
                // onMouseLeave={() => {
                //   setShowUsers(false)
                //   setHoveredEmoji('')
                // }}
                onClick={() => addEmojiHandler(emoji)}
                className={
                  existingEmoji(emoji)
                    ? `${style.selectedEmoji} ${style.active}`
                    : style.selectedEmoji
                }
                key={index}>
                {/*{showUsers && emoji === hoveredEmoji && (*/}
                {/*  <div className={style.userLike}>*/}
                {/*    {*/}
                {/*      ids.map((user) => {*/}
                {/*        return (*/}
                {/*          <ForumThreadUserAvatar*/}
                {/*            userId={user.user_id}*/}
                {/*            key={user.user_id}*/}
                {/*          />*/}
                {/*        )*/}
                {/*      })*/}
                {/*    }*/}
                {/*  </div>*/}
                {/*)}*/}
                {emoji}
                <span>{ids.length}</span>
              </div>
            )
          })
        : null}
      <div
        className={style.emojiPicker}
        onClick={emojiListToggle}
        ref={emojiPickerRef}>
        <img src={emojiPickerIcon} alt="Emoji" />
        {isOpen && (
          <div className={style.emojiList}>
            {popularEmojis.map(emoji => (
              <div
                key={emoji}
                className={
                  existingEmoji(emoji)
                    ? `${style.emoji} ${style.emojiActive}`
                    : style.emoji
                }
                onClick={event =>
                  addEmojiHandler(event.currentTarget.textContent || '')
                }>
                {emoji}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EmojiPicker
