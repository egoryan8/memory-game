import React, { useEffect, useRef, useState } from 'react'
import style from '@/components/EmojiPicker/EmojiPicker.module.scss'
import emojiPickerIcon from '@/components/EmojiPicker/emojiPicker.svg'
import { useAppSelector } from '@/hooks/useAppSelector'
import { userSelector } from '@/store/slices/userSlice'

interface EmojiPickerProps {
  data: {
    id?: number
    comment_id?: number
    emoji?: string
    user_id?: number
  }[]
  commentId: number
  updateData: () => void
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  data,
  commentId,
  updateData,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [emojiMap, setEmojiMap] = useState<{
    [emoji: string]: EmojiPickerProps['data']
  }>({})
  const emojiPickerRef = useRef<HTMLDivElement | null>(null)
  const user = useAppSelector(userSelector)

  const popularEmojis = [
    '😀',
    '😂',
    '👍',
    '🙌',
    '👏',
    '🤔',
    '😎',
    '🤩',
    '😭',
    '🥳',
    '👋',
    '🌟',
    '💯',
    '🔥',
    '🎉',
    '🚀',
  ]

  const toggleEmojiPicker = () => setIsOpen(!isOpen)

  const emojiMapData = () => {
    const emojiMap: { [emoji: string]: EmojiPickerProps['data'] } = {}

    data.forEach(item => {
      const { emoji, user_id } = item

      if (!emoji || !user_id) return

      if (emojiMap[emoji]) {
        emojiMap[emoji].push(item)
      } else {
        emojiMap[emoji] = [item]
      }
    })

    setEmojiMap(emojiMap)
  }

  const addEmojiHandler = async (emoji: string | null) => {
    try {
      const response = await fetch('http://localhost:9000/api/likes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment_id: commentId,
          emoji,
        }),
      })

      if (response.ok) {
        setIsOpen(false)
        updateData()
      } else {
        console.error('Не удалось поставить новый лайк')
      }
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  const removerEmojiHandler = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/likes/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment_id: commentId,
        }),
      })

      if (response.ok) {
        updateData()
      } else {
        console.error('Не удалось удалить лайк')
      }
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  const emojiToggle = (activeUser: boolean, emoji: string) => {
    !activeUser ? addEmojiHandler(emoji) : removerEmojiHandler()
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
    if (!data.length) return

    emojiMapData()
  }, [data])

  return (
    <div className={style.selectedEmojiWrapper}>
      {data.length
        ? Object.entries(emojiMap).map(([emoji, ids], index) => {
            const activeUser = ids.some(item => item.user_id === user.data?.id)

            return (
              <div
                onClick={() => emojiToggle(activeUser, emoji)}
                className={
                  activeUser
                    ? `${style.selectedEmoji} ${style.active}`
                    : style.selectedEmoji
                }
                key={index}>
                {emoji}
                <span>{ids.length}</span>
              </div>
            )
          })
        : null}
      <div
        className={style.emojiPicker}
        onClick={toggleEmojiPicker}
        ref={emojiPickerRef}>
        <img src={emojiPickerIcon} alt="Emoji" />
        {isOpen && (
          <div className={style.emojiList}>
            {popularEmojis.map((emoji, index) => (
              <div
                key={index}
                className={style.emoji}
                onClick={event =>
                  addEmojiHandler(event.currentTarget.textContent)
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
