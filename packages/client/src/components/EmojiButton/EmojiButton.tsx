import React, { useState } from 'react'
import emojiStyle from './EmojiButton.module.scss'
import s from '@/components/RatingCard/RatingCard.module.scss'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { emojiList } from '@/config/emojiConfig'
import { setEmoji } from '@/store/asyncThunks/emoji/setEmoji'

const EmojiButton: React.FC<IEmojiResult> = ({
  config,
  count,
  isSelected,
}: IEmojiResult) => {
  const dispatch = useAppDispatch()
  const [isClicked, setClicked] = useState(isSelected)

  const handleEmoji = () => {
    setClicked(!isClicked)
    dispatch(
      setEmoji({
        userId: config.userId,
        topicId: config.topicId,
        commentId: config.commentId,
        emojiId: config.emojiId,
      })
    )
  }

  return (
    <button
      onClick={handleEmoji}
      className={`${emojiStyle.emojiButtonWrapper} ${
        isClicked ? emojiStyle.isSelected : ''
      }`}>
      <div className={s.emojiButton}>
        <span className={emojiStyle.emoji}>
          {emojiList[config.emojiName].icon}
        </span>
        <span>{count}</span>
      </div>
    </button>
  )
}

export default EmojiButton
