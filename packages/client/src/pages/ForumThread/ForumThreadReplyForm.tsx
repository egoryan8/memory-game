import Button from '@/components/Button/Button'
import GiphyButton from '@/components/GiphyButton/GiphyButton'
import React, { useState } from 'react'
import s from './ForumThread.module.scss'
import sendReplyIcon from '@/pages/ForumThread/sendReplyIcon.svg'
import { useParams } from 'react-router-dom'
import { textareaHeightAutoResize } from '@/utils/textareaHeightAutoResize'

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
      const response = await fetch(`http://localhost:9000/api/${reqPath}/add`, {
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
    <>
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
        <div className={s.buttons}>
          <Button type="submit" disabled={!newReply}>
            <img src={sendReplyIcon} alt="Reply Icon" title="Отправить" />
          </Button>
        </div>
      </form>
      <GiphyButton updateData={updateData} />
    </>
  )
}

export default ForumThreadReplyForm
