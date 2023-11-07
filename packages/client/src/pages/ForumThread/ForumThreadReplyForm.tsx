import Button from '@/components/Button/Button'
import GiphyButton from '@/components/GiphyButton/GiphyButton'
import React, { useState } from 'react'
import s from './ForumThread.module.scss'
import { useParams } from 'react-router-dom'
import { textareaHeightAutoResize } from '@/utils/textareaHeightAutoResize'
import { REDIRECT_URI } from '@/utils/HTTPClient'

interface ReplyProps {
  commentId: number | null
  replyId: number | null
  updateData: () => void
  clearReplyState: () => void
}

const ForumThreadReplyForm: React.FC<ReplyProps> = ({
  commentId = null,
  replyId = null,
  updateData,
  clearReplyState,
}) => {
  const { topicId } = useParams()

  const [newReply, setNewReply] = useState<string>('')

  const inputSearch = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value
    const trimmedValue = inputValue.replace(/^\s+/, '')
    setNewReply(trimmedValue)
  }

  const initialTextareaHeight = 'auto'

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault()

    const reqPath = !commentId && !replyId ? 'comments' : 'replies'

    try {
      const response = await fetch(`${REDIRECT_URI}/api/${reqPath}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic_id: topicId,
          comment_id: commentId,
          reply_id: replyId,
          body: newReply.trim(),
        }),
      })

      if (response.ok) {
        setNewReply('')
        updateData()
        clearReplyState()

        const textarea = document.querySelector('textarea')
        if (textarea) {
          textarea.style.height = initialTextareaHeight
        }
      } else {
        console.error('Не удалось создать новый ответ')
      }
    } catch (error) {
      console.error('Ошибка при публикации комментария:', error)
    }
  }

  return (
    <div className={s.form}>
      <GiphyButton
        comment={commentId}
        reply={replyId}
        updateData={updateData}
      />
      <form className={s.replyForm} onSubmit={submitForm}>
        <textarea
          value={newReply}
          onInput={textareaHeightAutoResize}
          onChange={inputSearch}
          rows={1}
          placeholder={
            topicId && !commentId && !replyId ? 'Комментарий...' : 'Ответ...'
          }
        />
        <Button className={s.button} type="submit" disabled={!newReply}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </Button>
      </form>
    </div>
  )
}

export default ForumThreadReplyForm
