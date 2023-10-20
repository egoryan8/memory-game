import s from './ForumThread.module.scss'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Comment } from 'server/models/forum/comment'
import { Spinner } from '@/components/Spinner/Spinner'
import { declensionWords } from '@/utils/declensionWords'
import { Topic } from 'server/models/forum/topic'
import Button from '@/components/Button/Button'
import EmojiPicker from '@/components/EmojiPicker/EmojiPicker'
import Error from '@/pages/Error/Error'
import { AppPath } from '@/types/AppPath'

const ForumThread: React.FC = () => {
  const { topicId } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [topic, setTopic] = useState<Topic | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)
  const [newComment, setNewComment] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const formClass = showForm ? s.slideDown : s.slideUp

  const getData = async () => {
    try {
      const responseComments = await fetch(
        `http://localhost:9000/api/comments/${topicId}`
      )
      const responseTopic = await fetch(
        `http://localhost:9000/api/topics/${topicId}`
      )
      const jsonComments = await responseComments.json()
      const jsonTopic = await responseTopic.json()
      setComments(jsonComments.comments)
      setTopic(jsonTopic.topic)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const showFormHandler = () => setShowForm(!showForm)

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:9000/api/comments/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic_id: topicId,
            body: newComment,
          }),
        }
      )

      if (response.ok) {
        getData().then(() => {
          setNewComment('')
        })
      } else {
        console.error('Не удалось создать новый комментарий')
      }
    } catch (error) {
      console.error('Ошибка при публикации комментария:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 250) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="page">
      {isLoading ? (
        <Spinner />
      ) : topic ? (
        <div className="content-wrapper">
          <div
            className={
              scrolled ? `${s.topicTitle} ${s.scrolled}` : s.topicTitle
            }>
            <h1>
              <Link to={'/forum'}>Форум</Link>/<div>{topic?.title}</div>
            </h1>
          </div>
          <div className={s.topicCreated}>
            <div>
              <b>Автор топика: </b>
              {topic?.user_name}
            </div>
            |
            <div>
              <b>Дата создания: </b>
              {topic && new Date(topic.created_at).toLocaleString()}
            </div>
          </div>
          <div className={s.topicBody}>{topic?.body}</div>
          <Button onClick={showFormHandler}>
            {!showForm ? 'Написать комментарий' : 'Отмена'}
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
              theme="orange"
              type="submit"
              disabled={!newComment}>
              Отправить
            </Button>
          </form>
          <div className={s.commentsCount}>
            <b>
              {comments.length
                ? declensionWords(comments.length, [
                    'комментарий',
                    'комментария',
                    'комментариев',
                  ])
                : 'Комментариев еще нет'}
            </b>
          </div>
          <ul className={s.cards}>
            {comments.map(item => {
              const { id, body, likes, user_name, created_at } = item

              return (
                <li className={s.card} key={id}>
                  <div className={s.avatarBlock}>
                    <div className={s.forumAvatar}>
                      {user_name.split('')[0]}
                    </div>
                    <div className={s.userName}>{user_name}</div>
                    <p className={s.time}>
                      {new Date(created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className={s['message-block']}>
                    <p className={s.message}>{body}</p>
                    <div className={s.info}>
                      <EmojiPicker
                        data={likes}
                        commentId={id}
                        updateData={getData}
                      />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <Error
          name=" "
          text="Упс! Такого топика нет..."
          linkText="Вернуться на страницу форума"
          linkPath={AppPath.FORUM}
        />
      )}
    </div>
  )
}

export default ForumThread
