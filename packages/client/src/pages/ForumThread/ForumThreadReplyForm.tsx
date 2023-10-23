import Button from '@/components/Button/Button'
import React, { useState, useCallback } from 'react'
import s from './ForumThread.module.scss'
import sendReplyIcon from '@/pages/ForumThread/sendReplyIcon.svg'
import { useParams } from 'react-router-dom'

interface ReplyProps {
  commentId: number
  replyId?: number | null
  updateData: () => void
  clearReplyState: () => void
}

const ForumThreadReplyForm: React.FC<ReplyProps> = ({
  commentId,
  replyId,
  updateData,
  clearReplyState,
}) => {
  const { topicId } = useParams()

  const [newReply, setNewReply] = useState<string>('')

  const inputSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setNewReply(event.target.value),
    []
  )

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch('http://localhost:9000/api/replies/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic_id: topicId,
          comment_id: commentId,
          reply_id: replyId,
          body: newReply,
        }),
      })

      if (response.ok) {
        setNewReply('')
        updateData()
        clearReplyState()
      } else {
        console.error('Не удалось создать новый ответ')
      }
    } catch (error) {
      console.error('Ошибка при публикации комментария:', error)
    }
  }

  return (
    <form className={s.replyForm} onSubmit={submitForm}>
      <input
        type="text"
        placeholder="Ответить..."
        value={newReply}
        onChange={inputSearch}
      />
      <Button type="submit" disabled={!newReply}>
        <img src={sendReplyIcon} alt="Reply Icon" title="Отправить" />
      </Button>
    </form>
  )
}

export default ForumThreadReplyForm
