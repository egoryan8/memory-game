import React, { useEffect, useRef, useState } from 'react'
import style from '@/components/EmojiPicker/EmojiPicker.module.scss'
import emojiPickerIcon from '@/components/EmojiPicker/emojiPicker.svg'

interface EmojiPickerProps {
  data: {
    id?: number
    comment_id?: number
    emoji?: string
    user_id?: number
  }[]
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  const emojiPickerRef = useRef<HTMLDivElement | null>(null)

  const emojiData = (data: any) => {
    const emojiMap = new Map()

    data.forEach((item: any) => {
      const { emoji, user_id, comment_id } = item

      if (!emojiMap.has(emoji)) {
        emojiMap.set(emoji, [])
      }

      emojiMap.get(emoji).push({ user_id, comment_id })
    })

    return Array.from(emojiMap, ([emoji, values]) => ({
      [emoji]: values,
    }))
  }

  const result = emojiData(data)
  console.log(result)

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

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji)
    setIsOpen(false)
  }

  // const handleEmojiSelect = async (event: any) => {
  //   console.log(event.target.textContent)
  //
  //   try {
  //     const response = await fetch('http://localhost:9000/api/likes/add', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         comment_id: commentId,
  //         emoji: event.target.textContent,
  //       }),
  //     })
  //
  //     if (response.ok) {
  //       emojiData(data)
  //       setSelectedEmoji(null)
  //
  //     } else {
  //       console.error('Не удалось поставить новый лайк')
  //     }
  //   } catch (error) {
  //     console.error('Ошибка:', error)
  //   }
  // }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  return (
    <div className={style.selectedEmojiWrapper}>
      {selectedEmoji && (
        <div className={style.selectedEmoji}>
          {selectedEmoji}
          <span>{selectedEmoji.length}</span>
        </div>
      )}
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
                onClick={() => handleEmojiSelect(emoji)}>
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
