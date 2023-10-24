import s from './ForumThread.module.scss'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Comment } from 'server/models/forum/comment'
import { Topic } from 'server/models/forum/topic'
import { Reply } from 'server/models/forum/reply'
import { Spinner } from '@/components/Spinner/Spinner'
import { declensionWords } from '@/utils/declensionWords'
import Button from '@/components/Button/Button'
import EmojiPicker from '@/components/EmojiPicker/EmojiPicker'
import Error from '@/pages/Error/Error'
import { AppPath } from '@/types/AppPath'
import ForumThreadReplyForm from '@/pages/ForumThread/ForumThreadReplyForm'
import replyIcon from './replyIcon.svg'
import cancelReplyIcon from './cancelReplyIcon.svg'
import sendReplyIcon from '@/pages/ForumThread/sendReplyIcon.svg'

const ForumThread: React.FC = () => {
  const { topicId } = useParams()

  const location = window.location.pathname

  const [isLoading, setIsLoading] = useState(true)
  const [topic, setTopic] = useState<Topic | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)
  const [newComment, setNewComment] = useState<string>('')
  const [replyTo, setReplyTo] = useState({
    userName: '',
    body: '',
    comment_id: null,
    reply_id: null,
  })
  const formClass = showForm ? s.slideDown : s.slideUp

  const getTopicData = async () => {
    try {
      const responseTopic = await fetch(
        `http://localhost:9000/api/topics/${topicId}`
      )
      const jsonTopic = await responseTopic.json()
      setTopic(jsonTopic.topic)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCommentsData = async () => {
    try {
      const responseComments = await fetch(
        `http://localhost:9000/api/comments/${topicId}`
      )
      const jsonComments = await responseComments.json()
      setComments(jsonComments.comments)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch('http://localhost:9000/api/comments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic_id: topicId,
          body: newComment,
        }),
      })

      if (response.ok) {
        getCommentsData().then(() => {
          setNewComment('')
        })
      } else {
        console.error('Не удалось создать новый комментарий')
      }
    } catch (error) {
      console.error('Ошибка при публикации комментария:', error)
    }
  }

  const showFormHandler = useCallback(() => setShowForm(!showForm), [showForm])

  const clearReplyToState = () => {
    setReplyTo({
      ...replyTo,
      userName: '',
      body: '',
      reply_id: null,
      comment_id: null,
    })
  }

  const findReply = (replies: Reply[], id: number) => {
    return replies.find(item => item.id === id)
  }

  useEffect(() => {
    getTopicData().then(() => getCommentsData())
  }, [])

  return (
    <div className="page">
      {isLoading ? (
        <Spinner />
      ) : topic ? (
        <div className="content-wrapper">
          <div className={s.topicTitle}>
            <h1>
              <Link to={'/forum'}>Форум</Link>/<div>{topic?.title}</div>
            </h1>
          </div>
          <div className={s.topicCreated}>
            <div>
              <b>Автор топика: </b>
              {topic?.user_name}
            </div>
            <div>
              <b>Дата создания: </b>
              {topic && new Date(topic.created_at).toLocaleString()}
            </div>
          </div>
          <div className={s.topicBody}>{topic?.body}</div>
          <Button onClick={showFormHandler}>
            {!showForm ? 'Оставить комментарий' : 'Отмена'}
          </Button>
          <form
            className={`${s.commentForm} ${formClass}`}
            onSubmit={submitForm}>
            <textarea
              placeholder="Комментарий..."
              value={newComment}
              onChange={event => setNewComment(event.target.value)}
            />
            <Button
              className={s.submitButton}
              type="submit"
              disabled={!newComment}>
              <img src={sendReplyIcon} alt="Reply Icon" title="Отправить" />
            </Button>
          </form>
          <div className={s.commentsCount}>
            <b>
              {comments?.length
                ? declensionWords(comments?.length, [
                    'комментарий',
                    'комментария',
                    'комментариев',
                  ])
                : 'Комментариев еще нет'}
            </b>
          </div>
          <div className={s.cards}>
            {comments.map(comment => {
              const { id, body, replies, user_name, created_at } = comment

              return (
                <div className={s.card} key={id}>
                  <div className={s.avatarBlock}>
                    <div className={s.forumAvatar}>
                      {user_name.split('')[0]}
                    </div>
                    <div className={s.userName}>{user_name}</div>
                    <div className={s.time}>
                      {new Date(created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className={s.messageBlock}>
                    <div className={s.message}>{body}</div>
                    <div className={s.info}>
                      <EmojiPicker commentId={id} />
                    </div>
                    {replies.length ? (
                      <>
                        <div className={s.commentsCount}>
                          <b>
                            {declensionWords(replies.length, [
                              'ответ',
                              'ответа',
                              'ответов',
                            ])}
                          </b>
                        </div>
                        <div className={s.replies}>
                          <div className={`${s.cards} ${s.replyCard}`}>
                            {replies.map(reply => {
                              const replyToReply = findReply(
                                replies,
                                reply.reply_id
                              )

                              return (
                                <div
                                  id={`reply-${reply.id}`}
                                  className={s.reply}
                                  key={reply.id}>
                                  <div className={s.replyCreator}>
                                    {reply.user_name + ' '}
                                    <span>
                                      {new Date(
                                        reply.created_at
                                      ).toLocaleString() + ' '}
                                    </span>
                                    <img
                                      onClick={replyTo => {
                                        setReplyTo({
                                          ...replyTo,
                                          userName: reply.user_name,
                                          body: reply.body,
                                          reply_id: reply.id,
                                          comment_id: id,
                                        })
                                      }}
                                      src={replyIcon}
                                      alt="Reply Icon"
                                      title="Ответить"
                                    />
                                  </div>
                                  <div className={s.replyBody}>
                                    {reply.reply_id && (
                                      <a
                                        href={`${location}#reply-${reply.reply_id}`}>
                                        <div className={s.replyTo}>
                                          <div className={s.replyToUser}>
                                            <img
                                              src={replyIcon}
                                              alt="Reply Icon"
                                              title="Ответить"
                                            />
                                            <b>{replyToReply?.user_name}</b>
                                          </div>
                                          <div className={s.replyToBody}>
                                            {replyToReply?.body}
                                          </div>
                                        </div>
                                      </a>
                                    )}
                                    {reply.body}
                                  </div>
                                  <EmojiPicker replyId={reply.id} />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                    <div className={s.replyFormBlock}>
                      {replyTo.body && replyTo.comment_id === id && (
                        <div className={s.replyTo}>
                          <div className={s.replyToUser}>
                            <img
                              src={replyIcon}
                              alt="Reply Icon"
                              title="Ответить"
                            />
                            <b>{replyTo.userName}</b>
                          </div>
                          <div className={s.replyToBody}>{replyTo.body}</div>
                          <img
                            onClick={clearReplyToState}
                            src={cancelReplyIcon}
                            alt="Cancel Reply Icon"
                            title="Отменить"
                          />
                        </div>
                      )}
                      <ForumThreadReplyForm
                        commentId={id}
                        replyId={replyTo.reply_id}
                        updateData={getCommentsData}
                        clearReplyState={clearReplyToState}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <Error
          name="🤔"
          text="Упс! Такого топика нет..."
          linkText="Вернуться на страницу форума"
          linkPath={AppPath.FORUM}
        />
      )}
    </div>
  )
}

export default ForumThread
